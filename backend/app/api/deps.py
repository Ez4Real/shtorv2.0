from collections.abc import Generator
from typing import Annotated 
import uuid

import jwt
from fastapi import Depends, HTTPException, status, UploadFile, Form, File
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import Session

from app.core import security
from app.core.config import settings
from app.core.db import engine
from app.models import TokenPayload, User, CollectionBase, CollectionCreate, CollectionUpdate, \
    ProductBase, ProductCreate, ProductUpdate, UpdateBase, GiftBase, GiftCreate, GiftUpdate, GiftUpdateBase

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_user(session: SessionDep, token: TokenDep) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = session.get(User, token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user

CurrentUser = Annotated[User, Depends(get_current_user)]


# def get_user_or_none(session: SessionDep, token: Optional[TokenDep] = None) -> Optional[User]:
#     if not token: return None 
#     try:
#         payload = jwt.decode(
#             token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
#         )
#         token_data = TokenPayload(**payload)
#     except (InvalidTokenError, ValidationError):
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Could not validate credentials",
#         )
#     user = session.get(User, token_data.sub)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     if not user.is_active:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return user

# UserOrNone = Annotated[User, Depends(get_user_or_none)]


def get_current_active_superuser(current_user: CurrentUser) -> User:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user


def parse_collection_create(
    collection: CollectionBase = Form(...),
    banner_desktop: UploadFile = File(),
    banner_mobile: UploadFile = File()
) -> CollectionCreate:
    collection_data = collection.model_dump()
    collection = CollectionCreate(
        banner_desktop=banner_desktop,
        banner_mobile=banner_mobile,
        **collection_data
    )
    return collection

def parse_collection_update(
    collection: CollectionBase = Form(...),
    banner_desktop: UploadFile | None = File(default=None),
    banner_mobile: UploadFile | None = File(default=None)
) -> CollectionUpdate:
    collection_data = collection.model_dump()
    collection = CollectionUpdate(
        banner_desktop=banner_desktop, 
        banner_mobile=banner_mobile,
        **collection_data)
    return collection

def parse_product_create(
    product: ProductBase = Form(...),
    images: list[UploadFile] = File(),
) -> ProductCreate:
    product_data = product.model_dump()
    product = ProductCreate(
        images=images,
        **product_data
    )
    return product
    
def parse_product_update(
    product: UpdateBase = Form(...),
    images: list[UploadFile] | None = File(default=None),
) -> ProductUpdate:
    return ProductUpdate(
        **product.model_dump(exclude_unset=True, exclude={"sizes"}),
        sizes=product.sizes,
        images=images
    )

def parse_gift_create(
    gift: GiftBase = Form(...),
    image: UploadFile = File(),
) -> GiftCreate:
    gift_data = gift.model_dump()
    gift = GiftCreate(
        image=image,
        **gift_data
    )
    return gift

def parse_gift_update(
    gift: GiftUpdateBase = Form(...),
    image: UploadFile | None = File(default=None),
) -> GiftUpdate:
    gift_data = gift.model_dump()
    gift = GiftUpdate(
        image=image, 
        **gift_data)
    return gift