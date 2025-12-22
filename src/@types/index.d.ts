export type CourseType = {
	course?: CourseType;
	id: string;
	title: string;
	slug: string;
	description?: string;
	image?: string;
	level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
	duration?: string;
	cost?: string;
	material?: string;
	chapters?: string;
	categories?: CategoryProps[];
	publishedAt: string;
	createdAt: string;
	updatedAt: string;

	userId: string;
};

export type UserType = {
	id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: "APPRENTICE" | "INSTRUCTOR" | "ADMIN";
	status: "PENDING" | "APPROVED" | "BANNED";

	createdAt: string;
	updatedAt: string;
};

export type MediaProps = {
	id: string;
	url: string;
	type?: string;
};

export type MediaPreviewerProps = {
	media?: MediaProps | null;
	selectedFile: File | null | undefined;
	onFileSelected: (file: File | null) => void;
	allowedTypes?: string; // ex: "image/*,video/*"
	maxSize?: number; // en octets
};

export interface ILessonProps {
	id: string;
	title: string;
	description?: string;
	text?: string;
	media?: MediaProps;
	fileToUpload?: File | null;
	isOpen?: boolean;
}
export interface ILessonsProps {
	lessons: ILessonProps[];
	setLessons: React.Dispatch<React.SetStateAction<ILessonProps[]>>;
}

export interface ISortbaleLesson {
	lesson: ILessonProps;
	lastCreatedLessonRef: React.RefObject<string | null>;
	onChange: (id: string, patch: Partial<ILessonProps>) => void;
	onDelete: (id: string) => void;
}

export interface CategoryProps {
	id: string;
	name: string;
	color?: string;
	description?: string;
}

export interface CategoriesDataProps {
	categories: CategoryProps[];
}
export interface LevelsDataProps {
	levels: string[];
}

export interface ICourseBySlugQuery {
	courseBySlug: {
		id: string;
		title: string;
		slug: string;
		description: string;
		image: string | null;
		level: string;
		duration: string | null;
		cost: string | null;
		material: string | null;
		publishedAt: string | null;
		createdAt: string;
		updatedAt: string | null;
		categories: {
			id: string;
			name: string;
			color: string | null;
			icon: string | null;
		}[];
		chapters: {
			id: string;
			title: string;
			description: string | null;
			text: string | null;
			medias: {
				id: string;
				type: string;
				url: string;
			}[];
		}[];
	};
}
