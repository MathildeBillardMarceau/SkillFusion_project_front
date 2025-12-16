import Link from "next/link";
import { useState } from "react";

interface CourseChapterList {
	key: string;
	title: string;
}

export default function ShowCourseChapters({ title }: CourseChapterList) {
	const [checkedChapter, setCheckedChapter] = useState(false);
	// permet de définir les chapitres déjà cochés (mockup marche sur 1 uniquement)
	//const [currentChapter, setCurrentChapter] = useState(false);
	// permet d'afficher le chapitre en cours (mockup marche sur 3 uniquement)

	return (
		<li className="flex flex-row justify-between font-bold p-2">
			{title}
			<input
				type="checkbox"
				className={`appearance-none border-primary-red w-6 h-6 border-3 rounded 
                      ${checkedChapter ? "bg-primary-red" : "border-primary-red"}`}
				checked={checkedChapter}
				onChange={() => setCheckedChapter(!checkedChapter)}
			/>
		</li>
	);
}
