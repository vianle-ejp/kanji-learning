from collections.abc import Iterable

from app.services.seed_service import SeedService


def get_payload(seed_service: SeedService) -> dict[str, list[dict[str, object]]]:
    return seed_service.load()


def get_kanji_by_character(seed_service: SeedService, character: str) -> dict[str, object] | None:
    return next(
        (kanji for kanji in seed_service.load()["kanji"] if kanji["character"] == character),
        None,
    )


def get_vocabulary_by_id(seed_service: SeedService, vocabulary_id: int) -> dict[str, object] | None:
    return next(
        (
            vocabulary
            for vocabulary in seed_service.load()["vocabulary"]
            if vocabulary["id"] == vocabulary_id
        ),
        None,
    )


def get_examples_for_vocabulary_ids(
    seed_service: SeedService, vocabulary_ids: Iterable[int]
) -> list[dict[str, object]]:
    vocabulary_id_set = set(vocabulary_ids)
    return [
        example
        for example in seed_service.load()["examples"]
        if example["vocabulary_id"] in vocabulary_id_set
    ]


def get_edges_for_kanji(seed_service: SeedService, kanji_id: int) -> list[dict[str, object]]:
    return [
        edge
        for edge in seed_service.load()["edges"]
        if edge["source_type"] == "kanji" and edge["source_id"] == kanji_id
    ]
