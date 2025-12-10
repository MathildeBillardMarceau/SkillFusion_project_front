"use client";

import type { CourseType } from "@/@types";
import { useLazyGraphQL } from "@/hooks/useLazyGraphQL";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export type CourseBySlug = {
	courseBySlug: CourseType;
};

export default function CoursePage() {
	// récupération du param
	const { slug } = useParams();
	// console.log("params.slug", slug);

	// SANS LE HOOK
	// récupération des datas
	// const [courseData, setCourseData] = useState<CourseType | null>(null);
	/* useEffect(() => {
    const fetchData = async () => {
      // query graphQLs
      const query = `#graphql
        query ($slug: String!) {
          courseBySlug(slug: $slug) {
            id
            title
          }
        }
      `;

      // variables graphQL
      const variables = {
        slug,
      };

      // requête au endpoint GraphQL
      const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
      });
      const { data } = await res.json();
      return await data;
    };

    // appel du fetch
    fetchData().then((data) => {
      console.log("CourseData", data.courseBySlug);
      // récupération et stockade de la data
      setCourseData(data.courseBySlug);
    });
  }, [slug]); */

	/*  const { data, loading, error } = useGraphQL<CourseBySlug>(
    `#graphql
  query ($slug: String!) {
    courseBySlug(slug: $slug) { 
      id 
      title 
    }
  }
`,
    { slug },
  ); */

	const { data, loading, error, fetchData } =
		useLazyGraphQL<CourseBySlug>(`#graphql
    query ($slug: String!) {
      courseBySlug(slug: $slug) { 
        id 
        title 
        image
      }
    }
  `);

	useEffect(() => {
		console.log("params.slug", slug);
		if (!slug) return;
		fetchData({ variables: { slug } });
	}, [slug, fetchData]);

	if (!slug) return <>Aucun cours ici</>;
	if (!data) return <></>;

	const { title, image } = data.courseBySlug;

	return (
		<main>
			{loading ? (
				<>Loading...</>
			) : (
				<>
					<h1>Page du cours {title}</h1>
					<div>détails du cours</div>
					{image && <Image src={image} width={200} height={200} alt="" />}
				</>
			)}
		</main>
	);
}
