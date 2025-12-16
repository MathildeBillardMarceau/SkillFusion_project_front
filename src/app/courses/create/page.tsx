"use client";

import CourseForm from "@/components/CourseCreationEdition/CourseForm";

export default function CreateCoursePage() {
	return (
		<main className="w-full h-lvh bg-white m-auto">
			<CourseForm mode="create" />
		</main>
	);
}
