"use client";

import { useMemo, useState } from "react";
import type { CourseType } from "@/@types";
import CoursesCard from "@/components/CoursesCard";
import FilterCategories from "@/components/FilterCategories";
import { useGraphQL } from "@/hooks/useGraphQL";

export default function Courses() {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const {
		data: CoursesData,
		loading,
		error,
	} = useGraphQL<{
		courses: CourseType[];
	}>(`#graphql
    query {
      courses {
        id
        title
        slug
        image
        createdAt
        publishedAt
        description
        categories {
          name
        }
      }
    }
  `);

	const publishedCourses = useMemo(() => {
		if (!CoursesData?.courses) return [];
		return CoursesData.courses.filter((course) => course.publishedAt !== null);
	}, [CoursesData]);

	const categories = useMemo(() => {
		if (!publishedCourses.length) return [];

		const allCategories = publishedCourses.flatMap(
			(course) => course.categories,
		);

		return Array.from(
			new Map(allCategories.map((cat) => [cat?.name, cat])).values(),
		);
	}, [publishedCourses]);

	const filteredCourses = selectedCategory
		? publishedCourses.filter((course) =>
				course?.categories?.some((cat) => cat.name === selectedCategory),
			)
		: publishedCourses;

	if (error) return <p>Error: {error}</p>;
	if (!CoursesData?.courses) return <p>No courses</p>;

	return (
		<main>
			<FilterCategories
				categories={categories}
				selectedCategory={selectedCategory}
				onSelect={setSelectedCategory}
			/>

			<div className="flex flex-col max-w-7xl m-auto p-4">
				<div className="flex flex-wrap justify-center gap-10">
					{filteredCourses?.map((course) => (
						<CoursesCard
							key={course.id}
							image={course.image ?? ""}
							title={course.title}
							date={course.createdAt}
							description={course.description}
							// categories={course.categories}
							slug={course.slug}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
