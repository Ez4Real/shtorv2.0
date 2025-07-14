import json
import uuid
import re
from datetime import datetime, timezone

from typing import Literal, Annotated, Union
from pydantic import EmailStr, BaseModel, model_validator, field_validator, StringConstraints
from sqlmodel import Field, Relationship, SQLModel, JSON
from sqlalchemy import UniqueConstraint, TypeDecorator
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
    alt_text: str | None = None

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
    order: int | None = Field(default=None)
    banner_desktop: UploadFile | None = File(default=None)
    banner_mobile: UploadFile | None = File(default=None)


class Collection(CollectionBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    order: int = Field(index=True, unique=True, gt=0) 
    banners: list["CollectionBanner"] = Relationship(back_populates="collection", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    products: list["Product"] = Relationship(back_populates="collection", cascade_delete=False)

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
    order: int
    banner_desktop: CollectionBannerPublic
    banner_mobile: CollectionBannerPublic

class CollectionsPublic(SQLModel):
    data: list[CollectionPublic]
    count: int
    min_order: int
    max_order: int


# Shared properties
class ProductCategoryBase(SQLModel):
    title_en: str = Field(min_length=1, max_length=255, unique=True)
    title_uk: str = Field(min_length=1, max_length=255, unique=True) 

class ProductCategoryCreate(ProductCategoryBase): pass

class ProductCategoryUpdate(ProductCategoryBase):
    title_en: str | None = Field(default=None, min_length=1, max_length=255, unique=True)
    title_uk: str | None = Field(default=None, min_length=1, max_length=255, unique=True)

class ProductCategory(ProductCategoryBase, table=True):
    __tablename__ = "product_category"
    
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    products: list["Product"] = Relationship(back_populates="category", cascade_delete=False)

class ProductCategoryPublic(ProductCategoryBase):
    id: uuid.UUID
    created_at: datetime
    
class ProductCategoriesPublic(SQLModel):
    data: list[ProductCategoryPublic]
    count: int
    

class ProductBase(SQLModel):
    sizes: list[str] | None = Field(default=None, sa_type=JSON, min_length=2)
    title_en: str = Field(min_length=1, max_length=255)
    title_uk: str = Field(min_length=1, max_length=255)
    description_en: str = Field(min_length=1, max_length=255)
    description_uk: str = Field(min_length=1, max_length=255)
    category_id: uuid.UUID
    collection_id: uuid.UUID
    price_usd: float = Field(ge=0.9, le=99999.0)
    price_uah: float = Field(ge=0.9, le=99999.0)
    price_eur: float = Field(ge=0.9, le=99999.0)
    attachment: bool = Field(default=False)
    is_gift: bool = Field(default=False)
    
    # code: str = Field(min_length=1, max_length=255, unique=True)
    
    @model_validator(mode='before')
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value
    
    
class ProductImage(ImageBase, table=True):
    __tablename__ = "product_images"
    __table_args__ = (UniqueConstraint("product_id", "order", name="unique_product_image_order"),)
    
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    product_id: uuid.UUID = Field(
        foreign_key="product.id", nullable=False, ondelete="CASCADE"
    )
    product: "Product" = Relationship(back_populates="images")
    order: int = Field(default=None)
     
class ProductCreate(ProductBase):
    images: list[UploadFile]


class UpdateBase(SQLModel):
    sizes: list[str] | None = Field(default=None, sa_type=JSON, min_length=2)
    title_en: str | None = Field(default=None, min_length=1, max_length=255)
    title_uk: str | None = Field(default=None, min_length=1, max_length=255)
    description_en: str | None = Field(default=None, min_length=1, max_length=255)
    description_uk: str | None = Field(default=None, min_length=1, max_length=255)
    category_id: uuid.UUID | None = Field(default=None)
    collection_id: uuid.UUID | None = Field(default=None)
    price_usd: float | None = Field(default=None, ge=0.9, le=99999.0)
    price_uah: float | None = Field(default=None, ge=0.9, le=99999.0)
    price_eur: float | None = Field(default=None, ge=0.9, le=99999.0)
    attachment: bool | None = Field(default=None)
    is_gift: bool | None = Field(default=None)
    
    @model_validator(mode='before')
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value

class ProductUpdate(UpdateBase):
    images: list[UploadFile] | None = Field(default=None)
    
    
class Product(ProductBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="products")
    
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    order: int = Field(index=True, unique=True, gt=0) 
    
    category_id: uuid.UUID = Field(
        foreign_key="product_category.id",
        index=True,
        ondelete="RESTRICT"
    )
    category: ProductCategory = Relationship(
        back_populates="products"
    )
    
    collection_id: uuid.UUID = Field(
        foreign_key="collection.id",
        index=True,
        ondelete="RESTRICT"
    )
    collection: Collection = Relationship(
        back_populates="products"
    )
    
    images: list[ProductImage] = Relationship(back_populates="product", cascade_delete=True)

# Properties to return via API, id is always required
class ProductPublic(ProductBase):
    id: uuid.UUID
    owner_id: uuid.UUID
    created_at: datetime
    order: int
    collection: CollectionPublic
    category: ProductCategoryPublic
    images: list[ProductImage]  

class ProductsPublic(SQLModel):
    data: list[ProductPublic]
    count: int
    min_order: int | None
    max_order: int | None
    

class GiftBase(SQLModel):
    title_en: str = Field(min_length=1, max_length=255)
    title_uk: str = Field(min_length=1, max_length=255)
    description_en: str = Field(min_length=1, max_length=510)
    description_uk: str = Field(min_length=1, max_length=510)
    price_usd: float = Field(ge=0.9, le=99999.0)
    price_uah: float = Field(ge=0.9, le=99999.0)
    price_eur: float = Field(ge=0.9, le=99999.0)
    
    dynamic_price: bool = Field(default=False)
    
    @model_validator(mode='before')
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value
    
class GiftUpdateBase(SQLModel):
    title_en: str | None = Field(default=None, min_length=1, max_length=255)
    title_uk: str | None = Field(default=None, min_length=1, max_length=255)
    description_en: str | None = Field(default=None, min_length=1, max_length=510)
    description_uk: str | None = Field(default=None, min_length=1, max_length=510)
    price_usd: float | None = Field(default=None, ge=0.9, le=99999.0)
    price_uah: float | None = Field(default=None, ge=0.9, le=99999.0)
    price_eur: float | None = Field(default=None, ge=0.9, le=99999.0)
    dynamic_price: bool | None = Field(default=None) 
    
    @model_validator(mode='before')
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value

class GiftCreate(GiftBase):
    image: UploadFile

class GiftUpdate(GiftUpdateBase): 
    image: UploadFile | None = File(default=None)
    
class Gift(GiftBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    order: int = Field(index=True, unique=True, gt=0)
    image: "GiftBanner" = Relationship(back_populates="gift", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

class GiftBanner(ImageBase, table=True):
    __tablename__ = "gift_banner"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    gift_id: uuid.UUID = Field(
        foreign_key="gift.id", nullable=False, ondelete="CASCADE"
    )
    gift: Gift = Relationship(back_populates="image")

class GiftBannerPublic(ImageBase):
    id: uuid.UUID

class GiftPublic(GiftBase):
    id: uuid.UUID
    created_at: datetime
    order: int
    image: GiftBannerPublic

class GiftsPublic(SQLModel):
    data: list[GiftPublic]
    count: int
    min_order: int
    max_order: int
    

class PydanticJSONType(TypeDecorator):
    impl = JSON

    def __init__(self, pydantic_model: type[BaseModel], *args, **kwargs):
        self.pydantic_model = pydantic_model
        super().__init__(*args, **kwargs)

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        return json.loads(value.json())

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        return self.pydantic_model.model_validate(value)
    

class Address(SQLModel):
    country: str
    first_name: str
    last_name: str
    address: str
    additional: str | None = Field(default=None)
    postal_code: str
    city: str
    phone: Annotated[str, StringConstraints(strip_whitespace=True, min_length=7, max_length=20)]
    
    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        if not re.fullmatch(r"^\+?[0-9\s\-()]{7,20}$", v):
            raise ValueError("Invalid phone number format")
        return v
    
class ShippingMethods(str, Enum):
    UPS_EXPRESS = "ups_express"
    NOVA_POST = "nova_post"
    
class PaymentStatus(str, Enum):
    CREATED = "created"
    PROCESSING = "processing"
    HOLD = "hold"
    SUCCESS = "success"
    FAILURE = "failure"
    REVERSED = "reversed"
    EXPIRED = "expired"

class CartProductBase(SQLModel):
    id: uuid.UUID
    title_en: str = Field(min_length=1, max_length=255)
    title_uk: str = Field(min_length=1, max_length=255)
    price_usd: float = Field(ge=0.9, le=99999.0)
    price_uah: float = Field(ge=0.9, le=99999.0)
    price_eur: float = Field(ge=0.9, le=99999.0)
    
    
class ProductAttachmentType(str, Enum):
    SILVER_ORBIT = "silver-orbit"
    SILVER_CHAIN = "silver-chain"
    
class ProductAttachment(SQLModel):
    name: ProductAttachmentType
    price_usd: float = Field(ge=0.9, le=99999.0)
    price_uah: float = Field(ge=0.9, le=99999.0)
    price_eur: float = Field(ge=0.9, le=99999.0)
    
class ProductCartItem(CartProductBase):
    type: Literal["product"] = "product"
    description_en: str = Field(min_length=1, max_length=255)
    description_uk: str = Field(min_length=1, max_length=255)
    collection: CollectionPublic
    category: ProductCategoryPublic
    images: list[ProductImage]
    size: str | None
    attachment: ProductAttachment | None
    
class CertificateType(str, Enum):
    PHYSICAL = "physical"
    DIGITAL = "digital"
    
class GiftCartItem(CartProductBase):
    type: Literal["gift"] = "gift"
    images: list[GiftBannerPublic]
    certificate_type: CertificateType

class PydanticJSONListType(TypeDecorator):
    impl = JSON

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        return [json.loads(item.model_dump_json()) for item in value]

    def process_result_value(self, value, dialect):
        if value is None:
            return None

        def detect_type(item: dict):
            data_type = item["data"].get("type")
            if data_type == "product":
                item["data"] = ProductCartItem.model_validate(item["data"])
            elif data_type == "gift":
                item["data"] = GiftCartItem.model_validate(item["data"])
            else:
                raise ValueError(f"Unknown data type: {data_type}")
            return OrderBasketItem(**item)

        return [detect_type(item) for item in value]

class Currency(str, Enum):
    UAH = "uah"
    USD = "usd"
    EUR = "eur"


class BasketItemBase(SQLModel):
    icon: str
    unit: str = Field(default="шт.")
    code: str
    qty: int = Field(gt=0)
    
class PaymentBasketItem(BasketItemBase):
    name: str
    sum: int = Field(gt=0)
    total: int = Field(gt=0)

    
BasketItemData = Annotated[Union[ProductCartItem, GiftCartItem], Field(discriminator="type")]
class OrderBasketItem(BasketItemBase):
    id: uuid.UUID
    data: BasketItemData

class OrderBase(SQLModel):
    email: str
    delivery_address: Address = Field(sa_type=PydanticJSONType(Address))
    billing_address: Address | None = Field(sa_type=PydanticJSONType(Address), default=None)
    shipping_method: ShippingMethods
    mailing: bool = Field(default=False)
    comment: str | None
    payment_status: PaymentStatus = Field(default="created")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    modified_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    amount: int
    currency: Currency
    basketOrder: list[OrderBasketItem] = Field(sa_type=PydanticJSONListType(OrderBasketItem))
    
    class Config:
      arbitrary_types_allowed = True

class OrderCreate(OrderBase):
    invoiceId: str = Field(unique=True)
    
class Order(OrderBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    modified_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    invoiceId: str = Field(unique=True)

class OrderPublic(OrderBase):
    id: uuid.UUID
    invoiceId: str = Field(unique=True)
    created_at: datetime
    modified_date: datetime

class OrdersPublic(SQLModel):
    data: list[OrderPublic]
    count: int


class MerchantPaymentInfo(SQLModel):
  reference: str
  destination: str
  comment: str | None = Field(default=None)
  customerEmails: list[str]
  basketOrder: list[PaymentBasketItem]

class PaymentCreate(SQLModel):
    amount: int
    ccy: int # 980 | 840 | 978  (UAH | USD | EUR)
    merchantPaymInfo: MerchantPaymentInfo = Field(sa_type=PydanticJSONType(MerchantPaymentInfo))
    redirectUrl: str | None = Field(default=None)
    webHookUrl: str | None = Field(default=None)

    validity: int | None = Field(default=None) # Строк дії в секундах, за замовчуванням рахунок перестає бути дійсним через 24 години
    paymentType: str | None = Field(default='debit') # "debit" | "hold" Для значення hold термін складає 9 днів. Якщо через 9 днів холд не буде фіналізовано — він скасовується
    qrId: str | None = Field(default=None) # Ідентифікатор QR-каси для встановлення суми оплати на існуючих QR-кас
    code: str | None = Field(default=None) # Код терміналу субмерчанта, з апі “Список субмерчантів”.
    displayType: str | None = Field(default=None)
    # saveCardData: None | SaveCardData
    
    class Config:
      arbitrary_types_allowed = True
      
class PaymentResponse(SQLModel):
    invoiceId: str
    pageUrl: str

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
