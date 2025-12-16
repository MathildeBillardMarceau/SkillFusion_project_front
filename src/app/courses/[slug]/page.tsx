"use client";
import { useParams } from "next/navigation"; // récupération du slug
import { useEffect, useState } from "react"; // le useState pour le browsing des chapitres
import ShowCourseChapters from "@/components/CourseChapters";
import ShowCourseImage from "@/components/CourseImage";
import ShowCourseLesson from "@/components/CourseLesson";
import ShowCourseTools from "@/components/CourseTools";
import ShowPost from "@/components/ForumPost";
import { useGraphQL } from "@/hooks/useGraphQL"; // hook GQL

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
		chapters: { title: string; description: string; text: string }[];
	};
}

interface MessagesFromDb {
	messagesByCourseSlug: {
		id: string;
		content: string;
		createdAt: string;
		updatedAt: string;
		user: { firstName: string; lastName: string; id: string };
		course: { title: string };
	}[];
}

export default function SingleCourse() {
	const params = useParams();
	const simConnectedUser = "Lina";

	const {
		// requête pour aller récupérer les éléments du cours
		data: courseFromDBData,
		loading: courseFromDBLoading,
		error: courseFromDBError,
	} = useGraphQL<CourseFromDB>(
		`#graphql
    query CourseBySlug($slug: String!) {
      courseBySlug(slug: $slug) {
        id            #inutile ?
        title
        slug          #utilisé pour la requête
        description
        image
        level
        duration
        cost
        material
        publishedAt   #j'ai utilisé created at dans l'affichage
        createdAt
        updatedAt     #j'ai utilisé created at dans l'affichage
        user {
          firstName
          lastName
        }
        categories {  #pas disponibles actuellement
          name
          color
          icon
        }
				chapters {
					id
					title
					description
					text
					createdAt
					updatedAt
    		}
      }
    }
    `,
		{ slug: params.slug },
	);

	const course = courseFromDBData?.courseBySlug; // chemin raccourci pour les éléments de la requête

	const {
		// requête pour aller récupérer les messages du forum
		data: messagesFromDBData,
		loading: messagesFromDBLoading,
		error: messagesFromDBError,
	} = useGraphQL<MessagesFromDb>(
		`#graphql
    query MessagesByCourseSlug($slug: String!) {
      messagesByCourseSlug(slug: $slug) {
      id
      content
      createdAt
      updatedAt
      user {
        firstName
        lastName
        id
        }
      course {
        title
        }
    }
  }`,
		{ slug: params.slug },
	);

	const [selectedChapter, setSelectedChapter] = useState(
		course?.chapters[0] || null,
	);

	useEffect(
		() => {
			// fonction qui permet de changer la valeur de course (manuellement pour l'instant)
			if (course?.chapters?.length) {
				setSelectedChapter(course.chapters[0]);
			}
		},
		[course], // ici on précise que useEffect ne s'applique que pour les éléments de course (et donc chapter)
	);

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
												{console.log("contenu du cours", selectedChapter.text)}
												<ShowCourseLesson
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
									<ul className="min-h-20 w-60 md:w-full flex flex-col gap-4 border-4 rounded-md border-primary-red shadow-xl/30">
										{course?.chapters.map((eachChapter) => (
											<ShowCourseChapters
												key={eachChapter.id}
												title={eachChapter.title}
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
					<div className="flex flex-col gap-4 basis-full w-full min-h-30">
						{messagesFromDBData?.messagesByCourseSlug
							// filter OLD: utile avec le mockup, plus avec GQL - pour choisir seulement les messages correspondant au slug avec params.slug récupéré via useParams -
							//.filter((eachMsg) => eachMsg.courseId === params.slug)
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
								/>
							))}
					</div>
				</main>
			</div>
		</div>
	);
}

// explication de isOdd={index % 2 === 1}
// renvoie un booleen: on va diviser l'index par 2 et récupérer le reste (qui sera soit 0 pour pair soit 1 pour impair)
// on compare ensuite ce reste à 1
// si c'est 1 === 1 on renvoie true pour impair, sinon on renvoie false pour pair
// et on le récupère dans le composant
