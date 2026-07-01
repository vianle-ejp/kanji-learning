import React from "react";

import type { RelationshipRow } from "@/lib/knowledge-workspace";

interface RelationshipListProps {
  activeRowId: string | null;
  onSelect: (rowId: string) => void;
  rows: RelationshipRow[];
}

export function RelationshipList({
  activeRowId,
  onSelect,
  rows,
}: RelationshipListProps) {
  return (
    <section className="rounded-[2rem] border border-moss/15 bg-white/80 p-5 shadow-xl shadow-ink/5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-moss">Relationships</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">Vocabulary links</h2>
        </div>
        <p className="text-sm text-ink/60">{rows.length} items</p>
      </div>

      <ul className="space-y-3">
        {rows.map((row) => {
          const isActive = row.id === activeRowId;

          return (
            <li key={row.id}>
              <button
                className={[
                  "w-full rounded-[1.5rem] border px-4 py-4 text-left transition",
                  isActive
                    ? "border-persimmon/30 bg-persimmon/10 shadow-md shadow-persimmon/10"
                    : "border-moss/10 bg-paper/60 hover:border-moss/20 hover:bg-paper",
                ].join(" ")}
                onClick={() => onSelect(row.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{row.kanji}</h3>
                    <p className="mt-1 text-sm text-moss">{row.hiragana}</p>
                  </div>
                  <p className="text-sm text-ink/60">{row.romaji}</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-ink/75">{row.gloss}</p>
                <dl className="mt-4 grid gap-3 text-sm text-ink/70 sm:grid-cols-2">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-moss">
                      Hán Việt
                    </dt>
                    <dd className="mt-1">{row.hanViet}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-moss">
                      Ví dụ
                    </dt>
                    <dd className="mt-1 leading-6">{row.exampleSentence}</dd>
                  </div>
                </dl>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
