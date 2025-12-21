import { MessagesFromDb } from "@/types/coursePageTypes";
import ShowPost from "./ForumPost";

type MessageType = MessagesFromDb["messagesByCourseSlug"][number];
// je réutilise l'interface MessagesFromDB qui renvoie un objet avec une propriété messagesByCourseSlug qui est un tableau
// MessageType est le typage d'une ligne de ce tableau (suite dans interface)

interface ShowForum {
	messages: MessageType[];
	// donc quand ici je reçois tous les messages, chaque message est typé par MessageType
	connectedUser: string | undefined;
}

export default function ShowForum({ messages, connectedUser }: ShowForum) {
	return (
		<div className="flex flex-col gap-4 basis-full w-full min-h-30">
			{messages.map((eachMsg, index) => {
				//console.log("avatar data:", eachMsg.user.avatar);
				return (
					<ShowPost
						key={eachMsg.id}
						createdAt={eachMsg.createdAt}
						content={eachMsg.content}
						userName={`${eachMsg.user.firstName} ${eachMsg.user.lastName}`}
						userAvatar={eachMsg.user.avatar}
						userId={eachMsg.user.id}
						userRole={eachMsg.user.role}
						connectedUser={connectedUser} // ici on a un nom redondant car currentUser est utilisé dans l'appel à ShowForum
						isOdd={index % 2 === 1}
					/>
				);
			})}
		</div>
	);
}

// explication de isOdd={index % 2 === 1}
// renvoie un booleen: on va diviser l'index par 2 et récupérer le reste (qui sera soit 0 pour pair soit 1 pour impair)
// on compare ensuite ce reste à 1
// si c'est 1 === 1 on renvoie true pour impair, sinon on renvoie false pour pair
// et on le récupère dans le composant
