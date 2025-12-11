import { CourseType } from "@/@types";
import { useGraphQL } from "@/hooks/useGraphQL";
import SmallCoursesCard from "./smallCoursesCard";
import SmallCoursesCard_with_progressBar from "./smallCoursesCard_with_progressBar";
import Link from "next/link";

interface IDashboardProps {
  onCreateClick: () => void;
}

export default function Dashboard({ onCreateClick }: IDashboardProps) {
    const {
      data: CoursesData,
      loading,
      error,
    } = useGraphQL(
      `#graphql
      query {
        courses {
            id
            title
            image
            slug
        }
      }
    `,
      {},
    );

      if (error) return <p>Error: {error}</p>;
      if (!CoursesData?.courses) return <p>No courses</p>;  

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-[#F4ECE2] dark:bg-black sm:items-start">
        <div className="overflow-hidden flex md:flex-row items-baseline min-h-screen md:min-h-80 h-150 w-80 md:w-250 flex flex-col border-4 rounded-md border-primary-red justify-between shadow-xl/30">
        <div className="overscroll-y-contain w-1/2 m-1 ">
        <div className="flex flex-no-wrap items-center md:items-baseline justify-between w-full h-25 mx-2 mb-1">
          <h1 className="font-bold text-2xl m-4 text-primary-text px-4">Mes cours créés</h1>
          <Link href="/dashboard/create">
          <button onClick={onCreateClick} type="button" className="font-bold text-2xl m-4 border-2 rounded-md md:h-15 md:max-w-55 bg-secondary-red text-background-charte px-4 cursor-pointer"> Créer un cours</button>
          </Link>
        </div>
          {CoursesData.courses.map((course: CourseType) => (
            < SmallCoursesCard key={course.id} image={course.image} title={course.title} slug={course.slug} />))}
        </div>
        <div className="w-1/2">
        <div className="flex flex-col flex-no-wrap items-center md:items-baseline justify-between w-full h-25 mx-2 mb-1">
          <h1 className="font-bold text-2xl m-4 text-primary-text px-4">Mes cours suivis</h1>
          {CoursesData.courses.map((course: CourseType) => (
            < SmallCoursesCard_with_progressBar key={course.id} image={course.image} title={course.title} slug={course.slug} progress={60} />))}
        </div>
        </div>
        </div>
      </main>
    </div>
  );
}