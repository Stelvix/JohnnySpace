import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

const humiditeData = [
  { date: 'Lun', humidite: 48 },
  { date: 'Mar', humidite: 52 },
  { date: 'Mer', humidite: 55 },
  { date: 'Jeu', humidite: 60 },
  { date: 'Ven', humidite: 58 },
  { date: 'Sam', humidite: 62 },
  { date: 'Dim', humidite: 59 },
]

export default function PlantsChartsHumidity() {
  return (
    <div className="flex h-75 w-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">Humidité</p>
          <p className="text-lg font-semibold text-[#edf7ff]">Niveau du sol</p>
        </div>
        <span className="rounded-full border border-[#6ffbbe]/25 bg-[#10b981]/10 px-2 py-1 text-[10px] font-semibold text-[#6ffbbe]">
          59%
        </span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={humiditeData}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="date" stroke="#8ca8bb" tickLine={false} axisLine={false} />
          <YAxis domain={[35, 70]} stroke="#8ca8bb" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0d1c2d',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#edf7ff',
            }}
          />
          <Line
            type="monotone"
            dataKey="humidite"
            stroke="#6ffbbe"
            strokeWidth={3}
            dot={{ r: 4, fill: '#6ffbbe' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}