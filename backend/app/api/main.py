from fastapi import APIRouter

from app.api.routes import collections, categories, login, private, users, \
    utils, products, gifts, orders, payments
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
api_router.include_router(categories.router)
api_router.include_router(collections.router)
api_router.include_router(products.router)
api_router.include_router(gifts.router)
api_router.include_router(orders.router)
api_router.include_router(payments.router)


if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)
