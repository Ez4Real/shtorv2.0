from uuid import UUID
from typing import Any
from sqlmodel import func, select
from fastapi import APIRouter, HTTPException, Depends
from app.core.config import settings
from app.api.deps import CurrentUser, SessionDep, parse_order_create
from app.models import Order, OrderCreate, OrderPublic, OrdersPublic, Message, PostcardImage
from app.utils import save_image_to_local

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("/", response_model=OrdersPublic)
def read_orders(
    session: SessionDep,
    current_user: CurrentUser,
    skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve orders.
    """
    if not current_user.is_superuser:
      raise HTTPException(status_code=403, detail="Not enough permissions")
        
    count_statement = select(func.count()).select_from(Order)
    count = session.exec(count_statement).one()
    statement = select(Order).offset(skip).limit(limit).order_by(Order.created_at.desc())
    orders = session.exec(statement).all()
    
    return OrdersPublic(data=orders, count=count)

@router.get("/{id}", response_model=OrderPublic)
def read_order(
    session: SessionDep,
    current_user: CurrentUser,
    id: UUID
) -> OrderPublic:
    """
    Get order by ID.
    """
    order = session.get(Order, id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return order

@router.post("/", response_model=OrderPublic)
def create_order(
    *,
    session: SessionDep,
    order_in: OrderCreate = Depends(parse_order_create)
) -> Any:
    """
    Create new order.
    """
    print("\n\nOrder In:", order_in ,'\n')
    
    order = session.exec(
      select(Order).filter_by(invoiceId=order_in.invoiceId)
    ).first()
    if order:
      raise HTTPException(status_code=400, detail="Order with this Invoice ID already exists.")
  
    order = Order.model_validate(order_in.model_dump(exclude={"postcard_image"}),)
    
    print("Postcard IN: ", bool(order.personalized_postcard))
    if order.personalized_postcard:
        print("Postcard image IN: ", bool(order_in.postcard_image))
        if not order_in.postcard_image: 
            raise HTTPException(status_code=400, detail="Postcard image is required when personalized postcard is enabled")
        
        image = save_image_to_local(
            order_in.postcard_image,
            settings.PERSONALIZED_POSTCARD_IMAGES_DIR
        )
        postcard_image = PostcardImage(
            url=image,
            alt_text=f"personalized postcard image",
            order_id=order.id, #!!! nah tut eto?
        )

        session.add(postcard_image)
        order.postcard_image = postcard_image

    session.add(order)
    session.commit()
    session.refresh(order)
    
    return order


@router.delete("/{id}")
def delete_order(
    *, session: SessionDep, current_user: CurrentUser, id: UUID
) -> Message:
    """
    Delete an order.
    """
    order = session.get(Order, id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(order)
    session.commit()
    return Message(message="Order deleted successfully")