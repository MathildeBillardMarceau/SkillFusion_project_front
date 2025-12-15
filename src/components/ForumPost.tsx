import Image from "next/image";
import formatDateFr from "@/app/utils/datefr";

interface ShowOneMessage {
	createdAt: string;
	content: string;
	userName: string;
	userAvatar: string;
	userRole: string;
	isOdd: boolean;
	connectedUser: string;
}

export default function ShowPost({
	createdAt,
	content,
	userName,
	userAvatar,
	userRole,
	isOdd,
	connectedUser,
}: ShowOneMessage) {
	const bgOpacity = isOdd ? "30" : "50";
	// on récupère le isOdd calculé sur l'index du map et on définit selon qu'il soit true ou false la valeur de bgOpacity, qu'on pourra ensuite utiliser pour afficher en alternance les deux fonds
	return (
		// bord de la case
		<div
			className={`flex flex-col p2 w-full p-1 shadow-xl/30 rounded-md bg-altground/${bgOpacity}`}
		>
			{/* partie avatar et message */}
			<div className="flex flex-row p2 w-full p-1">
				{/* je vérifie que connecterUser et userName sont équivalents: si non j'affiche l'avatar à gauche - la suite dans l'autre div */}
				{connectedUser === userName ? (
					<div className="  flex flex-col items-center justify-start w-[15%] p-2"></div>
				) : (
					avatarBlock(userAvatar, userName)
				)}
				{/* bloc message central */}
				<div className=" flex flex-col w-[70%] p-4">
					<p>{content}</p>
				</div>
				{/* si oui j'affiche l'avatar à droite */}
				{connectedUser === userName ? (
					avatarBlock(userAvatar, userName)
				) : (
					<div className="  flex flex-col items-center justify-start w-[15%] p-2"></div>
				)}
			</div>

			{/* partie gestion sous le post (date et boutons) */}
			<div className="flex flex-row w-[70%] mx-auto p-1">
				{/* partie date aligner à gauche*/}
				<div className="flex justify-start w-full gap-2">
					<p className="italic font-light">{formatDateFr(createdAt)}</p>
				</div>
				{/* groupe de boutons - aligner à droite */}
				<div className="flex justify-end w-full gap-2">
					<button
						type="button"
						className="  px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"
					>
						({userRole})
					</button>
					<button
						type="button"
						className="px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"
					>
						Modérer
					</button>
					<button
						type="button"
						className="px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"
					>
						Signaler!
					</button>
				</div>
			</div>
		</div>
	);
}

// // fonction de mise en forme de la date qui se appelée pour formater createdAt lors de son affichage
// function formatDateFr(iso: string) {
// 	return new Date(iso).toLocaleString("fr-FR", {
// 		day: "2-digit",
// 		month: "short",
// 		year: "numeric",
// 		hour: "2-digit",
// 		minute: "2-digit",
// 		hour12: false,
// 	});
// }

// fonction pour afficher l'avatar (et pouvoir l'afficher à gauche ou à droite selon les cas)
function avatarBlock(userAvatar: string, userName: string) {
	return (
		<div className="  flex flex-col items-center justify-start w-[15%] p-2">
			<div className="relative w-[150px] h-[150px]">
				{/* div pour définir la taille de l'image même quand elle déborde + utilisation de fill et object-cover pour que toutes tiennent dans le carré 150x150 */}
				<Image
					src={`/avatar/${userAvatar || "Manchas.jpg"}`}
					alt={`avatar de ${userName}`}
					fill
					className="border-primary-red border-2 rounded object-cover"
				/>
			</div>
			<h5 className="font-bold text-primary-red">{userName}</h5>
		</div>
	);
}
