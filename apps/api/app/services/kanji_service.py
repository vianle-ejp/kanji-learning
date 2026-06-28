from fastapi import HTTPException

from app.repositories import kanji_repository
from app.schemas.graph import GraphEdgeResponse, GraphNodeResponse, GraphResponse, TooltipResponse
from app.schemas.kanji import KanjiDetailResponse
from app.schemas.vocabulary import ExampleResponse, VocabularySummaryResponse
from app.services.seed_service import SeedService


class KanjiService:
    def __init__(self, seed_service: SeedService) -> None:
        self.seed_service = seed_service

    def get_kanji_detail(self, character: str) -> KanjiDetailResponse:
        kanji = kanji_repository.get_kanji_by_character(self.seed_service, character)
        if kanji is None:
            raise HTTPException(status_code=404, detail="Kanji not found")

        related_edges = kanji_repository.get_edges_for_kanji(self.seed_service, int(kanji["id"]))
        related_vocabulary = [
            VocabularySummaryResponse(**vocabulary)
            for edge in related_edges
            if (vocabulary := kanji_repository.get_vocabulary_by_id(self.seed_service, int(edge["target_id"])))
            is not None
        ]
        examples = [
            ExampleResponse(**example)
            for example in kanji_repository.get_examples_for_vocabulary_ids(
                self.seed_service, [vocabulary.id for vocabulary in related_vocabulary]
            )
        ]

        return KanjiDetailResponse(
            **kanji,
            related_vocabulary=related_vocabulary,
            examples=examples,
        )

    def get_graph(self, character: str) -> GraphResponse:
        kanji = kanji_repository.get_kanji_by_character(self.seed_service, character)
        if kanji is None:
            raise HTTPException(status_code=404, detail="Kanji not found")

        related_edges = kanji_repository.get_edges_for_kanji(self.seed_service, int(kanji["id"]))
        nodes = [
            GraphNodeResponse(
                id=f"kanji-{kanji['id']}",
                type="kanji",
                label=str(kanji["character"]),
                x=0,
                y=0,
                tooltip=self._build_tooltip("kanji", kanji),
            )
        ]

        for index, edge in enumerate(related_edges, start=1):
            vocabulary = kanji_repository.get_vocabulary_by_id(self.seed_service, int(edge["target_id"]))
            if vocabulary is None:
                continue
            nodes.append(
                GraphNodeResponse(
                    id=f"vocabulary-{vocabulary['id']}",
                    type="vocabulary",
                    label=str(vocabulary["writing"]),
                    x=float(index),
                    y=float(index),
                    tooltip=self._build_tooltip("vocabulary", vocabulary),
                )
            )

        edges = [
            GraphEdgeResponse(
                id=str(edge["id"]),
                source=f"kanji-{edge['source_id']}",
                target=f"vocabulary-{edge['target_id']}",
                relationType=str(edge["relation_type"]),
                weight=float(edge["weight"]),
            )
            for edge in related_edges
        ]

        return GraphResponse(nodes=nodes, edges=edges)

    def get_tooltip(self, entity_type: str, entity_id: str) -> TooltipResponse:
        payload = kanji_repository.get_payload(self.seed_service)

        if entity_type == "kanji":
            entity = next((kanji for kanji in payload["kanji"] if str(kanji["id"]) == entity_id), None)
        elif entity_type == "vocabulary":
            entity = next(
                (vocabulary for vocabulary in payload["vocabulary"] if str(vocabulary["id"]) == entity_id),
                None,
            )
        else:
            entity = None

        if entity is None:
            raise HTTPException(status_code=404, detail="Tooltip target not found")

        return self._build_tooltip(entity_type, entity)

    def _build_tooltip(self, entity_type: str, entity: dict[str, object]) -> TooltipResponse:
        if entity_type == "kanji":
            return TooltipResponse(
                type="kanji",
                id=str(entity["id"]),
                label=str(entity["character"]),
                shortMeaning=str(entity["meanings"]),
                hiragana=str(entity.get("hiragana_reading") or ""),
                hanViet=str(entity.get("han_viet") or ""),
            )

        return TooltipResponse(
            type="vocabulary",
            id=str(entity["id"]),
            label=str(entity["writing"]),
            shortMeaning=str(entity["meaning"]),
            hiragana=str(entity.get("reading") or ""),
            hanViet=str(entity.get("han_viet") or ""),
        )
