interface CourseInfos {
	description: string;
	createdAt: string;
	userName: string;
}

import formatDateFr from "@/app/utils/datefr";

export default function ShowCourseLesson({
	description,
	createdAt,
	userName,
}: CourseInfos) {
	return (
		<div className="flex flex-col gap-6 p-2">
			<h3 className="font-bold capitalize  text-primary-red">Etape 5</h3>
			<h4 className="font-bold capitalize  text-primary-red">
				Traçage des repères
			</h4>
			<p>{description || "chargement en cours"}</p>
			<h4 className="font-bold capitalize  text-primary-red">
				Préparer les trous dans le placo
			</h4>
			<p>{description || "chargement en cours"}</p>
			<h4 className="font-bold capitalize  text-primary-red">
				Vérifier qu'on ne perce pas dans un cable
			</h4>
			<p>{description || "chargement en cours"}</p>
			<div>
				<p className="italic font-light">
					Publié le {formatDateFr(createdAt)} par{`${userName}`}
				</p>
			</div>
		</div>
	);
}
