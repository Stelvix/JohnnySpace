import { HiOutlineRefresh, HiOutlineUser, HiOutlineMicrophone } from 'react-icons/hi'

export default function AssistantVocal() {
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
              Assistant vocal
            </h1>
            <p className="mt-2 text-base text-[#9bb0bd]">Contrôle de la plante par commande vocale</p>
          </div>

          <section className="grid grid-cols-12 gap-5">
            <div className="col-span-8 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-6 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col items-center justify-center rounded-[20px] border border-white/10 bg-[#0d1c2d] p-8">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#7bd0ff]/40 bg-[#122131] text-[52px] text-[#7bd0ff] shadow-[0_0_25px_rgba(123,208,255,0.18)]">
                  <HiOutlineMicrophone />
                </div>
                <p className="mt-5 text-lg font-medium text-[#edf7ff]">Prêt à écouter</p>
                <p className="mt-2 text-sm text-[#9bb0bd]">"Johnny, donne-moi le niveau d’humidité"</p>
              </div>
            </div>

            <div className="col-span-4 flex flex-col gap-4 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-5 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
              <div className="rounded-[18px] border border-white/10 bg-[#0d1c2d] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">Dernière commande</p>
                <p className="mt-3 text-lg font-semibold text-[#edf7ff]">Humidité : 68%</p>
              </div>
              <div className="rounded-[18px] border border-white/10 bg-[#0d1c2d] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">Réponse</p>
                <p className="mt-3 text-lg font-semibold text-[#6ffbbe]">Tout est optimal</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
