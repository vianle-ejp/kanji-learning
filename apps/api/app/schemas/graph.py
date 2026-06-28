from pydantic import BaseModel


class TooltipResponse(BaseModel):
    type: str
    id: str
    label: str
    shortMeaning: str
    hiragana: str | None = None
    hanViet: str | None = None


class GraphNodeResponse(BaseModel):
    id: str
    type: str
    label: str
    x: float
    y: float
    tooltip: TooltipResponse


class GraphEdgeResponse(BaseModel):
    id: str
    source: str
    target: str
    relationType: str
    weight: float


class GraphResponse(BaseModel):
    nodes: list[GraphNodeResponse]
    edges: list[GraphEdgeResponse]
