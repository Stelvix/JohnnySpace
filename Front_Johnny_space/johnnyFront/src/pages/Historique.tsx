import { HiOutlineRefresh, HiOutlineUser, HiOutlineCheckCircle } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { RASPI_BASE_URL, useWebSocketContext } from '../App'

interface FeedItem {
  id: string;
  label: string;
  timestamp: string;
  kind: 'action' | 'alert';
}

export default function Historique() {
  const { data } = useWebSocketContext();
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const [actionsRes, alertsRes] = await Promise.all([
          fetch(`${RASPI_BASE_URL}/api/actions/history?limit=20`),
          fetch(`${RASPI_BASE_URL}/api/alerts?limit=20`),
        ]);

        const [actionsData, alertsData] = await Promise.all([
          actionsRes.ok ? actionsRes.json() : { data: [] },
          alertsRes.ok ? alertsRes.json() : { data: [] },
        ]);

        const actions: FeedItem[] = (actionsData.data ?? []).map((action: any) => ({
          id: action.id ?? `${action.type}-${action.start_time}`,
          label: action.type === 'light'
            ? `Lumière ${action.status === 'completed' ? 'éteinte' : 'allumée'}`
            : action.type === 'music'
              ? `Musique ${action.status === 'completed' ? 'arrêtée' : 'démarrée'}`
              : `Action ${action.type}`,
          timestamp: action.start_time ?? action.end_time ?? new Date().toISOString(),
          kind: 'action',
        }));

        const alerts: FeedItem[] = (alertsData.data ?? []).map((alert: any) => ({
          id: alert.id ?? `${alert.type}-${alert.created_at}`,
          label: `${alert.type}: ${alert.message}`,
          timestamp: alert.created_at ?? new Date().toISOString(),
          kind: 'alert',
        }));

        const merged = [...actions, ...alerts]
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 20);

        setFeed(merged);
      } catch {
        const fallbackAlerts = Array.isArray(data?.alerts) ? data.alerts : [];
        setFeed(
          fallbackAlerts.map((alert: any, index: number) => ({
            id: alert.id ?? `${alert.type}-${index}`,
            label: `${alert.type}: ${alert.message}`,
            timestamp: alert.created_at ?? alert.timestamp ?? new Date().toISOString(),
            kind: 'alert',
          }))
        );
      }
    };

    loadHistory();
  }, [data?.alerts]);

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
              Historique
            </h1>
            <p className="mt-2 text-base text-[#9bb0bd]">Activité récente du système</p>
          </div>

          <section className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,33,49,1),_rgba(11,20,29,1))] p-4 shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
            {feed.length > 0 ? feed.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 border-b border-white/10 py-4 last:border-b-0 first:pt-1">
                <div className="flex items-center gap-3 text-sm text-[#edf7ff]">
                  <HiOutlineCheckCircle className="text-[20px] text-[#6ffbbe]" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[12px] text-[#9bb0bd]">{new Date(item.timestamp).toLocaleString('fr-FR')}</span>
              </div>
            )) : (
              <div className="flex items-center justify-center py-8 text-sm text-[#9bb0bd]">
                Aucune activité récente.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
