import Link from "next/link";
import type { CourseType } from "@/@types";
import { useAuthStore } from "@/app/store/auth";
import { useGraphQL } from "@/hooks/useGraphQL";
import SmallCoursesCard_with_progressBar from "./smallCoursesCard_with_progressBar";

export default function Dashboard() {
	const user = useAuthStore((state) => state.user);

	const {
		data: subscribedCourses,
		loading: loadingSubscribedCourses,
		error: errorSubscribedCourses,
		// createdCourses?.userById?.courses
		// subscribedCourses?.subscriptionByUser
	} = useGraphQL<{ subscriptionByUser: CourseType[] }>(
		`#graphql
      query SubscriptionByUser($userId: UUID!) {
				subscriptionByUser(userId: $userId) {
					course {
						id
						title
						image
						slug
					}
				}
			}
    `,
		{
			userId: user?.id,
		},
	);
	const {
		data: createdCourses,
		// loading: loadingCreatedCourses,
		// erro: errorCreatedCourses,
	} = useGraphQL<{
		userById: {
			courses: CourseType[];
		};
	}>(
		`#graphql
      query UserById($userId: UUID!) {
				userById(id: $userId) {
					courses {
						id
						title
						image
						slug
					}
				}
			}
    `,
		{
			userId: user?.id,
		},
	);

	// if (errorSubscribedCourses) return <p>Error: {errorSubscribedCourses}</p>;

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

						{!createdCourses?.userById?.courses && <p>Aucun cours créé</p>}
						{createdCourses?.userById?.courses?.map((course: CourseType) => {
							// const { course } = subscription;
							return (
								<SmallCoursesCard_with_progressBar
									key={course.id}
									image={course.image}
									title={course.title}
									slug={course.slug}
									// progress={0}
									editMode={true}
								/>
							);
						})}
					</div>
					<div className="h-full md:h-1/2 flex flex-col mx-2 ">
						<div className="flex items-center justify-between">
							<h2 className="font-bold text-2xl text-primary-text py-4">
								Mes cours suivis
							</h2>
						</div>
						{!subscribedCourses?.subscriptionByUser && (
							<p>Aucun cours abonné</p>
						)}
						{subscribedCourses?.subscriptionByUser?.map((subscription) => {
							const course: CourseType = subscription.course;
							return (
								<SmallCoursesCard_with_progressBar
									key={course.id}
									image={course.image}
									title={course.title}
									slug={course.slug}
									progress={Math.floor(Math.random() * 100)}
								/>
							);
						})}
					</div>
				</div>
			</main>
		</div>
	);
}
