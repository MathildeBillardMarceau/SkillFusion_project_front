"use client";

import { useParams } from "next/navigation";
import CourseForm from "@/components/CourseCreationEdition/CourseForm";
import { useGraphQL } from "@/hooks/useGraphQL";

export default function EditCoursePage() {
	const { slug } = useParams();

	console.log("Editing course with slug:", slug);

	const { data, loading, error } = useGraphQL(
		`#graphql
      query CourseBySlug($slug: String!) {
        courseBySlug(slug: $slug) {
          title
          slug
          description
          image
          level
          duration
          cost
          material
          publishedAt
          categories {
            id
            name
            color
            icon
          }
          chapters {
            id
            title
            description
            text
            medias {
              id
              type
              url
            }
          }
          createdAt
          updatedAt
        }
      }
      `,
		{ slug },
	);

	return (
		<main className="w-full h-lvh bg-white m-auto">
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error loading course data: {error.message}</p>
			) : (
				<CourseForm mode="edit" initialData={data?.courseBySlug} />
			)}
		</main>
	);
}
