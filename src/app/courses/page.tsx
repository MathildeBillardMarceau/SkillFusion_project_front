"use client";
import { useState, useMemo } from "react";
import type { CourseType } from "@/@types";
import CoursesCard from "@/components/CoursesCard";
import { useGraphQL } from "@/hooks/useGraphQL";
import FilterCategories from "@/components/FilterCategories";

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: CoursesData, loading, error } = useGraphQL<{
    courses: CourseType[];
  }>(`
    query {
      courses {
        id
        title
        slug
        image
        createdAt
        description
        categories {
          name
        }
      }
    }
  `);

  const categories = useMemo(() => {
    if (!CoursesData?.courses) return [];

    const allCategories = CoursesData.courses.flatMap(
      (course) => course.categories
    );

    return Array.from(
      new Map(allCategories.map(cat => [cat.name, cat])).values()
    );
  }, [CoursesData]);

  const filteredCourses = selectedCategory
    ? CoursesData?.courses.filter(course =>
        course.categories.some(cat => cat.name === selectedCategory)
      )
    : CoursesData?.courses;

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
          {filteredCourses?.map(course => (
            <CoursesCard
              key={course.id}
              image={course.image}
              title={course.title}
              date={course.createdAt}
              description={course.description}
              categories={course.categories}
              slug={course.slug}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
