from fastapi import APIRouter, Depends

from app.repositories import search_repository
from app.schemas.kanji import SearchResponse
from app.services.seed_service import SeedService, get_seed_service

router = APIRouter(prefix="/search", tags=["search"])


@router.get("", response_model=SearchResponse)
def search(q: str, seed_service: SeedService = Depends(get_seed_service)) -> SearchResponse:
    return search_repository.search(seed_service, q)
