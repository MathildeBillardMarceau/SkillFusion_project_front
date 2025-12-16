import Link from "next/link";
import { useState } from "react";

interface CourseChapterList {
	key: string;
	title: string;
}

export default function ShowCourseChapters({ title }: CourseChapterList) {
	const [checkedChapter, setCheckedChapter] = useState(false);
	// permet de définir les chapitres déjà cochés (mockup marche sur 1 uniquement)
	const [currentChapter, setCurrentChapter] = useState(false);
	// permet d'afficher le chapitre en cours (mockup marche sur 3 uniquement)

	return (
		<li className="flex flex-row items-center font-bold p-2">
			<div className="w-[90%]">
				<Link
					href={`http://localhost:3000/courses/erty`}
					className={`flex flex-row justify-between font-bold p-2 ${
						currentChapter
							? "border-primary-red border-t-2 border-b-2  bg-primary-red/30"
							: ""
					} `}
					onClick={() => setCurrentChapter(!currentChapter)}
				>
					<span>{title}</span>
				</Link>
			</div>
			<div className="w-[10%] flex justify-center">
				<input
					type="checkbox"
					className={`p-2 appearance-none border-primary-red w-6 h-6 border-3 rounded 
                      ${checkedChapter ? "bg-primary-red" : "border-primary-red"}`}
					checked={checkedChapter}
					onChange={() => setCheckedChapter(!checkedChapter)}
				/>
			</div>
		</li>
	);
}
