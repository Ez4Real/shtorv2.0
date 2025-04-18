import json
import uuid
from datetime import datetime, timezone

from pydantic import EmailStr, BaseModel, model_validator
from sqlmodel import Field, Relationship, SQLModel
from fastapi import UploadFile, File, Form
from enum import Enum


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)

class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)

# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)

class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)

class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)

# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    products: list["Product"] = Relationship(back_populates="owner", cascade_delete=True)

# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID

class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int
    
    
class ImageBase(SQLModel):
    url: str
    alt_text: str

class ImagesUpload(BaseModel):
    images: list[UploadFile] = File(...)

class ImageCreate(ImageBase):
    pass
    
class ImageUpdate(ImageBase):
    id: uuid.UUID


class DeviceType(str, Enum):
    desktop = "desktop"
    mobile = "mobile"

class CollectionBase(SQLModel):
    title: str = Field(unique=True, index=True, min_length=1, max_length=255)
    
    @model_validator(mode='before')
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value
    
class CollectionCreate(CollectionBase):
    banner_desktop: UploadFile
    banner_mobile: UploadFile

class CollectionUpdate(SQLModel):
    title: str | None = Field(default=None, min_length=1, max_length=255) 
    banner_desktop: UploadFile | None = File(default=None)
    banner_mobile: UploadFile | None = File(default=None)


class Collection(CollectionBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    banners: list["CollectionBanner"] = Relationship(back_populates="collection", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

    @property
    def banner_desktop(self) -> "CollectionBanner":
        return next((b for b in self.banners if b.device_type == DeviceType.desktop), None)
    @property
    def banner_mobile(self) -> "CollectionBanner":
        return next((b for b in self.banners if b.device_type == DeviceType.mobile), None)
    

class CollectionBanner(ImageBase, table=True):
    __tablename__ = "collection_banner"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    collection_id: uuid.UUID = Field(
        foreign_key="collection.id", nullable=False, ondelete="CASCADE"
    )
    device_type: DeviceType = Field(index=True)
    collection: Collection = Relationship(back_populates="banners")

class CollectionBannerPublic(ImageBase):
    id: uuid.UUID
    device_type: DeviceType

class CollectionPublic(CollectionBase):
    id: uuid.UUID
    created_at: datetime
    banner_desktop: CollectionBannerPublic
    banner_mobile: CollectionBannerPublic

class CollectionsPublic(SQLModel):
    data: list[CollectionPublic]
    count: int


# Shared properties
class ProductBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)

# Properties to receive on product creation
class ProductCreate(ProductBase):
    pass

# Properties to receive on product update
class ProductUpdate(ProductBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore

# Database model, database table inferred from class name
class Product(ProductBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(max_length=255)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="products")

# Properties to return via API, id is always required
class ProductPublic(ProductBase):
    id: uuid.UUID
    owner_id: uuid.UUID

class ProductsPublic(SQLModel):
    data: list[ProductPublic]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)
