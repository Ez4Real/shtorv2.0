from uuid import UUID
from typing import Any

from fastapi import APIRouter, HTTPException, Query, Depends, Form
from sqlmodel import func, select

from app.core.config import settings
from app.api.deps import CurrentUser, SessionDep, parse_product_create, parse_product_update
from app.models import Product, ProductImage,  ProductCreate, ProductUpdate, ProductPublic, ProductsPublic, \
    ProductCategory, Collection, Message
from app.utils import save_image_to_local, delete_image_from_local

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=ProductsPublic)
def read_products(
    session: SessionDep,
    collection_id: UUID | None = Query(default=None),
    category_id: UUID | None = Query(default=None),
    is_gift: bool | None = Query(default=None),
    skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve products.
    """
    statement = select(Product)
    if category_id is not None:
      statement = statement.where(Product.category_id == category_id)
    if collection_id is not None:
      statement = statement.where(Product.collection_id == collection_id)
    if is_gift is not None:
      statement = statement.where(Product.is_gift == is_gift)
      
    products_order_bounds = select(
      func.min(Product.order), func.max(Product.order)
    )
    min_order, max_order = session.exec(products_order_bounds).one()
        
    count_subquery = statement.subquery()
    count = session.exec(
      select(func.count()).select_from(count_subquery)
    ).one()
    
    statement = statement.offset(skip).limit(limit).order_by(Product.order)
    products = session.exec(statement).all()
    
    return ProductsPublic(
      data=products,
      count=count,
      min_order=min_order,
      max_order=max_order
    )


@router.get("/category/{id}", response_model=ProductsPublic)
def read_products_by_category(
    session: SessionDep,
    id: UUID,
) -> Any:
    """
    Retrieve products by category.
    """
    count_statement = (
        select(func.count())
        .select_from(Product)
        .where(Product.category_id == id)
    )
    count = session.exec(count_statement).one()
    statement = (
        select(Product)
        .where(Product.category_id == id)
    )
    products = session.exec(statement).all()

    return ProductsPublic(data=products, count=count)

@router.get("/collection/{id}", response_model=ProductsPublic)
def read_products_by_collection(
    session: SessionDep,
    id: UUID,
    skip: int = 0, limit: int = 100,
    exclude_product_id: UUID | None = Query(default=None),
) -> Any:
    """
    Retrieve products by collection.
    """
    count_statement = (
        select(func.count())
        .select_from(Product)
        .where(Product.collection_id == id)
    )
    if exclude_product_id:
      count_statement = count_statement.where(Product.id != exclude_product_id)
    count = session.exec(count_statement).one()
    
    statement = (
        select(Product)
        .where(Product.collection_id == id)
        .offset(skip).limit(limit)
    )
    if exclude_product_id:
      statement = statement.where(Product.id != exclude_product_id)
      
    products = session.exec(statement).all()

    return ProductsPublic(data=products, count=count, min_order=None, max_order=None)

# @router.get("/")

@router.get("/{id}", response_model=ProductPublic)
def read_product(
      session: SessionDep,
      id: UUID
    ) -> Any:
    """
    Get product by ID.
    """
    product = session.get(Product, id)
    if not product:
      raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("/", response_model=ProductPublic)
def create_product(
      *,
      session: SessionDep,
      current_user: CurrentUser,
      product_in: ProductCreate = Depends(parse_product_create)
) -> Any:
    """
    Create new product.
    """
    category = session.get(ProductCategory, product_in.category_id)
    if not category:
      raise HTTPException(status_code=400, detail="Category not found")
    collection = session.get(Collection, product_in.collection_id)
    if not collection:
      raise HTTPException(status_code=400, detail="Collection not found")
    
    next_product_order = (session.scalar(select(func.max(Product.order))) or 0) + 1
    product = Product.model_validate(
      product_in.model_dump(exclude={"images"}),
      update={
        "owner_id": current_user.id,
        "category": category,
        "collection": collection,
        "order": next_product_order
      }
    )
    
    if product_in.images:
      for index, image_in in enumerate(product_in.images):
        image = save_image_to_local(
          image_in,
          settings.PRODUCT_IMAGES_DIR
        )
        product_image = ProductImage(
          url=image,
          alt_text=f"{product.title_en} product image",
          collection_id=collection.id,
          order=index+1
        )
            
        session.add(product_image)
        product.images.append(product_image)

    session.add(product)
    
    session.commit()
    session.refresh(product)
    return product


@router.put("/{id}", response_model=ProductPublic)
def update_product(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: UUID,
    product_in: ProductUpdate = Depends(parse_product_update),
) -> Any:
    product = session.get(Product, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if product_in.category_id:
      category = session.get(ProductCategory, product_in.category_id)
      if not category:
        raise HTTPException(status_code=400, detail="Category not found")
      product.category = category
    if product_in.collection_id:
      collection = session.get(Collection, product_in.collection_id)
      if not collection:
        raise HTTPException(status_code=400, detail="Collection not found")
      product.collection = collection

    update_dict = product_in.model_dump(
      exclude={"images"}
    )
    product.sqlmodel_update(update_dict)
    
    if product_in.images is not None:
      for image in product.images:
        delete_image_from_local(image.url)
        session.delete(image)
      session.commit()

      for index, image_in in enumerate(product_in.images):
        url = save_image_to_local(image_in, settings.PRODUCT_IMAGES_DIR)
        new_image = ProductImage(
          url=url,
          alt_text=f"{product.title_en} image",
          product=product,
          order=index + 1
        )
        session.add(new_image)

    session.add(product)
    session.commit()
    session.refresh(product)
    return product
  

@router.put("/update-order/{id}", response_model=ProductPublic)
def update_product_order(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: UUID,
    order_shift: int = Form(ge=-1, le=1),
) -> ProductPublic:
    """
    Update a product order with nearest one (-1 or +1).
    """
    product = session.get(Product, id)
    if not product:
      raise HTTPException(status_code=404, detail="Product not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if not order_shift: return product
    
    current_order = product.order
    new_order = current_order + order_shift
    
    max_order = session.scalar(select(func.max(Product.order)))
    if new_order < 1 or new_order > max_order:
      raise HTTPException(status_code=400, detail="Target order out of range")
    
    neighbor_product = session.exec(select(Product).where(Product.order == new_order)).first()
    if not neighbor_product:
      raise HTTPException(status_code=404, detail="Neighbor product not found")
    
    product.order = -1
    session.commit()

    neighbor_product.order = current_order
    session.commit()
    product.order = new_order
    session.commit()
    
    session.refresh(product)
    return product


@router.delete("/{id}")
def delete_product(
    session: SessionDep, current_user: CurrentUser, id: UUID
) -> Message:
    """
    Delete an product.
    """
    product = session.get(Product, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if not current_user.is_superuser and (product.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    product_images = session.exec(
        select(ProductImage).filter(ProductImage.product_id == product.id)
    ).all()
    for image in product_images:
      deleted = delete_image_from_local(image.url)
      if deleted: session.delete(image)
    session.delete(product)
    session.commit()
    return Message(message="Product deleted successfully")
