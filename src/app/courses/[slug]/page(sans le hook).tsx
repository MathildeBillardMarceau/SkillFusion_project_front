"use client";

import type { CourseType } from "@/@types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursePage() {
  // récupération du param
  const { slug } = useParams();
  console.log("params.slug", slug);

  // récupération des datas
  const [courseData, setCourseData] = useState<CourseType | null>(null);

  useEffect(() => {
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
  }, [slug]);

  if (!slug) return <>Aucun cours ici</>;

  return (
    <main>
      <h1>Page du cours {courseData?.title}</h1>
      <div>détails du cours</div>
    </main>
  );
}
