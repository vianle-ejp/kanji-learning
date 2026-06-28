import json
from pathlib import Path

from app.services.seed_service import SeedService


def test_seed_loader_reads_kanji_and_relations(tmp_path: Path) -> None:
    (tmp_path / "kanji.json").write_text(
        json.dumps(
            [
                {
                    "id": 1,
                    "character": "完",
                    "meanings": "complete; whole",
                    "onyomi": "カン",
                    "kunyomi": "まった(く)",
                    "hiragana_reading": "かん",
                    "pitch_accent": "1",
                    "han_viet": "hoan",
                }
            ]
        ),
        encoding="utf-8",
    )
    (tmp_path / "vocabulary.json").write_text(
        json.dumps(
            [
                {
                    "id": 1,
                    "writing": "完全",
                    "reading": "かんぜん",
                    "meaning": "complete",
                    "han_viet": "hoan toan",
                }
            ]
        ),
        encoding="utf-8",
    )
    (tmp_path / "edges.json").write_text(
        json.dumps(
            [
                {
                    "id": 1,
                    "source_type": "kanji",
                    "source_id": 1,
                    "target_type": "vocabulary",
                    "target_id": 1,
                    "relation_type": "appears_in",
                    "weight": 1.0,
                }
            ]
        ),
        encoding="utf-8",
    )
    (tmp_path / "examples.json").write_text(
        json.dumps(
            [
                {
                    "id": 1,
                    "vocabulary_id": 1,
                    "japanese_sentence": "完全に理解した。",
                    "reading": "かんぜんにりかいした。",
                    "meaning_vi": "Tôi da hieu hoan toan.",
                }
            ]
        ),
        encoding="utf-8",
    )

    loader = SeedService(seed_dir=tmp_path)

    payload = loader.load()

    assert payload["kanji"][0]["character"] == "完"
    assert payload["vocabulary"][0]["writing"] == "完全"
    assert payload["edges"][0]["relation_type"] == "appears_in"
    assert payload["examples"][0]["meaning_vi"] == "Tôi da hieu hoan toan."
