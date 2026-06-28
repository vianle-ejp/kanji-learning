import React from "react";

import { KanjiMap } from "@/components/map/kanji-map";
import { getKanjiGraph } from "@/lib/api";

export default async function HomePage() {
  const graph = await getKanjiGraph("全");

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-moss">The Kanji Map</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight">
              Trace kanji through vocabulary clusters instead of memorizing them in isolation.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/80">
              Hover a node to preview its reading and Hán Việt, then follow the graph to see how one
              character branches into multiple study paths.
            </p>
          </div>
          <div className="rounded-[2rem] border border-persimmon/20 bg-gradient-to-br from-white to-paper p-6 shadow-lg shadow-persimmon/10">
            <p className="text-xs uppercase tracking-[0.25em] text-persimmon">Current focus</p>
            <h2 className="mt-3 text-4xl font-semibold">全</h2>
            <p className="mt-2 text-sm leading-7 text-ink/75">
              A compact preview of the graph explorer backed by the FastAPI graph payload.
            </p>
          </div>
        </div>

        <KanjiMap graph={graph} />
      </section>
    </main>
  );
}
