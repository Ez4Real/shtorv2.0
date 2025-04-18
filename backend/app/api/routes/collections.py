from uuid import UUID
from typing import Optional

from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from sqlmodel import func, select

from app.core.config import settings
from app.api.deps import CurrentUser, SessionDep, parse_collection_create, \
  parse_collection_update
from app.models import Collection, CollectionCreate, CollectionUpdate, \
    CollectionBanner, CollectionPublic, CollectionsPublic, \
    Message
from app.utils import save_image_to_local, delete_image_from_local

router = APIRouter(prefix="/collections", tags=["collections"])


@router.get("/", response_model=CollectionsPublic)
def read_collections(
  session: SessionDep,
  skip: int = 0, limit: int = 100
) -> CollectionsPublic:
  """
  Retrieve collections.
  """
  count_statement = select(func.count()).select_from(Collection)
  count = session.exec(count_statement).one()
  statement = select(Collection).offset(skip).limit(limit).order_by(Collection.created_at.desc())
  collections = session.exec(statement).all()
    
  return CollectionsPublic(data=collections, count=count)


@router.get("/{id}", response_model=CollectionPublic)
def read_collection(session: SessionDep, id: UUID) -> CollectionPublic:
  """
  Get collection by ID.
  """
  collection = session.get(Collection, id)
  if not collection:
    raise HTTPException(status_code=404, detail="Collection not found")
  return collection


@router.post("/")
def create_collection(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    collection_in: CollectionCreate = Depends(parse_collection_create),
) -> CollectionPublic:
    """
    Create new collection.
    """
    existing_collection = session.exec(
        select(Collection).filter_by(title=collection_in.title)
    ).first()
    if existing_collection:
        raise HTTPException(status_code=400, detail="Collection with this title already exists.")
      
    collection = Collection.model_validate(
      collection_in.model_dump(exclude={"banner_desktop", "banner_mobile"})
    )

    banner_url = save_image_to_local(
      collection_in.banner_desktop,
      settings.COLLECTION_BANNERS_DIR
    )
    banner_mobile_url = save_image_to_local(
      collection_in.banner_mobile,
      settings.COLLECTION_BANNERS_DIR
    )
    banner_desktop = CollectionBanner(
      url=banner_url,
      alt_text=f"{collection.title} collection banner",
      collection_id=collection.id,
      device_type="desktop"
    )
    banner_mobile = CollectionBanner(
      url=banner_mobile_url,
      alt_text=f"{collection.title} collection banner",
      collection_id=collection.id,
      device_type="mobile"
    )
    
    session.add(banner_desktop)
    session.add(banner_mobile)
    
    collection.banners = [banner_desktop, banner_mobile]
    session.add(collection)
    
    session.commit()
    session.refresh(collection)

    return collection


@router.put("/{id}", response_model=CollectionPublic)
def update_collection(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: UUID,
    collection_in: CollectionUpdate = Depends(parse_collection_update),
) -> CollectionPublic:
    """
    Update a collection.
    """
    collection = session.get(Collection, id)
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    update_dict = collection_in.model_dump(exclude_unset=True, exclude={"banner_desktop", "banner_mobile"})
    collection.sqlmodel_update(update_dict)

    existing_banners = {banner.device_type: banner for banner in collection.banners}
    
    if collection_in.banner_desktop:
      old_banner = existing_banners.get("desktop")
      if old_banner:
        delete_image_from_local(old_banner.url)
        session.delete(old_banner)

      banner_url = save_image_to_local(
        collection_in.banner_desktop, settings.COLLECTION_BANNERS_DIR
      )
      new_banner_desktop = CollectionBanner(
        url=banner_url,
        alt_text=f"{collection.title} collection banner desktop",
        device_type="desktop",
        collection=collection
      )
      session.add(new_banner_desktop)

    if collection_in.banner_mobile:
      old_banner = existing_banners.get("mobile")
      if old_banner:
        delete_image_from_local(old_banner.url)
        session.delete(old_banner)

      banner_url = save_image_to_local(
        collection_in.banner_mobile, settings.COLLECTION_BANNERS_DIR
      )
      new_banner_mobile = CollectionBanner(
        url=banner_url,
        alt_text=f"{collection.title} collection banner mobile",
        device_type="mobile",
        collection=collection
      )
      session.add(new_banner_mobile)

    session.add(collection)
    session.commit()
    session.refresh(collection)
    
    return collection


@router.delete("/{id}")
def delete_collection(
  session: SessionDep, current_user: CurrentUser, id: UUID
) -> Message:
  """
  Delete a collection.
  """
  collection = session.get(Collection, id)
  if not collection:
    raise HTTPException(status_code=404, detail="Collection not found")
  if not current_user.is_superuser:
    raise HTTPException(status_code=400, detail="Not enough permissions")
  
  if collection.banners:
    for banner in collection.banners:
      banner = session.get(CollectionBanner, banner.id)
      deleted = delete_image_from_local(banner.url)
      if deleted: session.delete(banner)
    
  session.delete(collection)
  session.commit()
  return Message(message="Collection deleted successfully")