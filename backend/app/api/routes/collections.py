from uuid import UUID
from typing import Any, List

from fastapi import APIRouter, HTTPException, UploadFile, File
from sqlmodel import func, select

from app.core.config import settings
from app.api.deps import CurrentUser, SessionDep
from app.models import Collection, CollectionCreate, CollectionUpdate, \
    CollectionBanner, CollectionPublic, CollectionsPublic, Message
from app.utils import save_image_to_local, delete_image_from_local

router = APIRouter(prefix="/collections", tags=["collections"])


@router.get("/", response_model=CollectionsPublic)
def read_collections(
  session: SessionDep,
  skip: int = 0, limit: int = 100
) -> Any:
  """
  Retrieve collections.
  """
  count_statement = select(func.count()).select_from(Collection)
  count = session.exec(count_statement).one()
  statement = select(Collection).offset(skip).limit(limit).order_by(Collection.created_at.desc())
  collections = session.exec(statement).all()
    
  return CollectionsPublic(data=collections, count=count)


@router.get("/{id}", response_model=CollectionPublic)
def read_collection(session: SessionDep, id: UUID) -> Any:
  """
  Get collection by ID.
  """
  collection = session.get(Collection, id)
  if not collection:
    raise HTTPException(status_code=404, detail="Collection not found")
  return collection


@router.post("/", response_model=CollectionPublic)
def create_collection(
  *,
  session: SessionDep,
  current_user: CurrentUser,
  collection_in: CollectionCreate
) -> Any:
  """
  Create new collection.
  """
  collection = Collection.model_validate(
    collection_in.model_dump(exclude={"banner"})
  )
  session.add(collection)
  
  banner = CollectionBanner.model_validate(
    collection_in.banner, update={"collection_id": collection.id}
  )
  session.add(banner)

  session.commit() 
  session.refresh(collection)
  return collection


@router.post("/upload-banner")
async def upload_banner(
  *,
  current_user: CurrentUser,
  banner: UploadFile = File(...)
) -> dict:
  """
  Upload multiple collection banner and save them to local storage.
  """
  banner_url = save_image_to_local(
    banner,
    settings.UPLOAD_DIR / "collections-banners"
  )

  return { "url": banner_url }


@router.put("/{id}", response_model=CollectionPublic)
def update_collection(
  *,
  session: SessionDep,
  current_user: CurrentUser,
  id: UUID,
collection_in: CollectionUpdate,
) -> Any:
  """
  Update a collection.
  """
  collection = session.get(Collection, id)
  if not collection:
    raise HTTPException(status_code=404, detail="Collection not found")
  if not current_user.is_superuser:
    raise HTTPException(status_code=400, detail="Not enough permissions")
    
  update_dict = collection_in.model_dump(exclude_unset=True)
  collection.sqlmodel_update(update_dict)
    
  if collection_in.banner:
    banner_old = session.exec(select(CollectionBanner).filter_by(collection_id=id)).first()
    session.delete(banner_old)
    banner = CollectionBanner.model_validate(
      collection_in.banner,
      update={"collection_id": collection.id}
    )
    session.add(banner)
    
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

  # if collection.banner:
  #   !!! session.exec(CollectionBanner).filter(CollectionBanner.collection_id == id).delete()
  #   banner_old = session.exec(select(CollectionBanner).filter_by(collection_id=id)).first()
  #   deleted = delete_image_from_local(
  #     collection.banner.url,
  #     settings.UPLOAD_DIR / "collections-banners"
  #   )
  #   if deleted: session.delete(banner_old)
    
  session.delete(collection)
  session.commit()
  return Message(message="Collection deleted successfully")
