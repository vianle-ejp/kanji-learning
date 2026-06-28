import type { GraphResponse } from "@/lib/types";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";

const fallbackGraph: GraphResponse = {
  nodes: [
    {
      id: "kanji-2",
      type: "kanji",
      label: "全",
      x: 0,
      y: 0,
      tooltip: {
        type: "kanji",
        id: "2",
        label: "全",
        shortMeaning: "whole; all",
        hiragana: "ぜん",
        hanViet: "toan",
      },
    },
    {
      id: "vocabulary-1",
      type: "vocabulary",
      label: "完全",
      x: 1,
      y: 1,
      tooltip: {
        type: "vocabulary",
        id: "1",
        label: "完全",
        shortMeaning: "complete; perfect",
        hiragana: "かんぜん",
        hanViet: "hoan toan",
      },
    },
    {
      id: "vocabulary-2",
      type: "vocabulary",
      label: "安全",
      x: 2,
      y: 1,
      tooltip: {
        type: "vocabulary",
        id: "2",
        label: "安全",
        shortMeaning: "safe; secure",
        hiragana: "あんぜん",
        hanViet: "an toan",
      },
    },
  ],
  edges: [
    {
      id: "2",
      source: "kanji-2",
      target: "vocabulary-1",
      relationType: "appears_in",
      weight: 1,
    },
    {
      id: "3",
      source: "kanji-2",
      target: "vocabulary-2",
      relationType: "appears_in",
      weight: 0.8,
    },
  ],
};

export async function getKanjiGraph(character: string): Promise<GraphResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

  try {
    const response = await fetch(`${apiBaseUrl}/api/kanji/${character}/graph`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to load graph for ${character}`);
    }

    return (await response.json()) as GraphResponse;
  } catch {
    return fallbackGraph;
  }
}
