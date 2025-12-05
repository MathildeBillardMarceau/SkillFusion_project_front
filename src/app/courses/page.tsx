"use client";
import CoursesCard from "@/components/CoursesCard";
import Header from "@/components/Header";
import LoginPopIn from "@/components/LoginPopIn";
import { coursesData } from "@/data/coursesData";
import { useState } from "react";

export default function Courses() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="m-10">
      <header>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Header onLoginclick={() => setShowLogin(true)}/>
      </header>
      <main className=" bg-[#F4ECE2]">
        <div className="flex flex-row flex-wrap justify-center ">
          {coursesData.map((course)=>(< CoursesCard key={course.id} image={course.image} title={course.title} date={course.date} description={course.description} />))}
        </div>
      </main>
      <div>
      {showLogin && <LoginPopIn adresseMail="" motDePasse="" onClose={() => setShowLogin(false)} />}
      </div>
    </div>
  );
}