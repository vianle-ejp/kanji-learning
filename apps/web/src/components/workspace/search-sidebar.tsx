import React from "react";

interface SearchSidebarProps {
  root: {
    kanji: string;
    gloss: string;
    hiragana: string;
    hanViet: string;
  };
}

export function SearchSidebar({ root }: SearchSidebarProps) {
  return (
    <aside className="rounded-[2rem] border border-moss/15 bg-white/80 p-6 shadow-xl shadow-ink/5 backdrop-blur">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-moss">Workspace</p>
          <h1 className="mt-3 text-4xl font-semibold text-ink">{root.kanji}</h1>
          <p className="mt-2 text-sm leading-7 text-ink/75">{root.gloss}</p>
        </div>

        <label className="block">
          <span className="sr-only">Search workspace</span>
          <input
            aria-label="Search workspace"
            className="w-full rounded-full border border-moss/15 bg-paper/70 px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/45 focus:border-persimmon/40"
            placeholder="Search notes, kanji, readings... (coming soon)"
            readOnly
            type="search"
          />
        </label>
        <p className="text-xs uppercase tracking-[0.18em] text-ink/50">
          Search is coming soon
        </p>

        <dl className="grid gap-3 rounded-[1.5rem] bg-paper/70 p-4 text-sm text-ink/75">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.18em] text-moss">Reading</dt>
            <dd className="mt-1 text-base text-ink">{root.hiragana}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.18em] text-moss">Hán Việt</dt>
            <dd className="mt-1 text-base text-ink">{root.hanViet}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
