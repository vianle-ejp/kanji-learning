import json
from pathlib import Path
from typing import Any


class SeedService:
    def __init__(self, seed_dir: Path) -> None:
        self.seed_dir = seed_dir

    def load(self) -> dict[str, list[dict[str, Any]]]:
        return {
            "kanji": self._read_json("kanji.json"),
            "vocabulary": self._read_json("vocabulary.json"),
            "edges": self._read_json("edges.json"),
            "examples": self._read_json("examples.json"),
        }

    def _read_json(self, filename: str) -> list[dict[str, Any]]:
        file_path = self.seed_dir / filename
        with file_path.open("r", encoding="utf-8") as seed_file:
            return json.load(seed_file)
