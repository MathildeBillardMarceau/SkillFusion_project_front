import Image from "next/image";

interface ICoursesCardProps {
  title: string;
  date: string;
  description: string;
}

export default function Courses({title, date, description}: ICoursesCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-[#F4ECE2] dark:bg-black sm:items-start">
        <div className="text-primary border-2 rounded-md color-[">Listes des cours
          <h3>{title}</h3>
          <h4>{date}</h4>
            <p>{description} </p>
          <button>Voir</button>
        </div>
      </main>
    </div>
  );
}