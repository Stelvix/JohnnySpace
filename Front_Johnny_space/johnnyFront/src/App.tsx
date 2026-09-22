import BarreLaterale from './composants/BarreLaterale'
import TableauDeBord from './pages/TableauDeBord'

export default function App() {
  return (
    <div className="flex min-h-screen w-full bg-[#051424] text-[#d4e4fa]">
      <BarreLaterale />
      <TableauDeBord />
    </div>
  )
}
