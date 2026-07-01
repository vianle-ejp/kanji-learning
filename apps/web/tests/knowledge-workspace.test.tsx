import React from "react";

import { KnowledgeWorkspace } from "@/components/workspace/knowledge-workspace";
import { getKanjiGraph } from "@/lib/api";
import { buildKnowledgeWorkspaceViewModel } from "@/lib/knowledge-workspace";
import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { GraphResponse } from "@/lib/types";
import { afterEach, vi } from "vitest";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

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

  it("prefers the semantic source node as the root when graph edges identify one", () => {
    const viewModel = buildKnowledgeWorkspaceViewModel({
      nodes: [
        {
          id: "vocabulary-4",
          type: "vocabulary",
          label: "前方",
          x: 0,
          y: 0,
          tooltip: {
            type: "vocabulary",
            id: "4",
            label: "前方",
            shortMeaning: "ahead; front",
            hiragana: "ぜんぽう",
            hanViet: "tien phuong",
          },
        },
        {
          id: "kanji-2",
          type: "kanji",
          label: "全",
          x: 1,
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
      ],
      edges: [
        {
          id: "4",
          source: "kanji-2",
          target: "vocabulary-4",
          relationType: "appears_in",
          weight: 1,
        },
      ],
    });

    expect(viewModel.root).toEqual({
      kanji: "全",
      gloss: "whole; all",
      hiragana: "ぜん",
      hanViet: "toan",
    });
  });

  it("falls back to the first graph node only when the graph has no semantic root", () => {
    const viewModel = buildKnowledgeWorkspaceViewModel({
      nodes: [
        {
          id: "vocabulary-4",
          type: "vocabulary",
          label: "前方",
          x: 0,
          y: 0,
          tooltip: {
            type: "vocabulary",
            id: "4",
            label: "前方",
            shortMeaning: "ahead; front",
            hiragana: "ぜんぽう",
            hanViet: "tien phuong",
          },
        },
        {
          id: "kanji-2",
          type: "kanji",
          label: "全",
          x: 1,
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
      ],
      edges: [],
    });

    expect(viewModel.root).toEqual({
      kanji: "前方",
      gloss: "ahead; front",
      hiragana: "ぜんぽう",
      hanViet: "tien phuong",
    });
  });

  it("falls back to tooltip data for non-overridden rows", () => {
    const viewModel = buildKnowledgeWorkspaceViewModel({
      nodes: [
        graphFixture.nodes[0],
        {
          id: "vocabulary-5",
          type: "vocabulary",
          label: "全力",
          x: 1,
          y: 1,
          tooltip: {
            type: "vocabulary",
            id: "5",
            label: "全力",
            shortMeaning: "full effort",
            hiragana: "ぜんりょく",
            hanViet: "toan luc",
          },
        },
      ],
      edges: [
        {
          id: "5",
          source: "kanji-2",
          target: "vocabulary-5",
          relationType: "appears_in",
          weight: 1,
        },
      ],
    });

    expect(viewModel.rows[0]).toMatchObject({
      kanji: "全力",
      gloss: "full effort",
      hiragana: "ぜんりょく",
      romaji: "",
      hanViet: "toan luc",
      exampleSentence: "",
    });
  });

  it("renders the workspace contract for the root kanji and related vocabulary rows", () => {
    render(<KnowledgeWorkspace graph={graphFixture} />);
    const inspector = screen.getByText("Inspector").closest("aside");

    expect(
      screen.getByPlaceholderText(/Search notes, kanji, readings/),
    ).toBeTruthy();
    expect(screen.getByRole("searchbox").getAttribute("readonly")).not.toBeNull();
    expect(screen.getByText("Search is coming soon")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "全" })).toBeTruthy();
    expect(inspector).toBeTruthy();
    expect(within(inspector as HTMLElement).getByText("あんぜん")).toBeTruthy();
    expect(within(inspector as HTMLElement).getByText("an'zen")).toBeTruthy();
    expect(screen.getAllByText("Hán Việt:").length).toBeGreaterThan(0);
    expect(within(inspector as HTMLElement).getByText("この道は安全です。")).toBeTruthy();
  });

  it("renders all approved study rows from fallback data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    const graph = await getKanjiGraph("全");

    render(<KnowledgeWorkspace graph={graph} />);

    expect(screen.getByRole("heading", { name: "全" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /安全/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /全部/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /完全/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /全国/ })).toBeTruthy();
  });

  it("updates the inspector when a relationship row is selected", async () => {
    const user = userEvent.setup();

    render(<KnowledgeWorkspace graph={graphFixture} />);

    const inspector = screen.getByText("Inspector").closest("aside");

    await user.click(screen.getByRole("button", { name: /全部/ }));

    expect(inspector).toBeTruthy();
    expect(within(inspector as HTMLElement).getByText("全部")).toBeTruthy();
    expect(within(inspector as HTMLElement).getByText("zen'bu")).toBeTruthy();
    expect(within(inspector as HTMLElement).getByText("ケーキを全部食べた。")).toBeTruthy();
  });

  it("resets the active inspector row when the graph rows change", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<KnowledgeWorkspace graph={graphFixture} />);

    await user.click(screen.getByRole("button", { name: /全部/ }));

    rerender(
      <KnowledgeWorkspace
        graph={{
          nodes: [
            graphFixture.nodes[0],
            {
              id: "vocabulary-6",
              type: "vocabulary",
              label: "完全",
              x: 2,
              y: 1,
              tooltip: {
                type: "vocabulary",
                id: "6",
                label: "完全",
                shortMeaning: "complete; perfect",
                hiragana: "かんぜん",
                hanViet: "hoan toan",
              },
            },
          ],
          edges: [
            {
              id: "6",
              source: "kanji-2",
              target: "vocabulary-6",
              relationType: "appears_in",
              weight: 1,
            },
          ],
        }}
      />,
    );

    const inspector = screen.getByText("Inspector").closest("aside");

    expect(inspector).toBeTruthy();
    expect(within(inspector as HTMLElement).getByText("完全")).toBeTruthy();
    expect(within(inspector as HTMLElement).getByText("kanzen")).toBeTruthy();
    expect(
      within(inspector as HTMLElement).getByText("計画は完全ではありません。"),
    ).toBeTruthy();

    rerender(<KnowledgeWorkspace graph={graphFixture} />);

    expect(within(inspector as HTMLElement).getByText("安全")).toBeTruthy();
    expect(within(inspector as HTMLElement).getByText("an'zen")).toBeTruthy();
    expect(
      within(inspector as HTMLElement).getByText("この道は安全です。"),
    ).toBeTruthy();
  });
});
