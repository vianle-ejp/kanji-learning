export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-6 px-6 py-16">
        <p className="text-sm uppercase tracking-[0.3em] text-moss">The Kanji Map</p>
        <h1 className="max-w-2xl text-5xl font-semibold leading-tight">
          A map-first workspace for exploring kanji, compounds, and study context.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-ink/80">
          The frontend scaffold is ready for the explorer, tooltip, and detail flows that come next.
        </p>
      </section>
    </main>
  );
}
