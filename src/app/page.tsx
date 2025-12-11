"use client";
import CoursesCard from "@/components/CoursesCard";
import FilterHome from "@/components/FilterHome";
import Header from "@/components/Header";
import LoginPopIn from "@/components/LoginPopIn";
import ProfilPopIn from "@/components/ProfilPopIn";
import { coursesData } from "@/data/coursesData";
import { useState } from "react";

export default function Courses() {
  const [showLogin, setShowLogin] = useState(false);
  const [ showProfil, setShowProfil] = useState(false);
  return (
    <div className="m-10 ">
      <div className={`bg-[#F4ECE2] transition-all duration-300 ${
        showLogin || showProfil ? "blur-sm" : ""
      }`}>
      <header>
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Header onLoginclick={() => setShowLogin(true)} onProfilclick={() => setShowProfil(true)} />
      </header>
      <main className=" bg-[#F4ECE2] relative">
        <div className="flex flex-col">
              <div className="mt-auto md:mt-15">
                <FilterHome />
              </div>

        <div className="flex  flex-row flex-wrap justify-center">
          {coursesData.slice(3).map((course)=>(< CoursesCard key={course.id} image={course.image} title={course.title} date={course.date} description={course.description} />))}
        </div>
        </div>
      </main>
      </div>
      <div>
      {showProfil && 
        <ProfilPopIn onClose={() => setShowProfil(false)} />}
      </div>
      <div>
      {showLogin && <LoginPopIn onClose={() => setShowLogin(false)} />}
      </div>
    </div>
  );
}