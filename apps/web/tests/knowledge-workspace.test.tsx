import React from "react";

import { KnowledgeWorkspace } from "@/components/workspace/knowledge-workspace";
import { buildKnowledgeWorkspaceViewModel } from "@/lib/knowledge-workspace";
import type { GraphResponse } from "@/lib/types";
import { render, screen } from "@testing-library/react";

const graphFixture: GraphResponse = {
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
    {
      id: "vocabulary-3",
      type: "vocabulary",
      label: "全部",
      x: 3,
      y: 1,
      tooltip: {
        type: "vocabulary",
        id: "3",
        label: "全部",
        shortMeaning: "all; entire",
        hiragana: "ぜんぶ",
        hanViet: "toan bo",
      },
    },
  ],
  edges: [
    {
      id: "2",
      source: "kanji-2",
      target: "vocabulary-2",
      relationType: "appears_in",
      weight: 1,
    },
    {
      id: "3",
      source: "kanji-2",
      target: "vocabulary-3",
      relationType: "appears_in",
      weight: 0.8,
    },
  ],
};

describe("KnowledgeWorkspace", () => {
  it("builds the required root and row contract from the graph", () => {
    const viewModel = buildKnowledgeWorkspaceViewModel(graphFixture);

    expect(viewModel.root).toEqual({
      kanji: "全",
      gloss: "whole; all",
      hiragana: "ぜん",
      hanViet: "toan",
    });
    expect(viewModel.rows[0]).toMatchObject({
      kanji: "安全",
      gloss: "safe; secure",
      hiragana: "あんぜん",
      romaji: "an'zen",
      hanViet: "an toan",
      exampleSentence: "この道は安全です。",
    });
  });

  it("renders the workspace contract for the root kanji and related vocabulary rows", () => {
    render(<KnowledgeWorkspace graph={graphFixture} />);

    expect(
      screen.getByPlaceholderText("Search notes, kanji, readings..."),
    ).toBeTruthy();
    expect(screen.getByRole("heading", { name: "全" })).toBeTruthy();
    expect(screen.getByText("あんぜん")).toBeTruthy();
    expect(screen.getByText("an'zen")).toBeTruthy();
    expect(screen.getAllByText("Hán Việt:").length).toBeGreaterThan(0);
    expect(screen.getByText("この道は安全です。")).toBeTruthy();
  });
});
