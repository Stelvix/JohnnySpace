import { HiOutlineRefresh, HiOutlineUser } from 'react-icons/hi'

export default function Equipements() {
  return (
    <div className="ml-72 min-h-screen flex-1 bg-[#051424]">
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#051424]/80 px-8 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-medium text-[#dfeaf7]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4edea3] shadow-[0_0_0_4px_rgba(78,222,163,0.15)]" aria-hidden="true" />
          <span>Connecté</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#9bb0bd]">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2">
            <HiOutlineRefresh className="text-[16px] text-[#7bd0ff]" />
            <span>Mis à jour à l'instant</span>
          </div>

          <div className="flex items-center gap-3 pl-1">
            <span className="text-xs font-semibold text-[#edf7ff]">Thomas</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#122131] to-[#0d1c2d] text-[#dfeaf7] shadow-[0_8px_20px_rgba(8,16,28,0.55)]">
              <HiOutlineUser className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-8 py-7">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          <div className="pt-1">
            <h1 className="m-0 text-2xl font-bold text-[#edf7ff]">
              Équipements
            </h1>
            <p className="mt-2 text-base text-[#9bb0bd]">État de l’atelier connecté</p>
          </div>

          <section className="grid grid-cols-12 gap-5">
            {[
              ['Capteur d’humidité', '82%'],
              ['Pompe d’arrosage', 'En ligne'],
              ['Lampes LED', 'Stable'],
            ].map(([label, value]) => (
              <div key={label} className="col-span-4 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-5 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
                <div className="rounded-[18px] border border-white/10 bg-[#0d1c2d] p-4">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">{label}</p>
                  <p className="mt-5 text-2xl font-semibold text-[#edf7ff]">{value}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}
