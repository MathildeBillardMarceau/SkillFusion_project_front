import CoursesCard from "@/components/CoursesCard";
import FilterHome from "@/components/FilterHome";
import Header from "@/components/Header";
import { coursesData } from "@/data/coursesData";

export default function Courses() {
  return (
    <div className="m-10 ">
      <header>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Header />
      </header>
      <main className=" bg-[#F4ECE2]">
        <div className="flex flex-col">
              <div className="mt-auto md:mt-15">
                <FilterHome />
              </div>

        <div className="flex flex-row flex-wrap justify-center">
          {coursesData.slice(3).map((course)=>(< CoursesCard key={course.id} image={course.image} title={course.title} date={course.date} description={course.description} />))}
        </div>
        </div>
      </main>
    </div>
  );
}