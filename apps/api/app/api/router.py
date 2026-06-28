from fastapi import APIRouter

from app.api.routes import kanji, search, tooltips

api_router = APIRouter(prefix="/api")
api_router.include_router(search.router)
api_router.include_router(kanji.router)
api_router.include_router(tooltips.router)
