from uuid import UUID
from typing import Any, List

from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from sqlmodel import func, select

from app.core.config import settings
from app.api.deps import CurrentUser, SessionDep, parse_product_create, parse_product_update
from app.models import ProductCategory, ProductCategoryCreate, ProductCategoryUpdate, \
  ProductCategoryPublic, ProductCategoriesPublic, Message
from app.utils import save_image_to_local, delete_image_from_local

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("/", response_model=ProductCategoriesPublic)
def read_categories(
  session: SessionDep,
  skip: int = 0, limit: int = 100
) -> Any:
  """
  Retrieve categories.
  """
  count_statement = select(func.count()).select_from(ProductCategory)
  count = session.exec(count_statement).one()
  statement = select(ProductCategory).offset(skip).limit(limit)
  categories = session.exec(statement).all()
  return ProductCategoriesPublic(data=categories, count=count)


@router.get("/{id}", response_model=ProductCategoryPublic)
def read_category(
    session: SessionDep,
    # current_user: CurrentUser,
    id: UUID
  ) -> ProductCategoryPublic:
  """
  Get product category by ID.
  """
  category = session.get(ProductCategory, id)
  if not category:
    raise HTTPException(status_code=404, detail="Category not found")
  return category


@router.post("/", response_model=ProductCategoryPublic)
def create_category(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    category_in: ProductCategoryCreate
) -> ProductCategoryPublic:
    """
    Create new product category.
    """
    if not (current_user or current_user.is_superuser):
      raise HTTPException(status_code=403, detail="Not enough permissions")
  
    category = ProductCategory.model_validate(category_in)
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


@router.put("/{id}", response_model=ProductCategoryPublic)
def update_category(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: UUID,
    category_in: ProductCategoryUpdate,
) -> ProductCategoryPublic:
    """
    Update an category.
    """
    if not (current_user or current_user.is_superuser):
      raise HTTPException(status_code=400, detail="Not enough permissions")
    category = session.get(ProductCategory, id)
    if not category:
      raise HTTPException(status_code=404, detail="Category not found")
    update_dict = category_in.model_dump(exclude_unset=True)
    category.sqlmodel_update(update_dict)
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


@router.delete("/{id}")
def delete_category(
    session: SessionDep,
    current_user: CurrentUser,
    id: UUID
) -> Message:
    """
    Delete a category.
    """
    if not (current_user or current_user.is_superuser):
      raise HTTPException(status_code=400, detail="Not enough permissions")
    category = session.get(ProductCategory, id)
    if not category:
      raise HTTPException(status_code=404, detail="Category not found")
    session.delete(category)
    session.commit()
    return Message(message="Category deleted successfully")