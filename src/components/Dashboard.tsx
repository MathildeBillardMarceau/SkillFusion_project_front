

export default function Dashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-[#F4ECE2] dark:bg-black sm:items-start">
        <div className="flex md:flex-row items-baseline min-h-80 h-150 w-80 md:w-250 flex flex-col border-4 rounded-md border-primary-red justify-between shadow-xl/30">
        <div className="flex flex-col md:flex-row items-baseline w-full h-45 mb-1">
          <h1 className=" font-bold text-2xl m-4 text-primary-text px-4">Mes cours créés</h1>
          <button type="button" className="font-bold text-2xl m-4 border-2 rounded-md h-15 max-w-55 bg-secondary-red text-background-charte px-4 cursor-pointer"> Créer un cours</button>
        </div>
        <div className="flex flex-row items-baseline w-full h-45 mb-1">
          <h1 className="font-bold text-2xl m-4 text-primary-text px-4">Mes cours suivis</h1>
        </div>
        </div>
      </main>
    </div>
  );
}