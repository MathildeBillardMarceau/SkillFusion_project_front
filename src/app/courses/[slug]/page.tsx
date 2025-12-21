"use client";
import { useParams } from "next/navigation"; // récupération du slug
import { useEffect, useState } from "react"; // le useState pour le browsing des chapitres
import { useAuthStore } from "@/app/store/auth"; // composant pour gérer l'authentification
import ShowCourseChapters from "@/components/CourseChapters";
import ShowCourseImage from "@/components/CourseImage";
import ShowCourseLesson from "@/components/CourseLesson";
import ShowCourseTools from "@/components/CourseTools";
import SubscriptionStatus from "@/components/courseSubscribe";
import ShowForum from "@/components/forum";
import { useGraphQL } from "@/hooks/useGraphQL"; // hook GQL
import {
	queryCourseBySlug,
	queryMessagesByCourseSlug,
	// querySubscriptionByCourse,
	querySubscriptionByUserAtCourse,
} from "@/queries/coursePageQueries";
import {
	CourseFromDB,
	MessagesFromDb,
	SubscriptionByUserAtCourse,
} from "@/types/coursePageTypes"; //ic on a des alertes de biome car on importe des types et pas des variables à utiliser

export type Chapter = CourseFromDB["courseBySlug"]["chapters"][number];
// le typage de chapter va nous permettre de raccourci le ??? dans le useState
// il faut exporter ce typage pour le recevoir dans le composant enfant

export default function SingleCourse() {
	const params = useParams();
	//const simConnectedUser = "Lina";
	const currentUser = useAuthStore((state) => state.user?.id);
	// ici je vérifie s'il y a un connectedUser ou si c'est null

	const {
		// requête pour aller récupérer les éléments du cours
		data: courseFromDBData,
		loading: courseFromDBLoading,
		// error: courseFromDBError,
	} = useGraphQL<CourseFromDB>(queryCourseBySlug, { slug: params.slug });

	const course = courseFromDBData?.courseBySlug; // chemin raccourci pour les éléments de la requête

	const {
		// requête pour aller récupérer les messages du forum
		data: messagesFromDBData,
		// loading: messagesFromDBLoading,
		// error: messagesFromDBError,
	} = useGraphQL<MessagesFromDb>(queryMessagesByCourseSlug, {
		slug: params.slug,
	});

	const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(
		course?.chapters[0] || null,
	);
	// Déclaration complexe du use State
	// on a d'abord l'object destructuré avec sa valeur (selectedChapter) et sa méthode (set...)
	// ensuite on le déclare comme useState
	// et on le type avec les < >, ici le type sera soit Chapter soit null
	// finalement on lui attribue une valeur course?.chapters[0] ou null

	useEffect(
		() => {
			// fonction qui permet de changer la valeur de course
			if (course?.chapters?.length) {
				setSelectedChapter(course.chapters[0]);
			}
		},
		[course], // ici on précise que useEffect ne s'applique que pour les éléments de course (et donc chapter)
	);

	const {
		// requête pour vérifier l'inscription du user connecté au cours
		data: subscriptionByUserAtCourseData,
		//loading: subscriptionByUserAtCourseLoading,
		//error: subscriptionByUserAtCourseError,
	} = useGraphQL<SubscriptionByUserAtCourse>(querySubscriptionByUserAtCourse, {
		courseId: course?.id,
		userId: currentUser,
	});

	const [subscribedLesson, setSubscribedLesson] = useState<boolean | null>(
		null,
	);

	useEffect(() => {
		console.log(
			"datas:",
			subscriptionByUserAtCourseData?.subscriptionByUserAtCourse,
		);
		if (
			(subscriptionByUserAtCourseData?.subscriptionByUserAtCourse?.length ??
				0) > 0
			//je vérifie que mon tableau a une longueur > à 0 sinon je lui donne la valeur 0 pour qu'il ne soit pas null et que le typage soit content
		) {
			setSubscribedLesson(true);
		} else {
			setSubscribedLesson(false);
		}
	}, [subscriptionByUserAtCourseData]);

	// début de la fonction qui return le contenu de la page
	return (
		<div className="m-10 ">
			<div
				className={`bg-[#F4ECE2] transition-all duration-300`}
				// gestion du blur
			>
				<main className="flex flex-col h-[calc(100vh-HEADER_HEIGHT)] w-full mx-auto max-w-7xl  items-center justify-between gap-x-[5%] gap-y-4 py-4 px-2 dark:bg-black sm:items-start">
					{/* Le courseFromDBLoading et le fragment <></> permettent déviter d'afficher la page tant qu'on a pas reçu les éléments de la requête et donc de faire des doubles loadings */}
					{!courseFromDBLoading && (
						<>
							<h1 className="font-display-title font-bold text-4xl text-primary-red mx-2">
								{course?.title}
							</h1>
							<article className="font-display-title font-bold text-2l text-primary-text mx-2">
								{course?.description}
							</article>
							{/* TODO: Possible ajout d'une ligne de catégories ici */}
							<div className="flex basis-full w-full items-start justify-between space-between 0% p-1">
								{/* <div className="flexbox principale qui se coupe en deux verticalement G2/3 (avec media, texte) D1/3 (avec chapitres et outils"> */}
								<div className="flex flex-col w-[68%] ">
									<ShowCourseImage media={course?.image} />
									{course &&
										selectedChapter && ( // je conditionne l'existence de course pour les erreurs de typage
											<>
												{/* {console.log("contenu du cours", selectedChapter.text)} */}
												<ShowCourseLesson
													// TODO: utiliser le use state de l'objet plutot
													description={course.description}
													createdAt={course.createdAt}
													userName={`${course.user.firstName} ${course?.user.lastName}`}
													chapterTitle={selectedChapter.title}
													chapterDescription={selectedChapter.description}
													chapterText={selectedChapter.text}
												/>
											</>
										)}
								</div>
								<div className="flex flex-col w-[28%] gap-12 ">
									{currentUser && (
										<>
											{console.log("SubscribedLesson", subscribedLesson)}

											<SubscriptionStatus
												subscribed={subscribedLesson}
												userId={currentUser}
												courseId={course?.id}
											/>
										</>
									)}
									<ul className="min-h-20 w-60 md:w-full flex flex-col gap-3 py-2 border-4 rounded-md border-primary-red shadow-xl/30">
										{course?.chapters.map((eachChapter) => (
											<ShowCourseChapters
												key={eachChapter.id}
												title={eachChapter.title}
												isSelected={selectedChapter?.id === eachChapter.id}
												//ici j'envoie un bool pour savoir si le chapitre dans la liste est le chapitre selectionné
												onClick={() => setSelectedChapter(eachChapter)}
												//ici j'envoie la fonction qui permetta lors d'un click dans l'enfant de modifier la valeur de selectedChapter
											/>
										))}
									</ul>
									<ShowCourseTools
										duration={course?.duration}
										level={course?.level}
										cost={course?.cost}
										material={course?.material}
									/>
								</div>
							</div>
						</>
					)}

					{/* contenu du forum */}
					<ShowForum
						messages={messagesFromDBData?.messagesByCourseSlug ?? []} // ici le ??[] indique que si on a pas de retour, on envoie un tableau vide, car dans le compo le type attend un tableau dans tous les cas
						connectedUser={currentUser}
					/>
					{/* fin du forum */}
				</main>
			</div>
		</div>
	);
}
