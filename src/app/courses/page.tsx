import type { CourseType } from "@/@types";
import Link from "next/link";

export default async function CoursesPage() {
  const fetchData = async () => {
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
  const CoursesData = await fetchData();

  return (
    <main>
      <h1>Page des cours</h1>
      <div>
        {CoursesData.courses.map((course: CourseType) => {
          const { id, slug, title } = course;
          return (
            <Link key={id} href={`/courses/${slug}`}>
              <div>{title}</div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
