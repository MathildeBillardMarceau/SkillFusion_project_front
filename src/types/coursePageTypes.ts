export interface CourseFromDB {
	courseBySlug: {
		id: string;
		title: string;
		description: string;
		image: string;
		level: string;
		duration: string;
		cost: string;
		material: string;
		createdAt: string;
		updatedAt: string;
		user: { firstName: string; lastName: string };
		categories: { name: string; color: string; icon: string }[];
		chapters: {
			id: string;
			title: string;
			description: string;
			text: string;
		}[];
	};
}

export interface MessagesFromDb {
	messagesByCourseSlug: {
		id: string;
		content: string;
		createdAt: string;
		updatedAt: string;
		user: { firstName: string; lastName: string; avatar: string; id: string };
		course: { title: string };
	}[];
}

export interface SubscriptionByUserAtCourse {
	subscriptionByUserAtCourse: {
		user: { id: string } | null;
		course: { id: string } | null;
	};
}
