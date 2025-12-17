"use client";
import CoursesCard from "@/components/CoursesCard";
import FilterHome from "@/components/FilterHome";
import { CourseType } from "@/@types";
import { useGraphQL } from "@/hooks/useGraphQL";

export default function Home() {

		const {
			data: CoursesData,
			loading,
			error,
		} = useGraphQL<{ courses: CourseType[] }>(
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
			<div className="flex flex-col max-w-7xl m-auto px-4">
				<FilterHome />

				<div className="flex flex-wrap flex-row justify-center gap-10">
					{CoursesData.courses.slice(0,3).map((course) => (
						<CoursesCard
							key={course.id}
							image={course.image}
							title={course.title}
							date={course.createdAt}
							description={course.description}
							slug={course.slug}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
