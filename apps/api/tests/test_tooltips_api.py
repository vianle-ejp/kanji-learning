from fastapi.testclient import TestClient

from app.main import app


def test_get_tooltip_returns_small_payload_for_vocabulary() -> None:
    client = TestClient(app)

    response = client.get("/api/tooltips/vocabulary/1")

    assert response.status_code == 200
    payload = response.json()
    assert payload["type"] == "vocabulary"
    assert payload["label"] == "完全"
    assert payload["shortMeaning"] == "complete; perfect"
