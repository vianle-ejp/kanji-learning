import type { GraphNode, GraphResponse } from "@/lib/types";

export interface RelationshipRow {
  id: string;
  kanji: string;
  hiragana: string;
  romaji: string;
  hanViet: string;
  exampleSentence: string;
}

export interface KnowledgeWorkspaceViewModel {
  root: {
    id: string;
    label: string;
  };
  rows: RelationshipRow[];
}

export const rowOverrides: Record<
  string,
  Omit<RelationshipRow, "id" | "kanji">
> = {
  "安全": {
    hiragana: "あんぜん",
    romaji: "an'zen",
    hanViet: "an toan",
    exampleSentence: "この道は安全です。",
  },
  "全部": {
    hiragana: "ぜんぶ",
    romaji: "zenbu",
    hanViet: "toan bo",
    exampleSentence: "全部食べてもいいですか。",
  },
  "完全": {
    hiragana: "かんぜん",
    romaji: "kanzen",
    hanViet: "hoan toan",
    exampleSentence: "計画は完全ではありません。",
  },
  "全国": {
    hiragana: "ぜんこく",
    romaji: "zenkoku",
    hanViet: "toan quoc",
    exampleSentence: "全国で雨が降っています。",
  },
};

function findRootNode(graph: GraphResponse): GraphNode | undefined {
  return graph.nodes.find((node) => node.type === "kanji") ?? graph.nodes[0];
}

export function buildKnowledgeWorkspaceViewModel(
  graph: GraphResponse,
): KnowledgeWorkspaceViewModel {
  const rootNode = findRootNode(graph);

  if (!rootNode) {
    return {
      root: {
        id: "",
        label: "",
      },
      rows: [],
    };
  }

  const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
  const rows = graph.edges
    .filter((edge) => edge.source === rootNode.id)
    .map((edge) => nodesById.get(edge.target))
    .filter((node): node is GraphNode => Boolean(node))
    .map((node) => {
      const override = rowOverrides[node.label];

      return {
        id: node.id,
        kanji: node.label,
        hiragana: override?.hiragana ?? node.tooltip?.hiragana ?? "",
        romaji: override?.romaji ?? "",
        hanViet: override?.hanViet ?? node.tooltip?.hanViet ?? "",
        exampleSentence: override?.exampleSentence ?? "",
      };
    });

  return {
    root: {
      id: rootNode.id,
      label: rootNode.label,
    },
    rows,
  };
}
