from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models import Base


class Vocabulary(Base):
    __tablename__ = "vocabulary"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    writing: Mapped[str] = mapped_column(String, index=True, nullable=False)
    reading: Mapped[str | None] = mapped_column(Text, nullable=True)
    meaning: Mapped[str] = mapped_column(Text, nullable=False)
    han_viet: Mapped[str | None] = mapped_column(Text, nullable=True)
    level: Mapped[str | None] = mapped_column(String(32), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    examples: Mapped[list["Example"]] = relationship(
        "Example",
        back_populates="vocabulary",
        cascade="all, delete-orphan",
    )
