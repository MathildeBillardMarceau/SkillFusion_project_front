"use client";
// le useState (nécéssaire pour le showlogin) (test)
import { useParams } from "next/navigation";
// useParams va nous permettre de récupérer le slug pour avoir les commentaires qui correspondent aux deux forums
import ShowCourseLesson from "@/components/CourseLesson";
// le popin pour se connecter
import ShowPost from "@/components/ForumPost";

//import { messagesData } from "@/data/messagesData"; // les données mockup pour le forum

import { useEffect } from "react";
// les différents composants du cours
import ShowCourseChapters from "@/components/CourseChapters";
import ShowCourseImage from "@/components/CourseImage";
import ShowCourseTools from "@/components/CourseTools";
import { useGraphQL } from "@/hooks/useGraphQL";

// ajout du typage du retour GQL pour éviter les erreurs sur courseBySlug
interface CourseFromDB {
	courseBySlug: {
		id: string;
		title: string;
		description: string;
		image: string;
		level: string;
		duration: string;
		cost: string;
		material: string;
		createdAt: string;
		updatedAt: string;
		user: { firstName: string; lastName: string };
		categories: { name: string; color: string; icon: string }[];
	};
}

// fonction qui va afficher l'ensemble de la page
export default function SingleCourse() {
	const params = useParams();
	// je définit params depuis useParams() et je vais récupérer plus bas params.slug
	const simConnectedUser = "Lina";
	// on set le useState par défaut à false (je suppose qu'ensuite il faudra le récupérer ailleurs puisqu'on est déjà dans la navigation)

	const {
		data: messagesFromDBData,
		loading: messagesFromDBLoading,
		error: messagesFromDBError,
	} = useGraphQL(
		`#graphql
    query MessagesByCourseSlug($slug: String!) {
       messagesByCourseSlug(slug: $slug) {
        id
        content
        user {
          firstName
          lastName
          id
        }
        course {
          title
        }
        createdAt
        updatedAt
    }
  }`,
		{ slug: params.slug },
	);

	const {
		data: courseFromDBData,
		loading: courseFromDBLoading,
		error: courseFromDBError,
	} = useGraphQL<CourseFromDB>(
		`#graphql
    query CourseBySlug($slug: String!) {
      courseBySlug(slug: $slug) {
        id
        title
        slug
        description
        image
        level
        duration
        cost
        material
        publishedAt
        user {
          firstName
          lastName
        }
        categories {
          name
          color
          icon
        }
        createdAt
        updatedAt
      }
    }
    `,
		{ slug: params.slug },
	);

	// pour ne pas avoir à utiliser 15 fois tout ce chemin, je le remplace par la variable course
	const course = courseFromDBData?.courseBySlug;

	return (
		// début de la fonction qui return le contenu de la page
		<div className="m-10 ">
			{/* container principal avec un margin de 10 */}

			<div
				className={`bg-[#F4ECE2] transition-all duration-300`}
				// modifie le blur en arrière plan quand on affiche le login
				// doit contenir toute la page (ou tous les éléments qu'on veut blur donc pas le header par exemple)
			>
				<main className="flex flex-col h-[calc(100vh-HEADER_HEIGHT)] w-full mx-auto max-w-7xl  items-center justify-between gap-x-[5%] gap-y-4 py-4 px-2 dark:bg-black sm:items-start">
					{/* titre du chapitre */}

					{!courseFromDBLoading && (
						<>
							{/* Le courseFromDBLoading et le fragment <></> permettent déviter d'afficher la page tant qu'on a pas reçu les éléments de la requête et donc de faire des doubles loadings */}
							<h2 className="font-display-title font-bold text-2xl text-primary-red mx-2">
								{course?.title}
							</h2>
							{/* Possible ajout d'une ligne de catégories ici */}
							{/* contenu du cours */}
							<div className="flex basis-full w-full items-start justify-between space-between 0% p-1">
								{/* <div className="flexbox principale qui se coupe en deux verticalement"> */}
								<div className="flex flex-col w-[68%] ">
									{/* <div className="flexbox de gauche qui prends les 2/3 et se coupe horizontalement"> */}
									{/* l'idée ici c'est d'avoir une image en 16/9 comme ça ce sera bon aussi pour les vidéos*/}
									<ShowCourseImage media={course?.image} />
									{/* Le cours et l'image sont dans deux composants différents car je souhaite laisser la div parente dans la structure puisqu'elle définit la largeur à 68% */}
									{course && (
										// je conditionne l'existence de course pour les erreurs de typage
										<ShowCourseLesson
											description={course?.description}
											createdAt={course?.createdAt}
											userName={`${course?.user.firstName} ${course?.user.lastName}`}
										/>
									)}
								</div>
								<div className="flex flex-col w-[28%] gap-12 ">
									{/* ici on va définir les éléments de la colonne de gauche */}
									{/* La navigation entre les chapitres */}
									<ShowCourseChapters />
									{/* les infos complémentaires */}
									{/* Ces composants sont optionnels et sont donc mis en ? dans leur interface */}
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
					<div className="flex flex-col gap-4 basis-full w-full min-h-30">
						{/* message du forum en provenance du component */}
						{messagesFromDBData?.messagesByCourseSlug
							// filter pour choisir seulement les messages correspondant au slug avec params.slug récupéré via useParams()
							//.filter((eachMsg) => eachMsg.courseId === params.slug)
							// map pour envoyer tous les messages filtrés au composant
							.map((eachMsg, index) => (
								<ShowPost
									key={eachMsg.id}
									createdAt={eachMsg.createdAt}
									content={eachMsg.content}
									userName={`${eachMsg.user.firstName} ${eachMsg.user.lastName}`}
									userAvatar={eachMsg.userAvatar}
									userRole={eachMsg.userRole}
									isOdd={index % 2 === 1}
									connectedUser={simConnectedUser}
									// renvoie un booleen: on va diviser l'index par 2 et récupérer le reste (qui sera soit 0 pour pair soit 1 pour impair)
									// on compare ensuite ce reste à 1
									// si c'est 1 === 1 on renvoie true pour impair, sinon on renvoie false pour pair
									// et on le récupère dans le composant
								/>
							))}
					</div>
				</main>
			</div>
		</div>
	);
}
