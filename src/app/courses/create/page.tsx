"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/app/store/auth";
import CourseForm from "@/components/CourseCreationEdition/CourseForm";

export default function CreateCoursePage() {
	const { user } = useAuthStore();

	const router = useRouter();

	useEffect(() => {
		if (!user || (user && !["INSTRUCTOR", "ADMIN"].includes(user.role))) {
			router.push("/");
		}
	}, [user, router]);
	return (
		<main className="w-full h-full mx-auto">
			<CourseForm mode="create" />
		</main>
	);
}
