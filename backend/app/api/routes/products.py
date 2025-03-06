from uuid import UUID
from typing import Any, List

from fastapi import APIRouter, HTTPException, UploadFile, File
from sqlmodel import func, select

from app.core.config import settings
from app.api.deps import CurrentUser, UserOrNone, SessionDep
from app.models import Product, ProductCreate, ProductUpdate, ProductPublic, ProductsPublic, Message
from app.utils import save_image_to_local, delete_image_from_local

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=ProductsPublic)
def read_products(
    session: SessionDep,
    current_user: CurrentUser,
    skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve products.
    """

    if not current_user or current_user.is_superuser:
        count_statement = select(func.count()).select_from(Product)
        count = session.exec(count_statement).one()
        statement = select(Product).offset(skip).limit(limit)
        products = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Product)
            .where(Product.owner_id == current_user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Product)
            .where(Product.owner_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        products = session.exec(statement).all()
    return ProductsPublic(data=products, count=count)


@router.get("/category/{category}", response_model=ProductsPublic)
def read_products_by_category(
    session: SessionDep, category: str
) -> Any:
    """
    Retrieve products by category.
    """
    count_statement = (
        select(func.count())
        .select_from(Product)
        .where(Product.category == category)
    )
    count = session.exec(count_statement).one()
    statement = (
        select(Product)
        .where(Product.category == category)
    )
    products = session.exec(statement).all()

    return ProductsPublic(data=products, count=count)


@router.get("/{id}", response_model=ProductPublic)
def read_product(session: SessionDep, current_user: CurrentUser, id: UUID) -> Any:
    """
    Get product by ID.
    """
    product = session.get(Product, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if not current_user.is_superuser and (product.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return product


@router.post("/", response_model=ProductPublic)
def create_product(
    *, session: SessionDep, current_user: CurrentUser, product_in: ProductCreate
) -> Any:
    """
    Create new product.
    """
    product = Product.model_validate(
        product_in, 
        # product_in.model_dump(exclude={"images"}),
        update={"owner_id": current_user.id}
    )
    session.add(product)
    # if product_in.images:
    #     for image_in in product_in.images:
    #         image = ProductImage.model_validate(image_in, update={"product_id": product.id})
    #         session.add(image)
    session.commit()
    session.refresh(product)
    return product


@router.post("/upload-images")
async def upload_images(
      *,
      current_user: CurrentUser,
      images: List[UploadFile] = File(...)
    ) -> dict:
    """
    Upload multiple product images and save them to local storage.
    """
    # !!!!!
    image_urls = [
        save_image_to_local(image, settings.UPLOAD_DIR) for image in images
    ]
    
    return { "urls": image_urls }


@router.put("/{id}", response_model=ProductPublic)
def update_product(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: UUID,
    product_in: ProductUpdate,
) -> Any:
    """
    Update an product.
    """
    product = session.get(Product, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if not current_user.is_superuser and (product.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = product_in.model_dump(exclude_unset=True)
    product.sqlmodel_update(update_dict)
    # if product_in.images:
    #     session.exec(ProductImage).filter(ProductImage.product_id == id).delete()
    #     for image_in in product_in.images:
    #         image = ProductImage.model_validate(image_in, update={"product_id": product.id})
    #         session.add(image)
    session.add(product)
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
    # product_images = session.exec(
    #     select(ProductImage).filter(ProductImage.product_id == product.id)
    # ).all()
    # for image in product_images:
    #     deleted = delete_image_from_local(
    #         image.url,
    #         settings.UPLOAD_DIR
    #     )
    #     if deleted: session.delete(image)
    session.delete(product)
    session.commit()
    return Message(message="Product deleted successfully")
