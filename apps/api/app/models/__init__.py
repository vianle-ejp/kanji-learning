from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


from app.models.edge import Edge
from app.models.example import Example
from app.models.kanji import Kanji
from app.models.vocabulary import Vocabulary

__all__ = ["Base", "Kanji", "Vocabulary", "Edge", "Example"]
