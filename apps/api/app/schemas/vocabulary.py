from pydantic import BaseModel


class VocabularySummaryResponse(BaseModel):
    id: int
    writing: str
    reading: str | None = None
    meaning: str
    han_viet: str | None = None


class ExampleResponse(BaseModel):
    id: int
    japanese_sentence: str
    reading: str | None = None
    meaning_vi: str
