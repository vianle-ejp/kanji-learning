import React from "react";

import { KanjiNode } from "@/components/map/kanji-node";
import type { GraphResponse } from "@/lib/types";

interface KanjiMapProps {
  graph: GraphResponse;
}

export function KanjiMap({ graph }: KanjiMapProps) {
  return (
    <section className="rounded-[2rem] border border-moss/15 bg-white/70 p-6 shadow-xl shadow-ink/5 backdrop-blur">
      <div className="flex flex-wrap items-start gap-4">
        {graph.nodes.map((node) => (
          <KanjiNode key={node.id} node={node} />
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-paper/70 p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-moss">Relations</p>
        <ul className="mt-3 space-y-2 text-sm text-ink/75">
          {graph.edges.map((edge) => (
            <li key={edge.id}>
              {edge.source} → {edge.target} ({edge.relationType})
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
