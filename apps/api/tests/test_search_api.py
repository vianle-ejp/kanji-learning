from fastapi.testclient import TestClient

from app.main import app


def test_search_returns_kanji_and_vocabulary_matches() -> None:
    client = TestClient(app)

    response = client.get("/api/search", params={"q": "全"})

    assert response.status_code == 200
    payload = response.json()
    assert payload["kanji"][0]["character"] == "全"
    assert payload["vocabulary"][0]["writing"] == "完全"
