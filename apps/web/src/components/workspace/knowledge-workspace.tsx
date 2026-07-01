"use client";

import React, { useEffect, useState } from "react";

import { FocusStrip } from "@/components/workspace/focus-strip";
import { RelationshipList } from "@/components/workspace/relationship-list";
import { SearchSidebar } from "@/components/workspace/search-sidebar";
import { StudyInspector } from "@/components/workspace/study-inspector";
import type { GraphResponse } from "@/lib/types";
import { buildKnowledgeWorkspaceViewModel } from "@/lib/knowledge-workspace";

interface KnowledgeWorkspaceProps {
  graph: GraphResponse;
}

export function KnowledgeWorkspace({ graph }: KnowledgeWorkspaceProps) {
  const viewModel = buildKnowledgeWorkspaceViewModel(graph);
  const [activeRowId, setActiveRowId] = useState<string | null>(
    viewModel.rows[0]?.id ?? null,
  );
  const rowIdsKey = viewModel.rows.map((row) => row.id).join("|");

  useEffect(() => {
    setActiveRowId(viewModel.rows[0]?.id ?? null);
  }, [rowIdsKey]);

  const activeRow =
    viewModel.rows.find((row) => row.id === activeRowId) ?? viewModel.rows[0] ?? null;

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-10 lg:px-8">
      <FocusStrip
        root={viewModel.root}
        totalRelationships={viewModel.rows.length}
      />
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.1fr_0.9fr]">
        <SearchSidebar root={viewModel.root} />
        <RelationshipList
          activeRowId={activeRow?.id ?? null}
          onSelect={setActiveRowId}
          rows={viewModel.rows}
        />
        <StudyInspector row={activeRow} />
      </div>
    </section>
  );
}
