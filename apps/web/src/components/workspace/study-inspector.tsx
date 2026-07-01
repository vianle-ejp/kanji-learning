import React from "react";

import type { RelationshipRow } from "@/lib/knowledge-workspace";

interface StudyInspectorProps {
  row: RelationshipRow | null;
}

export function StudyInspector({ row }: StudyInspectorProps) {
  if (!row) {
    return (
      <aside className="rounded-[2rem] border border-persimmon/15 bg-gradient-to-br from-white to-paper p-6 shadow-lg shadow-persimmon/10">
        <p className="text-sm text-ink/70">Select a relationship to inspect its study details.</p>
      </aside>
    );
  }

  return (
    <aside className="rounded-[2rem] border border-persimmon/15 bg-gradient-to-br from-white to-paper p-6 shadow-lg shadow-persimmon/10">
      <p className="text-xs uppercase tracking-[0.2em] text-persimmon">Inspector</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink">{row.kanji}</h2>
      <p className="mt-2 text-sm text-moss">{row.hiragana}</p>
      <p className="mt-1 text-base text-ink/70">{row.romaji}</p>
      <p className="mt-4 text-sm leading-7 text-ink/80">{row.gloss}</p>

      <dl className="mt-6 space-y-4 text-sm text-ink/75">
        <div>
          <dt className="text-[11px] uppercase tracking-[0.18em] text-persimmon">Hán Việt:</dt>
          <dd className="mt-1 text-base text-ink">{row.hanViet}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.18em] text-persimmon">Example</dt>
          <dd className="mt-1 text-base leading-8 text-ink">{row.exampleSentence}</dd>
        </div>
      </dl>
    </aside>
  );
}
