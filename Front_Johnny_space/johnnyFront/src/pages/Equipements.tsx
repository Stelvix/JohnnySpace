export default function Equipements() {
  return (
    <section className="p-8 text-slate-100">
      <h1 className="text-3xl font-bold">Équipements</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="h-40 rounded-2xl border border-dashed border-slate-600 bg-slate-800/60" />
        <div className="h-40 rounded-2xl border border-dashed border-slate-600 bg-slate-800/60" />
        <div className="h-40 rounded-2xl border border-dashed border-slate-600 bg-slate-800/60" />
      </div>
    </section>
  )
}
