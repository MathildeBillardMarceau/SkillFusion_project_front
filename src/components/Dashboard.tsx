import Link from "next/link";
import type { CourseType } from "@/@types";
import { useGraphQL } from "@/hooks/useGraphQL";
import SmallCoursesCard from "./smallCoursesCard";
import SmallCoursesCard_with_progressBar from "./smallCoursesCard_with_progressBar";

export default function Dashboard() {
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
            image
            slug
        }
      }
    `,
		{},
	);

	if (error) return <p>Error: {error}</p>;
	if (!CoursesData?.courses) return <p>No courses</p>;

	return (
		<div className="flex items-center justify-center font-sans dark:bg-black">
			<main className="items-center justify-between  bg-[#F4ECE2] dark:bg-black  px-2">
				<div className="flex flex-col md:flex-row items-baseline border-4 rounded-md border-primary-red shadow-xl/30 px-2">
					<div className="h-full md:h-1/2 flex flex-col mx-2 mb-1">
						<div className="flex items-center justify-between">
							<h1 className="font-bold text-2xl m-4 text-primary-text px-4">
								Mes cours créés
							</h1>
							<Link
								href="/courses/create"
								className="px-4 py-2 font-bold text-2xl rounded-md bg-secondary-red text-background-charte cursor-pointer min-w-50 text-center"
							>
								Créer un cours
							</Link>
						</div>

						{CoursesData.courses.map((course: CourseType) => (
							<SmallCoursesCard
								key={course.id}
								image={course.image}
								title={course.title}
								slug={course.slug}
							/>
						))}
					</div>
					<div className="h-full md:h-1/2 flex flex-col mx-2 mb-1">
						<h1 className="font-bold text-2xl m-4 text-primary-text px-4">
							Mes cours suivis
						</h1>

						{CoursesData.courses.map((course: CourseType) => (
							<SmallCoursesCard_with_progressBar
								key={course.id}
								image={course.image}
								title={course.title}
								slug={course.slug}
								progress={60}
							/>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
