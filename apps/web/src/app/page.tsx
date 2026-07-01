import React from "react";

import { KnowledgeWorkspace } from "@/components/workspace/knowledge-workspace";
import { getKanjiGraph } from "@/lib/api";

export default async function HomePage() {
  const graph = await getKanjiGraph("全");

  return (
    <main className="min-h-screen bg-paper text-ink">
      <KnowledgeWorkspace graph={graph} />
    </main>
  );
}
