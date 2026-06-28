from fastapi import APIRouter, Depends

from app.schemas.graph import TooltipResponse
from app.services.kanji_service import KanjiService
from app.services.seed_service import SeedService, get_seed_service

router = APIRouter(prefix="/tooltips", tags=["tooltips"])


def get_kanji_service(seed_service: SeedService = Depends(get_seed_service)) -> KanjiService:
    return KanjiService(seed_service)


@router.get("/{entity_type}/{entity_id}", response_model=TooltipResponse)
def get_tooltip(
    entity_type: str,
    entity_id: str,
    service: KanjiService = Depends(get_kanji_service),
) -> TooltipResponse:
    return service.get_tooltip(entity_type, entity_id)
