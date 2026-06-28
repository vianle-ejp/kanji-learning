from fastapi.testclient import TestClient

from app.main import app


def test_get_kanji_detail_returns_core_fields_and_related_vocabulary() -> None:
    client = TestClient(app)

    response = client.get("/api/kanji/全")

    assert response.status_code == 200
    payload = response.json()
    assert payload["character"] == "全"
    assert payload["han_viet"] == "toan"
    assert payload["related_vocabulary"][0]["writing"] == "完全"


def test_get_kanji_graph_returns_nodes_and_edges() -> None:
    client = TestClient(app)

    response = client.get("/api/kanji/全/graph")

    assert response.status_code == 200
    payload = response.json()
    assert payload["nodes"][0]["label"] == "全"
    assert payload["edges"][0]["relationType"] == "appears_in"
