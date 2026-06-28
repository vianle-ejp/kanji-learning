from app.schemas.kanji import KanjiSummaryResponse, SearchResponse
from app.schemas.vocabulary import VocabularySummaryResponse
from app.services.seed_service import SeedService


def search(seed_service: SeedService, query: str) -> SearchResponse:
    payload = seed_service.load()
    normalized_query = query.strip().lower()

    kanji_matches = [
        KanjiSummaryResponse(**kanji)
        for kanji in payload["kanji"]
        if _matches_kanji(kanji, normalized_query)
    ]
    vocabulary_matches = [
        VocabularySummaryResponse(**vocabulary)
        for vocabulary in payload["vocabulary"]
        if _matches_vocabulary(vocabulary, normalized_query)
    ]

    return SearchResponse(kanji=kanji_matches, vocabulary=vocabulary_matches)


def _matches_kanji(kanji: dict[str, object], query: str) -> bool:
    return any(
        query in str(kanji.get(field, "")).lower()
        for field in ("character", "meanings", "hiragana_reading", "han_viet")
    )


def _matches_vocabulary(vocabulary: dict[str, object], query: str) -> bool:
    return any(
        query in str(vocabulary.get(field, "")).lower()
        for field in ("writing", "reading", "meaning", "han_viet")
    )
