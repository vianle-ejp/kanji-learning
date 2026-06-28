from pydantic import BaseModel

from app.schemas.vocabulary import ExampleResponse, VocabularySummaryResponse


class KanjiSummaryResponse(BaseModel):
    id: int
    character: str
    meanings: str
    hiragana_reading: str | None = None
    han_viet: str | None = None


class KanjiDetailResponse(BaseModel):
    id: int
    character: str
    meanings: str
    onyomi: str | None = None
    kunyomi: str | None = None
    hiragana_reading: str | None = None
    pitch_accent: str | None = None
    han_viet: str | None = None
    jlpt_level: str | None = None
    frequency: int | None = None
    notes: str | None = None
    related_vocabulary: list[VocabularySummaryResponse]
    examples: list[ExampleResponse]


class SearchResponse(BaseModel):
    kanji: list[KanjiSummaryResponse]
    vocabulary: list[VocabularySummaryResponse]
