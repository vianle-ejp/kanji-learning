import React from "react";

import type { GraphResponse } from "@/lib/types";
import { buildKnowledgeWorkspaceViewModel } from "@/lib/knowledge-workspace";

interface KnowledgeWorkspaceProps {
  graph: GraphResponse;
}

export function KnowledgeWorkspace({ graph }: KnowledgeWorkspaceProps) {
  const viewModel = buildKnowledgeWorkspaceViewModel(graph);

  return (
    <section>
      <input
        aria-label="Search workspace"
        placeholder="Search notes, kanji, readings..."
        type="search"
      />
      <h1>{viewModel.root.kanji}</h1>
      <ul>
        {viewModel.rows.map((row) => (
          <li key={row.id}>
            <h2>{row.kanji}</h2>
            <p>{row.hiragana}</p>
            <p>{row.romaji}</p>
            <p>
              <span>Hán Việt:</span> <span>{row.hanViet}</span>
            </p>
            <p>{row.exampleSentence}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
