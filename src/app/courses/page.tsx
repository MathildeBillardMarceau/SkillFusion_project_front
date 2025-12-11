"use client";
import { CourseType } from "@/@types";
import CoursesCard from "@/components/CoursesCard";
import Header from "@/components/Header";
import LoginPopIn from "@/components/modals/LoginPopIn";
import ProfilPopIn from "@/components/modals/ProfilPopIn";
import { useGraphQL } from "@/hooks/useGraphQL";
import { useState } from "react";

export default function Courses() {
	const [showProfil, setShowProfil] = useState(false);
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
		<main>
			{/* <div className="flex flex-row flex-wrap justify-center "> */}
			<div className="flex flex-col max-w-7xl m-auto ">
				<div className="flex flex-wrap flex-row justify-center gap-10">
					{CoursesData.courses.map((course: CourseType) => (
						<CoursesCard
							key={course.id}
							image={course.image}
							title={course.title}
							date={course.createdAt}
							description={course.description}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
