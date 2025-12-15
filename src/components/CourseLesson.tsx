interface CourseInfos {
	description: string;
	createdAt: string;
	userName: string;
}

export default function ShowCourseLesson({ description, createdAt, userName }) {
	return (
		<div className="flex flex-col gap-6 p-2">
			<h3 className="font-bold capitalize  text-primary-red">Etape 5</h3>
			<h4 className="font-bold capitalize  text-primary-red">
				Traçage des repères
			</h4>
			<p>{description}</p>
			<h4 className="font-bold capitalize  text-primary-red">
				Préparer les trous dans le placo
			</h4>
			<p>{description}</p>
			<h4 className="font-bold capitalize  text-primary-red">
				Vérifier qu'on ne perce pas dans un cable
			</h4>
			<p>{description}</p>
			<div>
				<p className="italic font-light">
					Publié le {formatDateFr(createdAt)} par{`${userName}`}
				</p>
			</div>
		</div>
	);
}

// fonction de mise en forme de la date qui se appelée pour formater createdAt lors de son affichage
function formatDateFr(iso: string) {
	return new Date(iso).toLocaleString("fr-FR", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}
