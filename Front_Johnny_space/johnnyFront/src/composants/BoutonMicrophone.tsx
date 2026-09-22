export default function BoutonMicrophone() {
  return (
    <button
      type="button"
      className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500 bg-emerald-500/15 text-emerald-300 transition hover:scale-105"
      aria-label="Microphone"
    >
      <span className="text-2xl">◉</span>
    </button>
  )
}
