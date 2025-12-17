interface CourseInfos {
	description: string;
	createdAt: string;
	userName: string;
	chapterTitle: string;
	chapterDescription: string;
	chapterText: string;
}

import formatDateFr from "@/app/utils/datefr";

export default function ShowCourseLesson({
	description,
	createdAt,
	userName,
	chapterTitle,
	chapterDescription,
	chapterText,
}: CourseInfos) {
	return (
		<div className="flex flex-col gap-6 p-2">
			<h2 className="font-bold capitalize  text-primary-red text-2xl">
				{chapterTitle}
			</h2>
			<p className="italic text-primary-text text-lg">
				{chapterDescription || "chargement en cours"}
			</p>
			<div
				className="chapter-content"
				dangerouslySetInnerHTML={{ __html: chapterText }}
			/>
			{/* <h4 className="font-bold capitalize  text-primary-red">
				Traçage des repèresS
			</h4>

			<h4 className="font-bold capitalize  text-primary-red">
				Préparer les trous dans le placo
			</h4>
			<p>{description || "chargement en cours"}</p>
			<h4 className="font-bold capitalize  text-primary-red">
				Vérifier qu'on ne perce pas dans un cable
			</h4>
			<p>{description || "chargement en cours"}</p> */}
			<div>
				<p className="text-sm text-primary-text italic font-light">
					Publié le {formatDateFr(createdAt)} par{`${userName}`}
				</p>
			</div>
		</div>
	);
}
