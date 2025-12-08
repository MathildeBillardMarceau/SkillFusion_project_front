"use client";
import CoursesCard from "@/components/CoursesCard";
import Header from "@/components/Header";
import { useGraphQL } from "@/hooks/useGraphQL";

export default function Courses() {

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
          slug
          image
          createdAt
          description
      }
    }
  `,
    {},
  );

  if (error) return <p>Error: {error}</p>;
  if (!CoursesData?.courses) return <p>No courses</p>;

  return (
    <div className="m-10">
      <div className={`bg-[#F4ECE2] transition-all duration-300 ${
        showLogin ? "blur-sm" : ""
      }`}>
      <header>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Header onLoginclick={() => setShowLogin(true)}  />
      </header>
      <main className=" bg-[#F4ECE2]">

          <div className="flex flex-row flex-wrap justify-center ">
          {CoursesData.courses.map((course: CourseType) => (
          < CoursesCard key={course.id} image={course.image} title={course.title} date={course.date} description={course.description} />))}
        </div>
      </main>
      </div>
      <div >
      {showLogin && 
        <LoginPopIn adresseMail="" motDePasse="" onClose={() => setShowLogin(false)} />}
      </div>
    </div>
  );
}