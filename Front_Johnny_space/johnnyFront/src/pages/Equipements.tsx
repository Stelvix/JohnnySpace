import { HiOutlineLightBulb, HiOutlineMusicNote, HiOutlineRefresh, HiOutlineUser } from 'react-icons/hi'
import { useState } from 'react'
import { RASPI_BASE_URL, useWebSocketContext } from '../App'

export default function Equipements() {
  const { data } = useWebSocketContext();
  const equipment = Array.isArray(data?.equipment) ? data.equipment : [];
  const [loading, setLoading] = useState<Record<string, boolean>>({
    light: false,
    music: false,
  });

  const toggleDevice = async (device: 'light' | 'music', state: boolean) => {
    setLoading((prev) => ({ ...prev, [device]: true }));

    try {
      const endpoint = device === 'light' ? 'lighting' : 'music';
      const response = await fetch(`${RASPI_BASE_URL}/api/actions/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state }),
      });

      if (!response.ok) {
        throw new Error(`Impossible de ${state ? 'allumer' : 'éteindre'} ${device === 'light' ? 'la lumière' : 'la musique'}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, [device]: false }));
    }
  };

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
            {equipment.length > 0 ? equipment.map((item: any) => (
              <div key={item.id ?? item.name} className="col-span-4 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-5 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
                <div className="rounded-[18px] border border-white/10 bg-[#0d1c2d] p-4">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">{item.name}</p>
                  <p className="mt-5 text-2xl font-semibold text-[#edf7ff]">{item.status}</p>
                </div>
              </div>
            )) : (
              [
                ['Capteur d’humidité', '82%'],
                ['Système audio', 'En ligne'],
                ['Lampes LED', 'Stable'],
              ].map(([label, value]) => (
                <div key={label} className="col-span-4 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-5 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
                  <div className="rounded-[18px] border border-white/10 bg-[#0d1c2d] p-4">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">{label}</p>
                    <p className="mt-5 text-2xl font-semibold text-[#edf7ff]">{value}</p>
                  </div>
                </div>
              ))
            )}
          </section>

          <section className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.22)]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-[#edf7ff]">Contrôles</h2>
              <div className="rounded-full border border-[#4edea3]/30 bg-[#4edea3]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#7ef0ba]">
                En ligne
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => toggleDevice('light', true)}
                disabled={loading.light}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#4edea3]/25 bg-[linear-gradient(135deg,_rgba(78,222,163,0.98),_rgba(36,182,122,0.98))] px-5 py-4 text-left font-semibold text-[#051424] shadow-[0_12px_20px_rgba(78,222,163,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(78,222,163,0.28)] disabled:opacity-70"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                    <HiOutlineLightBulb className="text-2xl" />
                  </div>
                  <span className="text-base">Allumer la lumière</span>
                </div>
                <span className="text-sm opacity-80">ON</span>
              </button>

              <button
                type="button"
                onClick={() => toggleDevice('light', false)}
                disabled={loading.light}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#f5d76a]/20 bg-[linear-gradient(135deg,_rgba(24,33,46,1),_rgba(12,20,30,1))] px-5 py-4 text-left font-semibold text-[#edf7ff] shadow-[0_12px_20px_rgba(0,0,0,0.14)] transition duration-200 hover:-translate-y-0.5 hover:border-[#f5d76a]/35 hover:bg-[#122131] disabled:opacity-70"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5d76a]/10">
                    <HiOutlineLightBulb className="text-2xl text-[#f5d76a]" />
                  </div>
                  <span className="text-base">Éteindre la lumière</span>
                </div>
                <span className="text-sm text-[#f5d76a]">OFF</span>
              </button>

              <button
                type="button"
                onClick={() => toggleDevice('music', true)}
                disabled={loading.music}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#7bd0ff]/25 bg-[linear-gradient(135deg,_rgba(123,208,255,0.98),_rgba(80,157,255,0.96))] px-5 py-4 text-left font-semibold text-[#051424] shadow-[0_12px_20px_rgba(123,208,255,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(123,208,255,0.26)] disabled:opacity-70"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                    <HiOutlineMusicNote className="text-2xl" />
                  </div>
                  <span className="text-base">Allumer la musique</span>
                </div>
                <span className="text-sm opacity-80">ON</span>
              </button>

              <button
                type="button"
                onClick={() => toggleDevice('music', false)}
                disabled={loading.music}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#d89cff]/20 bg-[linear-gradient(135deg,_rgba(24,33,46,1),_rgba(12,20,30,1))] px-5 py-4 text-left font-semibold text-[#edf7ff] shadow-[0_12px_20px_rgba(0,0,0,0.14)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d89cff]/35 hover:bg-[#122131] disabled:opacity-70"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d89cff]/10">
                    <HiOutlineMusicNote className="text-2xl text-[#d89cff]" />
                  </div>
                  <span className="text-base">Éteindre la musique</span>
                </div>
                <span className="text-sm text-[#d89cff]">OFF</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
