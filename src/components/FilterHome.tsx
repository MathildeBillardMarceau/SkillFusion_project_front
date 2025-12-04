export default function FilterHome() {
  return (
    <div>
      <nav className="inline-block py-10 px-5 bg-background-charte sm:items-start">
        <button type="button" className="min-w-45 max-h-15 p-2.5 border-2 font-bold rounded-l-md border-primary-red bg-primary-red text-background-charte cursor-pointer"> Populaires  </button>
        <button type="button" className="min-w-45 max-h-15 p-2.5 border-2 font-bold rounded-r-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"> Nouveautés  </button>
      </nav>
    </div>
  )
}
