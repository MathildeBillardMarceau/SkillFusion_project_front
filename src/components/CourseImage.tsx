import Image from "next/image";

interface CourseMainMedia {
	media?: string;
}

export default function ShowCourseImage({ media }: CourseMainMedia) {
	return (
		<div className="w-full relative aspect-[16/9] overflow-hidden rounded-4xl">
			<Image
				src={media || "/images/default.jpg"}
				alt="tableau électrique"
				fill
				// style={{ objectFit: "cover" }}
				className="absolute top-0 left-0 object-cover"
			/>
		</div>
	);
}
