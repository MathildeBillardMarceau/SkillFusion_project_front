"use client";
import { CourseType } from "@/@types";
import CoursesCard from "@/components/CoursesCard";
import Header from "@/components/Header";
import LoginPopIn from "@/components/modals/LoginPopIn";
import ProfilPopIn from "@/components/modals/ProfilPopIn";
import { useGraphQL } from "@/hooks/useGraphQL";
import { useState } from "react";

export default function Courses() {
  const [ showProfil, setShowProfil] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
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
        showLogin || showProfil ? "blur-sm" : ""
      }`}>
      <header>
        <meta name="viewport" content="width=device-width, initial-scale=< set1.0" />
      <Header onLoginclick={() => setShowLogin(true)} onProfilclick={() => setShowProfil(true)} />
      </header>
      <main className=" bg-[#F4ECE2]">

          <div className="flex flex-row flex-wrap justify-center ">
          {CoursesData.courses.map((course: CourseType) => (
            < CoursesCard key={course.id} image={course.image} title={course.title} date={course.createdAt} description={course.description} />))}
        </div>
      </main>
      </div>
      <div>
      {showProfil && 
        <ProfilPopIn onClose={() => setShowProfil(false)} />}
      </div>
      <div >
      {showLogin && 
        <LoginPopIn onClose={() => setShowLogin(false)} />}
      </div>
    </div>
  );
}