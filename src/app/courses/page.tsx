"use client"; // passer en "use client" pour utiliser le hook

import type { CourseType } from "@/@types";
import { useGraphQL } from "@/hooks/useGraphQL";
import Link from "next/link";

export default function CoursesPage() {
  // SANS LE HOOK
  // export default async function CoursesPage() { "async" sans le hook
  /* const fetchData = async () => {
    // query graphQL
    const query = `#graphql
      query {
        courses {
          id
          title
          slug
        }
      }
    `;

    // requête au endpoint GraphQL
    const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });
    const { data } = await res.json();
    return data;
  };
  const CoursesData = await fetchData(); */

  // AVEC LE HOOK
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
      }
    }
  `,
    {},
  );

  return (
    <main>
      <h1>Page des cours</h1>
      <div>
        {loading ? (
          <>Loading...</>
        ) : (
          CoursesData?.courses.map((course: CourseType) => {
            const { id, slug, title } = course;
            return (
              <Link key={id} href={`/courses/${slug}`}>
                <div>Accéder aux détails du cours "{title}"</div>
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
}
