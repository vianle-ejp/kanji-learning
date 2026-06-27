from app.models import Base, Edge, Example, Kanji, Vocabulary


def test_models_export_expected_tables() -> None:
    assert Kanji.__tablename__ == "kanji"
    assert Vocabulary.__tablename__ == "vocabulary"
    assert Edge.__tablename__ == "edges"
    assert Example.__tablename__ == "examples"


def test_model_metadata_includes_all_expected_tables() -> None:
    assert set(Base.metadata.tables) == {"kanji", "vocabulary", "edges", "examples"}
