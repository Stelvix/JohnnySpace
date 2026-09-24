import { HiOutlineRefresh, HiOutlineUser } from 'react-icons/hi'
import { useState } from 'react'
import PlantsChartsHumidity from '../composants/PlantsChartsHumidity'
import PlantsChartsTemperature from '../composants/PlantChartsTemperature'
import { useWebSocketContext } from '../App'

export default function Plante() {
  const { data, connected } = useWebSocketContext();
  const { lastReading } = data;
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);

  const handleWater = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/actions/water', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration, isAuto: false })
      });

      if (response.ok) {
        alert(`Arrosage lance pour ${duration}s`);
      }
    } catch (error) {
      alert('Erreur: ' + (error instanceof Error ? error.message : 'Erreur'));
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="ml-72 min-h-screen flex-1 bg-[#051424]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#051424]/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-medium text-[#dfeaf7]">
            <span className={`h-2.5 w-2.5 rounded-full shadow-[0_0_0_4px_rgba(78,222,163,0.15)] ${connected ? 'bg-[#4edea3]' : 'bg-red-500'}`} aria-hidden="true" />
            <span>{connected ? 'Connecte' : 'Deconnecte'}</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#9bb0bd]">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2">
              <HiOutlineRefresh className="text-[16px] text-[#7bd0ff]" />
              <span>{connected ? 'Mis a jour a l\'instant' : 'En attente...'}</span>
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
                Ma plante
              </h1>
              <p className="mt-2 text-base text-[#9bb0bd]">Suivi quotidien de Johnny</p>
            </div>

            <section className="flex flex-col gap-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#122131] p-5 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
                  <PlantsChartsHumidity />
                </div>

                <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#122131] p-5 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
                  <PlantsChartsTemperature />
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.8fr_0.9fr]">
                <div className="relative min-h-[260px] overflow-hidden rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(110,255,190,0.14),_rgba(11,20,29,0.96)_38%,_rgba(8,14,22,1)_100%)] p-5 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
                <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-[#0d1c2d]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#dfeaf7]">
                  Video camera
                </span>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#6ffbbe]/40 bg-[#6ffbbe]/10 shadow-[0_0_40px_rgba(111,251,190,0.18)]">
                      <div className="h-14 w-14 rounded-full border border-[#dfeaf7]/25 bg-[#0d1c2d]/80" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 rounded-full border border-[#6ffbbe]/25 bg-[#0c2d23] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6ffbbe]">
                    {connected ? 'Live' : 'Hors ligne'}
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-5 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
                  <div className="rounded-[18px] border border-white/10 bg-[#0d1c2d] p-4">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">Etat</p>
                    <p className="mt-3 text-2xl font-semibold text-[#edf7ff]">
                      {lastReading?.is_valid ? 'Tres bon' : 'A verifier'}
                    </p>
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-[#0d1c2d] p-4">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">Derniere verification</p>
                    <p className="mt-3 text-lg font-semibold text-[#dfeaf7]">
                      {lastReading ? new Date(lastReading.timestamp).toLocaleTimeString('fr-FR') : 'En attente...'}
                    </p>
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-[#0d1c2d] p-4">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">Besoin d\'eau</p>
                    <p className={`mt-3 text-lg font-semibold ${lastReading?.soil_humidity && lastReading.soil_humidity < 30 ? 'text-red-500' : 'text-[#6ffbbe]'}`}>
                      {lastReading?.soil_humidity && lastReading.soil_humidity < 30 ? 'A arroser!' : 'Hydratation ideale'}
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-white/10 bg-[#0d1c2d] p-4">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb] mb-3">Arroser la Plante</p>

                    <div className="mb-3">
                      <input
                          type="range"
                          min="1"
                          max="120"
                          value={duration}
                          onChange={(e) => setDuration(parseInt(e.target.value))}
                          className="w-full"
                      />
                      <p className="text-center text-sm font-semibold mt-2 text-[#7bd0ff]">{duration}s</p>
                    </div>

                    <button
                        onClick={handleWater}
                        disabled={loading}
                        className={`w-full py-2 rounded font-semibold text-sm transition ${
                            loading
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-[#4edea3] hover:bg-[#3dbf8e] cursor-pointer text-[#051424]'
                        }`}
                    >
                      {loading ? 'Arrosage...' : 'Arroser'}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
  )
}