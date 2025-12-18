"use client";

import CourseForm from "@/components/CourseCreationEdition/CourseForm";

export default function CreateCoursePage() {
	return (
		<main className="w-full h-full mx-auto">
			<CourseForm mode="create" />
		</main>
	);
}
