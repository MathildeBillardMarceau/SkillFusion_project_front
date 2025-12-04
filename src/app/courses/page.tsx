import CoursesCard from "@/components/CoursesCard";


export default function Courses() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-[#F4ECE2] dark:bg-black sm:items-start">
        <div className="text-primary">Listes des cours
          <CoursesCard 
            title="Poser une étagère" 
            date="19 Mai 2025" 
            description="Les étagères contre les murs sont des éléments souvent rencontrés..." 
          />

        </div>
      </main>
    </div>
  );
}