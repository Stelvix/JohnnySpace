type CarteMesureProps = {
  titre?: string
  valeur?: string
  sousTitre?: string
}

export default function CarteMesure({
  titre = 'Mesure',
  valeur = '---',
  sousTitre = 'Placeholder',
}: CarteMesureProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-5 shadow-lg shadow-slate-950/20">
      <p className="text-sm text-slate-400">{titre}</p>
      <div className="mt-4 text-3xl font-bold text-white">{valeur}</div>
      <p className="mt-2 text-sm text-slate-400">{sousTitre}</p>
    </div>
  )
}
