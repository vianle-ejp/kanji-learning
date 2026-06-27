from sqlalchemy import ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models import Base


class Example(Base):
    __tablename__ = "examples"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    vocabulary_id: Mapped[int] = mapped_column(ForeignKey("vocabulary.id"), nullable=False)
    japanese_sentence: Mapped[str] = mapped_column(Text, nullable=False)
    reading: Mapped[str | None] = mapped_column(Text, nullable=True)
    meaning_vi: Mapped[str] = mapped_column(Text, nullable=False)

    vocabulary: Mapped["Vocabulary"] = relationship("Vocabulary", back_populates="examples")
