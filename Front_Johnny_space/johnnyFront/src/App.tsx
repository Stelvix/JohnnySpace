import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BarreLaterale from './composants/BarreLaterale'
import TableauDeBord from './pages/TableauDeBord'
import AssistantVocal from './pages/AssistantVocal'
import MaPlante from './pages/Plante'
import Equipements from './pages/Equipements'
import Historique from './pages/Historique'


function LayoutPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#051424] text-[#d4e4fa]">
      <BarreLaterale />
      <Routes>
        <Route path="/" element={<TableauDeBord />} />
        <Route path="/ma-plante" element={<MaPlante />} />
        <Route path="/assistant-vocal" element={<AssistantVocal />} />
        <Route path="/equipements" element={<Equipements />} />
        <Route path="/historique" element={<Historique />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutPage />
    </BrowserRouter>
  )
}
