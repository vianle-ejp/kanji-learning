from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models import Base


class Kanji(Base):
    __tablename__ = "kanji"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    character: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    meanings: Mapped[str] = mapped_column(Text, nullable=False)
    onyomi: Mapped[str | None] = mapped_column(Text, nullable=True)
    kunyomi: Mapped[str | None] = mapped_column(Text, nullable=True)
    hiragana_reading: Mapped[str | None] = mapped_column(Text, nullable=True)
    pitch_accent: Mapped[str | None] = mapped_column(Text, nullable=True)
    han_viet: Mapped[str | None] = mapped_column(Text, nullable=True)
    jlpt_level: Mapped[str | None] = mapped_column(String(16), nullable=True)
    frequency: Mapped[int | None] = mapped_column(Integer, nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
