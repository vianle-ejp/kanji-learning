export interface TooltipPayload {
  type: "kanji" | "vocabulary";
  id: string;
  label: string;
  shortMeaning: string;
  hiragana?: string;
  hanViet?: string;
}

export interface GraphNode {
  id: string;
  type: "kanji" | "vocabulary";
  label: string;
  x: number;
  y: number;
  tooltip: TooltipPayload;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationType: string;
  weight: number;
}
