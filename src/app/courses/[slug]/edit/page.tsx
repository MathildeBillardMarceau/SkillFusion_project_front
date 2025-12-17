"use client";

import { useParams } from "next/navigation";
import type { ICourseBySlugQuery } from "@/@types";
import CourseForm from "@/components/CourseCreationEdition/CourseForm";
import { useGraphQL } from "@/hooks/useGraphQL";

export default function EditCoursePage() {
	const { slug } = useParams();

	const { data, loading, error } = useGraphQL<ICourseBySlugQuery>(
		`#graphql
      query CourseBySlug($slug: String!) {
        courseBySlug(slug: $slug) {
          title slug description image level duration cost material publishedAt createdAt updatedAt
          categories { id name color icon }
          chapters { id title description text medias { id type url }}
        }
      }
      `,
		{ slug },
	);

	return (
		<main className="w-full h-full bg-gray-100 m-auto">
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error loading course data</p>
			) : (
				<CourseForm mode="edit" initialData={data?.courseBySlug} />
			)}
		</main>
	);
}
