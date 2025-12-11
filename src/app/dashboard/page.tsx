import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-[#F4ECE2] dark:bg-black sm:items-start">
        <div className="text-primary">Dashboard</div>
        <Link href="/dashboard/create" className="px-4 py-2 border-2 rounded-md bg-secondary-red text-background-charte cursor-pointer transition hover:brightness-110">Créer un nouveau cours</Link>
      </main>
    </div>
  );
}