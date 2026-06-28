import React from "react";

import { KanjiNode } from "@/components/map/kanji-node";
import type { GraphNode } from "@/lib/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const nodeFixture: GraphNode = {
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
};

describe("KanjiNode", () => {
  it("shows tooltip content on hover", async () => {
    const user = userEvent.setup();

    render(<KanjiNode node={nodeFixture} />);

    await user.hover(screen.getByRole("button", { name: /完全/i }));

    expect(screen.getByText(/hoan toan/i)).toBeTruthy();
  });
});
