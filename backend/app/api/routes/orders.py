from uuid import UUID
from typing import Any
from sqlmodel import func, select
from fastapi import APIRouter, HTTPException
from app.api.deps import CurrentUser, SessionDep
from app.models import Order, OrderCreate, OrderPublic, OrdersPublic, Message

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
) -> Any:
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
    *, session: SessionDep, order_in: OrderCreate
) -> Any:
    """
    Create new order.
    """
    order = session.exec(
      select(Order).filter_by(invoiceId=order_in.invoiceId)
    ).first()
    if order:
      raise HTTPException(status_code=400, detail="Order with this Invoice ID already exists.")
  
  
    order = Order.model_validate(order_in)
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