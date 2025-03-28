from fastapi import APIRouter

from app.api.routes import collections, login, private, users, utils, products
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
api_router.include_router(collections.router)
api_router.include_router(products.router)


if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)
