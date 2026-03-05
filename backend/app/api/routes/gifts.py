from uuid import UUID

from fastapi import APIRouter, HTTPException, Depends, Form, Query
from sqlmodel import func, select

from app.core.config import settings
from app.api.deps import CurrentUser, SessionDep, parse_gift_create, parse_gift_update
from app.models import Gift, GiftCreate, GiftUpdate, GiftImage, GiftPublic, GiftsPublic, \
  GiftOccasion, Message
from app.utils import save_image_to_local, delete_image_from_local

router = APIRouter(prefix="/gifts", tags=["gifts"])


@router.get("/", response_model=GiftsPublic)
def read_gifts(
  session: SessionDep,
  skip: int = 0, limit: int = 100
) -> GiftsPublic:
  """
  Retrieve gifts.
  """
  count_statement = select(func.count()).select_from(Gift)
  count = session.exec(count_statement).one()
  
  gifts_order_bounds = select(
    func.min(Gift.order), func.max(Gift.order)
  )
  min_order, max_order = session.exec(gifts_order_bounds).one()
  
  statement = select(Gift).offset(skip).limit(limit).order_by(Gift.order)
  gifts = session.exec(statement).all()
    
  return GiftsPublic(
    data=gifts,
    count=count,
    min_order=min_order or 0,
    max_order=max_order or 0
  )


@router.get("/{id}", response_model=GiftPublic)
def read_gift_by_id(session: SessionDep, id: UUID) -> GiftPublic:
  """
  Get gift by ID.
  """
  gift = session.get(Gift, id)
  if not gift:
    raise HTTPException(status_code=404, detail="Gift not found")
  return gift

@router.get("/order/", response_model=GiftPublic)
def read_gift_by_order(
  session: SessionDep,
  order: int = Query(..., gt=0)
) -> GiftPublic:
  """
  Get gift by order.
  """
  statement = select(Gift).where(Gift.order == order)
  gift = session.exec(statement).one_or_none()
  if not gift:
    raise HTTPException(status_code=404, detail="Gift not found")
  return gift


@router.post("/")
def create_gift(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    gift_in: GiftCreate = Depends(parse_gift_create),
) -> GiftPublic:
    """
    Create new gift.
    """
    next_gift_order = (session.scalar(select(func.max(Gift.order))) or 0) + 1
    gift = Gift.model_validate(
      gift_in.model_dump(exclude={"images"}),
      update={"order": next_gift_order}
    )

    if gift_in.images:
      for index, image_in in enumerate(gift_in.images):
        image = save_image_to_local(
          image_in,
          settings.GIFT_IMAGES_DIR
        )
        gift_image = GiftImage(
          url=image,
          alt_text=f"{gift.title_en} product image",
          order=index+1
        )

        session.add(gift_image)
        gift.images.append(gift_image)
    
    session.add(gift)
    
    session.commit()
    session.refresh(gift)
    return gift


@router.put("/{id}", response_model=GiftPublic)
def update_gift(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: UUID,
    gift_in: GiftUpdate = Depends(parse_gift_update),
) -> GiftPublic:
    """
    Update a gift.
    """
    gift = session.get(Gift, id)
    if not gift:
      raise HTTPException(status_code=404, detail="Gift not found")
    if not current_user.is_superuser:
      raise HTTPException(status_code=403, detail="Not enough permissions")

    update_dict = gift_in.model_dump(
      exclude_unset=True,
      exclude_none=True,
      exclude={"images"}
    )
    gift.sqlmodel_update(update_dict)

    
    if gift_in.images is not None:
      for image in gift.images:
        delete_image_from_local(image.url)
        session.delete(image)
      session.commit()

      for index, image_in in enumerate(gift_in.images):
        url = save_image_to_local(image_in, settings.GIFT_IMAGES_DIR)
        new_image = GiftImage(
          url=url,
          alt_text=f"{gift.title_en} image",
          gift=gift,
          order=index + 1
        )
        session.add(new_image)

    session.add(gift)
    session.commit()
    session.refresh(gift)
    
    return gift
  
  
@router.put("/update-order/{id}", response_model=GiftPublic)
def update_gift_order(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: UUID,
    order_shift: int = Form(ge=-1, le=1),
) -> GiftPublic:
    """
    Update a gift order with nearest one (-1 or +1).
    """
    gift = session.get(Gift, id)
    if not gift:
      raise HTTPException(status_code=404, detail="Gift not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if not order_shift: return gift
    
    current_order = gift.order
    new_order = current_order + order_shift
    
    max_order = session.scalar(select(func.max(Gift.order)))
    if new_order < 1 or new_order > max_order:
      raise HTTPException(status_code=400, detail="Target order out of range")
    
    neighbor_gift = session.exec(select(Gift).where(Gift.order == new_order)).first()
    if not neighbor_gift:
      raise HTTPException(status_code=404, detail="Neighbor gift not found")
    
    gift.order = -1
    session.commit()

    neighbor_gift.order = current_order
    session.commit()
    gift.order = new_order
    session.commit()
    
    session.refresh(gift)
    return gift


@router.delete("/{id}")
def delete_gift(
  session: SessionDep, current_user: CurrentUser, id: UUID
) -> Message:
  """
  Delete a gift.
  """
  gift = session.get(Gift, id)
  if not gift:
    raise HTTPException(status_code=404, detail="Gift not found")
  if not current_user.is_superuser:
    raise HTTPException(status_code=400, detail="Not enough permissions")
  gift_images = session.exec(
    select(GiftImage).filter(GiftImage.gift_id == gift.id)
  ).all()
  for image in gift_images:
    if delete_image_from_local(image.url):
      session.delete(image)

  session.delete(gift)

  gifts_after = session.exec(
    select(Gift).where(Gift.order > gift.order).order_by(Gift.order)
  ).all()
  for p in gifts_after:
    p.order -= 1
    session.commit()

  session.commit()
  return Message(message="Gift deleted successfully")


#Temporary# Woman's Day 2026 Block
@router.get("/occasion/{occasion}", response_model=GiftsPublic)
def read_gifts_by_occasion(
  session: SessionDep,
  occasion: GiftOccasion,
  skip: int = 0, limit: int = 100
) -> GiftsPublic:
  """
  Get gifts by Occasion.
  """
  count_statement = (
    select(func.count())
    .select_from(Gift)
    .where(Gift.occasion == occasion)
  )
  count = session.exec(count_statement).one()
  
  gifts_order_bounds = (
    select(func.min(Gift.order), func.max(Gift.order))
    .where(Gift.occasion == occasion)
  )
  min_order, max_order = session.exec(gifts_order_bounds).one()
  
  statement = (
    select(Gift)
    .where(Gift.occasion == occasion)
    .offset(skip)
    .limit(limit)
    .order_by(Gift.order)
  )
  gifts = session.exec(statement).all()

  return GiftsPublic(
    data=gifts,
    count=count,
    min_order=min_order or 0,
    max_order=max_order or 0
  )
#________________________________________________________________

