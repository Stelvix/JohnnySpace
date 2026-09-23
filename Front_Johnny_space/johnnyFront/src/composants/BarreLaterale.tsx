import {
  HiOutlineViewGrid,
  HiOutlineMicrophone,
  HiOutlineAdjustments,
  HiOutlineClock,
} from 'react-icons/hi'
import { BsLeaf } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'
import JohnnySpaceLogo from '../../public/images/Johnny Space logo.png'

const menuItems = [
  { label: 'Vue d\'ensemble', icon: HiOutlineViewGrid, lien: '/' },
  { label: 'Ma plante', icon: BsLeaf, lien: '/ma-plante' },
  { label: 'Assistant vocal', icon: HiOutlineMicrophone, lien: '/assistant-vocal' },
  { label: 'Équipements', icon: HiOutlineAdjustments, lien: '/equipements' },
  { label: 'Historique', icon: HiOutlineClock, lien: '/historique' },
]

export default function BarreLaterale() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 w-72 border-r border-white/10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),_linear-gradient(180deg,_#091c2b_0%,_#0d1c2d_100%)] shadow-[0_20px_50px_rgba(3,10,18,0.6)] backdrop-blur-md">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#6ffbbe]/30 bg-[#10b981]/15 text-sm font-bold text-[#6ffbbe] shadow-[inset_0_0_15px_rgba(111,251,190,0.12)]">
            <img src={JohnnySpaceLogo} alt="Johnny Space Logo" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[16px] font-semibold text-[#edf7ff]">Johnny Space</span>
            <span className="text-[11px] text-[#9bb0bd]">Soin végétal</span>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2 px-3 pt-6" aria-label="Navigation principale">
        {menuItems.map(({ label, icon: Icon, lien }) => {
          const active = location.pathname === lien

          return (
            <Link
              key={label}
              to={lien}
              className="group relative flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-[#90a9bb] hover:bg-[#10b981]/10 hover:text-[#d9f7ee]"
            >
              {active && (
                <span className="absolute inset-y-2 left-2 w-1 rounded-full bg-[#6ffbbe]" aria-hidden="true" />
              )}
              <Icon
                className={[
                  'relative z-10 text-[20px] leading-none',
                  active ? 'text-[#6ffbbe]' : 'text-[#90a9bb] group-hover:text-[#d9f7ee]',
                ].join(' ')}
              />
              <span className="relative z-10">{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mx-3 mt-8 rounded-2xl border border-white/10 bg-[#122131]/80 p-4 shadow-[0_12px_30px_rgba(1,7,14,0.25)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#8ca8bb]">Système</span>
          <span className="rounded-full border border-[#6ffbbe]/25 bg-[#10b981]/10 px-2 py-1 text-[10px] font-semibold text-[#6ffbbe]">
            Stable
          </span>
        </div>

        <div className="space-y-3 text-sm text-[#dfeaf7]">
          <div className="flex items-center justify-between">
            <span className="text-[#9bb0bd]">Capteurs</span>
            <span className="font-semibold text-[#edf7ff]">12 / 12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#9bb0bd]">Irrigation</span>
            <span className="font-semibold text-[#6ffbbe]">Normal</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
