import Link from "next/link";
import type { CourseType } from "@/@types";
import { useGraphQL } from "@/hooks/useGraphQL";
// import SmallCoursesCard from "./smallCoursesCard";
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
		<div className="flex justify-center font-sans ">
			<main className="items-center justify-between bg-[#F4ECE2] mx-2">
				<div className="flex flex-col md:flex-row p-4 border-4 rounded-2xl border-primary-red shadow-xl/30 ">
					<div className="h-full md:h-1/2 flex flex-col mx-2 mb-1">
						<div className="flex items-center justify-between gap-2">
							<h2 className="font-bold text-2xl text-primary-text py-4">
								Mes cours créés
							</h2>
							<Link
								href="/courses/create"
								className="px-4 py-2 font-bold text-2xl rounded-md bg-secondary-red text-background-charte cursor-pointer min-w-50 text-center transition hover:bg-primary-red hover:brightness-130 hover:shadow-xl hover:text-white"
							>
								Créer un cours
							</Link>
						</div>

						{CoursesData.courses.map((course: CourseType) => (
							<SmallCoursesCard_with_progressBar
								key={course.id}
								image={course.image}
								title={course.title}
								slug={course.slug}
								// progress={0}
								editMode={true}
							/>
						))}
						{/* <SmallCoursesCard
							key={course.id}
							image={course.image}
							title={course.title}
							slug={course.slug}
						/> */}
					</div>
					<div className="h-full md:h-1/2 flex flex-col mx-2 ">
						<div className="flex items-center justify-between">
							<h2 className="font-bold text-2xl text-primary-text py-4">
								Mes cours suivis
							</h2>
						</div>

						{CoursesData.courses.map((course: CourseType) => (
							<SmallCoursesCard_with_progressBar
								key={course.id}
								image={course.image}
								title={course.title}
								slug={course.slug}
								progress={Math.floor(Math.random() * 100)}
							/>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
