"use client";
import CoursesCard from "@/components/CoursesCard";
import FilterHome from "@/components/FilterHome";
import { coursesData } from "@/data/coursesData";

export default function Home() {
	return (
		<main>
			<div className="flex flex-col max-w-7xl m-auto ">
				<FilterHome />

				<div className="flex flex-wrap flex-row justify-center gap-10">
					{coursesData.slice(3).map((course) => (
						<CoursesCard
							key={course.id}
							image={course.image}
							title={course.title}
							date={course.date}
							description={course.description}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
