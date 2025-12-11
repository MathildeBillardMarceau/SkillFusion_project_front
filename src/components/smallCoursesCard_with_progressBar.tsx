import Image from "next/image";
import Link from "next/link";

interface ISmallCoursesCard_with_progressBarProps {
  image: string;
  title: string;
  slug: string;
  progress?: number;
}

export default function SmallCoursesCard_with_progressBar({image, title, slug, progress = 0}: ISmallCoursesCard_with_progressBarProps) {
  return (
    <div className="w-full h-full">
      <main className="py-10 px-5 bg-background-charte sm:items-start">
        <div className="flex flex-row h-10 w-60 md:w-100 justify-between mx-4">
          <Image src={image} alt={title} width={60} height={10} className="object-cover border-2 rounded-md border-primary-red shadow-xl/30"/>
          <h1 className="font-display-title font-bold text-xs text-primary-text mx-3 text-left">{title}</h1>
          <Link href={slug} className="text-xs justify-items-end text-secondary-text"> Lien -&gt; </Link>
        </div>
        <div className="w-2/3 bg-secondary-text rounded-full h-1.5 justify-center mx-4">
          <div className="bg-primary-red mt-3 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </main>
      </div>

  );
}