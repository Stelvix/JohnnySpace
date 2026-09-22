import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'


const temperatureData = [
  { date: 'Lun', temperature: 20 },
  { date: 'Mar', temperature: 30 },
  { date: 'Mer', temperature: 24 },
  { date: 'Jeu', temperature: 26 },
  { date: 'Ven', temperature: 49 },
  { date: 'Sam', temperature: 27 },
  { date: 'Dim', temperature: 23 },
]

export default function PlantsChartsTemperature() {
  return (
    <div className="flex h-75 w-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">Température</p>
          <p className="text-lg font-semibold text-[#edf7ff]">Niveau du sol</p>
        </div>
        <span className="rounded-full border border-[#6ffbbe]/25 bg-[#10b981]/10 px-2 py-1 text-[10px] font-semibold text-[#6ffbbe]">
          22°C
        </span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={temperatureData}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="date" stroke="#8ca8bb" tickLine={false} axisLine={false} />
          <YAxis domain={[15, 30]} stroke="#8ca8bb" tickLine={false} axisLine={false} />
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
            dataKey="temperature"
            stroke="cyan"
            strokeWidth={3}
            dot={{ r: 4, fill: '#6ffbbe' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
