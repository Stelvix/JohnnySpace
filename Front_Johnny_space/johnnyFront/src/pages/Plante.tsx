export default function Plante() {
  return (
    <section className="p-8 text-slate-100">
      <h1 className="text-3xl font-bold">Ma plante</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="h-72 rounded-2xl border border-dashed border-slate-600 bg-slate-800/60" />
        <div className="h-72 rounded-2xl border border-dashed border-slate-600 bg-slate-800/60" />
      </div>
    </section>
  )
}
