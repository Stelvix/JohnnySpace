import {
  HiOutlineRefresh,
  HiOutlineUser,
  HiOutlineSun,
  HiOutlinePlay,
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
} from 'react-icons/hi'
import { BsDroplet } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import conditionsData from '../data/conditions.json'
import CarteMesure from '../composants/CarteMesure'
import { useWebSocketContext } from '../App'

export default function TableauDeBord() {
  const { data, connected } = useWebSocketContext();
  const { lastReading, alerts } = data;
  const [conditions, setConditions] = useState<any[]>(conditionsData);

  // Mettre à jour les conditions quand une nouvelle lecture arrive
  useEffect(() => {
    if (lastReading) {
      setConditions([
        {
          titre: 'Temperature',
          valeur: lastReading.temperature,
          unite: '°C',
          statut: lastReading.temperature > 30 ? 'alerte' : lastReading.temperature > 15 ? 'optimal' : 'faible',
          accent: 'amber',
          progress: (lastReading.temperature / 40) * 100,
          seuil: '15°C - 30°C',
          optimal: '22°C'
        },
        {
          titre: 'Humidite de l\'air',
          valeur: lastReading.humidity,
          unite: '%',
          statut: lastReading.humidity > 80 ? 'alerte' : lastReading.humidity > 40 ? 'optimal' : 'faible',
          accent: 'blue',
          progress: lastReading.humidity,
          seuil: '40% - 80%',
          optimal: '65%'
        },
        {
          titre: 'Humidite du sol',
          valeur: lastReading.soil_humidity,
          unite: '%',
          statut: lastReading.soil_humidity < 30 ? 'alerte' : lastReading.soil_humidity < 70 ? 'optimal' : 'alerte',
          accent: 'green',
          progress: lastReading.soil_humidity,
          seuil: '30% - 70%',
          optimal: '50%'
        }
      ]);
    }
  }, [lastReading]);

  const handleWater = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/actions/water', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration: 50, isAuto: false })
      });

      if (response.ok) {
        alert('Arrosage de 50 ml lance!');
      }
    } catch (error) {
      alert('Erreur: ' + (error instanceof Error ? error.message : 'Erreur'));
    }
  };

  const handleLight = async (state: boolean) => {
    try {
      const response = await fetch('http://localhost:3001/api/actions/lighting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state })
      });

      if (response.ok) {
        alert(`Lumiere ${state ? 'activee' : 'desactivee'}!`);
      }
    } catch (error) {
      alert('Erreur: ' + (error instanceof Error ? error.message : 'Erreur'));
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
                Bonjour Thomas
              </h1>
              <p className="mt-2 text-base text-[#9bb0bd]">
                {lastReading ? `Johnny est ${lastReading.is_valid ? 'en bonne sante' : 'donnees invalides'}` : 'Chargement...'}
              </p>
            </div>

            <section className="grid grid-cols-12 gap-5" aria-label="Etat de la plante">
              <div className="col-span-6 overflow-hidden rounded-[22px] border border-white/10 bg-[#122131] shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
                <div
                    className="min-h-[320px] w-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                          "linear-gradient(180deg, rgba(10,22,32,0.12), rgba(10,22,32,0.5)), url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80')",
                    }}
                    aria-label="Photo de plante"
                />
              </div>

              <div className="col-span-6 flex flex-col justify-between gap-5 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-5 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#6ffbbe]/25 bg-[#10b981]/10 px-3 py-1.5 text-[12px] font-semibold text-[#6ffbbe]">
                  <span className="h-2 w-2 rounded-full bg-[#10b981]" aria-hidden="true" />
                  <span>Johnny va bien</span>
                </div>

                <p className="m-0 text-base leading-7 text-[#dfeaf7]">
                  {lastReading
                      ? `Temperature: ${lastReading.temperature}°C | Humidite: ${lastReading.humidity}% | Soil: ${lastReading.soil_humidity}%`
                      : 'En attente des donnees...'}
                </p>

                <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between gap-3 text-[12px] text-[#9bb0bd]">
                    <div className="flex items-center gap-2">
                      <BsDroplet className="text-[18px] text-[#7bd0ff]" />
                      <span>Besoin en eau</span>
                    </div>
                    <span className={`font-semibold ${lastReading?.soil_humidity && lastReading.soil_humidity < 30 ? 'text-red-500' : 'text-[#6ffbbe]'}`}>
                    {lastReading?.soil_humidity && lastReading.soil_humidity < 30 ? 'A arroser!' : 'Hydratation optimale'}
                  </span>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-[#10b981] via-[#4edea3] to-[#7bd0ff]"
                        style={{ width: `${lastReading?.soil_humidity || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-1 flex flex-col gap-3" aria-label="Conditions de vie">
              <h2 className="m-0 text-[20px] font-semibold text-[#edf7ff]">Conditions de vie</h2>

              <div className="grid grid-cols-3 gap-4">
                {conditions.map((condition) => (
                    <CarteMesure
                        key={condition.titre}
                        titre={condition.titre}
                        valeur={condition.valeur}
                        unite={condition.unite}
                        statut={condition.statut}
                        accent={condition.accent}
                        progress={condition.progress}
                        seuil={condition.seuil}
                        optimal={condition.optimal}
                    />
                ))}
              </div>
            </section>

            <section className="mt-1 grid grid-cols-12 gap-5" aria-label="Controles et activite">
              <div className="col-span-6 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-4 shadow-[0_18px_25px_rgba(0,0,0,0.14)]">
                <h2 className="m-0 text-[20px] font-semibold text-[#edf7ff]">Controles rapides</h2>

                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3 rounded-[16px] border border-white/10 bg-[#0d1c2d] p-3 transition-colors hover:bg-[#122131]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#122131] text-[#ffb95f] shadow-inner shadow-[#ffb95f]/10">
                        <HiOutlineSun className="text-[22px]" />
                      </div>
                      <div className="flex flex-col">
                        <strong className="text-sm font-semibold text-[#edf7ff]">Lumiere biologique</strong>
                        <span className="text-[12px] text-[#9bb0bd]">Eclairage naturel</span>
                      </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleLight(true)}
                        aria-label="Basculer la lumiere"
                        className="relative h-6 w-11 rounded-full bg-[#10b981] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] after:absolute after:top-[3px] after:right-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-[#eafef7]"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-[16px] border border-white/10 bg-[#0d1c2d] p-3 transition-colors hover:bg-[#122131]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#122131] text-[#7bd0ff] shadow-inner shadow-[#7bd0ff]/10">
                        <BsDroplet className="text-[22px]" />
                      </div>
                      <div className="flex flex-col">
                        <strong className="text-sm font-semibold text-[#edf7ff]">Pompe d&apos;arrosage</strong>
                        <span className="text-[12px] text-[#9bb0bd]">Humidification des racines</span>
                      </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleWater}
                        className="rounded-xl border border-[#10b981]/20 bg-[#10b981]/10 px-3 py-2 text-[12px] font-semibold text-[#edf7ff] transition-colors hover:bg-[#10b981]/15">
                      Arroser 50 ml
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-[16px] border border-white/10 bg-[#0d1c2d] p-3 transition-colors hover:bg-[#122131]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#122131] text-[#dfeaf7] shadow-inner shadow-white/10">
                        <HiOutlinePlay className="text-[22px]" />
                      </div>
                      <div className="flex flex-col">
                        <strong className="text-sm font-semibold text-[#edf7ff]">Musique</strong>
                        <span className="text-[12px] text-[#9bb0bd]">Ondes douces</span>
                      </div>
                    </div>
                    <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#1a2d3d] px-3 py-2 text-[12px] font-medium text-[#edf7ff] transition-colors hover:bg-[#233b4d]">
                      <HiOutlinePlay className="text-[18px]" />
                      <span>Pause</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-6 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-4 shadow-[0_18px_25px_rgba(0,0,0,0.14)]">
                <h2 className="m-0 text-[20px] font-semibold text-[#edf7ff]">Activite recente</h2>

                <div className="mt-3 flex flex-col rounded-[12px]">
                  {alerts.length > 0 ? (
                      alerts.slice(0, 3).map((alert: any, idx: number) => (
                          <div key={alert.id} className={`flex items-center justify-between gap-3 ${idx < alerts.length - 1 ? 'border-b border-white/10' : ''} py-3`}>
                            <div className="flex items-center gap-3 text-sm text-[#edf7ff]">
                              <HiOutlineCheckCircle className="text-[20px] text-[#ff6b6b]" />
                              <span>{alert.message}</span>
                            </div>
                            <span className="text-[12px] text-[#9bb0bd]">a l\'instant</span>
                          </div>
                      ))
                  ) : (
                      <div className="flex items-center justify-between gap-3 border-b border-white/10 py-3">
                        <div className="flex items-center gap-3 text-sm text-[#edf7ff]">
                          <HiOutlineCheckCircle className="text-[20px] text-[#6ffbbe]" />
                          <span>Tout va bien</span>
                        </div>
                        <span className="text-[12px] text-[#9bb0bd]">a l\'instant</span>
                      </div>
                  )}

                  <div className="flex items-center justify-between gap-3 border-b border-white/10 py-3">
                    <div className="flex items-center gap-3 text-sm text-[#edf7ff]">
                      <HiOutlineLightBulb className="text-[20px] text-[#ffb95f]" />
                      <span>Eclairage active</span>
                    </div>
                    <span className="text-[12px] text-[#9bb0bd]">il y a 2h</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 py-3">
                    <div className="flex items-center gap-3 text-sm text-[#edf7ff]">
                      <BsDroplet className="text-[20px] text-[#7bd0ff]" />
                      <span>Arrosage de 50 ml effectue</span>
                    </div>
                    <span className="text-[12px] text-[#9bb0bd]">ce matin</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
  )
}