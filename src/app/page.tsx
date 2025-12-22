"use client";

import { useMemo, useState } from "react";
import type { CourseType } from "@/@types";
import CoursesCard from "@/components/CoursesCard";
import FilterHome from "@/components/FilterHome";
import { useGraphQL } from "@/hooks/useGraphQL";

export default function Home() {
	const [filter, setFilter] = useState<"popular" | "new">("new");

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
						updatedAt
						publishedAt
				}
			}
		`,
		{},
	);

	const filteredCourses = useMemo<CourseType[]>(() => {
		if (!CoursesData?.courses) return [];

		const courses = [
			...CoursesData.courses.filter((c) => c.publishedAt !== null),
		];

		if (filter === "popular") {
			return courses
				.sort(
					(a, b) => (b.subscriptionsCount || 0) - (a.subscriptionsCount || 0),
				)
				.slice(0, 3);
		} else {
			// Tri par nouveauté
			return courses
				.sort(
					(a, b) =>
						new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
				)
				.slice(0, 3);
		}
	}, [CoursesData?.courses, filter]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!CoursesData?.courses) return <p>No courses</p>;

	return (
		<main>
			<div className="flex flex-col max-w-7xl m-auto px-4">
				<FilterHome activeFilter={filter} onChange={setFilter} />

				<div className="flex flex-wrap flex-row justify-center gap-10">
					{filteredCourses.map((course: CourseType) => {
						console.log("course", course.publishedAt);
						return (
							<CoursesCard
								key={course.id}
								image={course.image ?? ""}
								title={course.title}
								date={course.createdAt}
								description={course.description ?? ""}
								slug={course.slug}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
}
