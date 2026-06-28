from fastapi import APIRouter, Depends

from app.schemas.graph import GraphResponse
from app.schemas.kanji import KanjiDetailResponse
from app.services.kanji_service import KanjiService
from app.services.seed_service import SeedService, get_seed_service

router = APIRouter(prefix="/kanji", tags=["kanji"])


def get_kanji_service(seed_service: SeedService = Depends(get_seed_service)) -> KanjiService:
    return KanjiService(seed_service)


@router.get("/{character}", response_model=KanjiDetailResponse)
def get_kanji_detail(character: str, service: KanjiService = Depends(get_kanji_service)) -> KanjiDetailResponse:
    return service.get_kanji_detail(character)


@router.get("/{character}/graph", response_model=GraphResponse)
def get_kanji_graph(character: str, service: KanjiService = Depends(get_kanji_service)) -> GraphResponse:
    return service.get_graph(character)
