type CarteMesureProps = {
  titre?: string
  valeur?: number | string
  unite?: string
  statut?: string
  accent?: 'green' | 'blue' | 'amber'
  progress?: number
  seuil?: string
  optimal?: string
}

export default function CarteMesure({
  titre = 'Mesure',
  valeur = '---',
  unite = '',
  statut = 'Placeholder',
  accent = 'green',
  progress,
  seuil,
  optimal,
}: CarteMesureProps) {
  const accentClasses = {
    green: 'text-[#6ffbbe]',
    blue: 'text-[#7bd0ff]',
    amber: 'text-[#ffb95f]',
  }

  const progressWidth = typeof progress === 'number' ? `${Math.min(Math.max(progress, 0), 100)}%` : '0%'

  return (
    <article className="flex min-h-[170px] flex-col justify-between rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-4 shadow-[0_18px_25px_rgba(0,0,0,0.14)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-medium text-[#9bb0bd]">{titre}</span>
        {statut && titre !== 'Humidité du sol' && (
          <span className={`text-[12px] font-semibold ${accentClasses[accent]}`}>{statut}</span>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <strong className="text-[34px] font-bold leading-none text-[#edf7ff]">{valeur}</strong>
        {unite && <span className="text-base text-[#9bb0bd]">{unite}</span>}
      </div>

      {titre === 'Humidité du sol' ? (
        <>
          <div className="mt-3 flex flex-col gap-2">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#10b981] via-[#4edea3] to-[#7bd0ff]"
                style={{ width: progressWidth }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#9bb0bd]">
              <span>{seuil}</span>
              <span>{optimal}</span>
            </div>
          </div>
        </>
      ) : (
        <span className={`mt-3 text-[12px] font-semibold ${accentClasses[accent]}`}>{statut}</span>
      )}
    </article>
  )
}
