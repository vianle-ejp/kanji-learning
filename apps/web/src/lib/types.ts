export type { GraphEdge, GraphNode, TooltipPayload } from "@kanji/shared-types";

import type { GraphEdge, GraphNode } from "@kanji/shared-types";

export interface GraphResponse {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
