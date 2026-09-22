export default function Entete() {
  return (
    <header className="mb-6 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Titre</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Bonjour</h1>
      </div>

      <div className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm text-slate-300">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span>Statut</span>
      </div>
    </header>
  )
}
