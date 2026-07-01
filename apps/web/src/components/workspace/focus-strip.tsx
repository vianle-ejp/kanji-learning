import React from "react";

interface FocusStripProps {
  root: {
    kanji: string;
    gloss: string;
    hiragana: string;
    hanViet: string;
  };
  totalRelationships: number;
}

export function FocusStrip({ root, totalRelationships }: FocusStripProps) {
  return (
    <section className="rounded-[2rem] border border-persimmon/15 bg-gradient-to-br from-white to-paper p-5 shadow-lg shadow-persimmon/10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-persimmon">Current focus</p>
          <p className="text-3xl font-semibold text-ink">{root.kanji}</p>
          <p className="text-sm leading-7 text-ink/75">
            {root.hiragana} · {root.hanViet}
          </p>
        </div>
        <p className="max-w-md text-sm leading-7 text-ink/75">
          {root.gloss} across {totalRelationships} related study cards.
        </p>
      </div>
    </section>
  );
}
