import Image from "next/image";

interface CourseMainMedia {
	media?: string;
}

export default function ShowCourseImage({ media }: CourseMainMedia) {
	return (
		<div className="w-full relative aspect-video overflow-hidden rounded-2xl shadow-xl/30 border-2 border-primary-red">
			{/* l'idée ici c'est d'avoir une image en 16/9 comme ça ce sera bon aussi pour les vidéos*/}
			<Image
				src={media || "/images/default.jpg"}
				alt="tableau électrique"
				fill
				className="absolute top-0 left-0 object-cover"
			/>
		</div>
	);
}
