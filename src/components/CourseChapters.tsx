import Link from "next/link";
import { useState } from "react";

//import { Chapter } from "@/app/courses/[slug]/page";

interface CourseChapterList {
	key: string;
	title: string;
	isSelected: boolean;
	// ici je récupère mon bool pour savoir si ce chapitre est celui selectionné
	onClick: () => void;
	// et là la fonction du parent pour définir le chapitre selectionné
}

export default function ShowCourseChapters({
	title,
	isSelected,
	onClick,
}: CourseChapterList) {
	const [checkedChapter, setCheckedChapter] = useState(false);
	// permet de définir les chapitres déjà cochés (mockup marche sur 1 uniquement)
	//const [currentChapter, setCurrentChapter] = useState(false);
	// permet d'afficher le chapitre en cours (mockup marche sur 3 uniquement)
	// cette mécanique devient obsolète avec l'utilisation du useState du parent

	return (
		<li
			className={
				isSelected
					? "border-primary-red border-t-2 border-b-2  bg-primary-red/30 flex flex-row items-center font-bold p-2"
					: "flex flex-row items-center font-bold p-2"
			}
		>
			<div className="w-[90%]">
				{/* <div className=className={
							isSelected
								? "border-primary-red border-t-2 border-b-2  bg-primary-red/30"
								: ""
						}> */}
				<button type="button" onClick={onClick}>
					<span>{title}</span>
				</button>

				{/* <Link
					href={`http://localhost:3000/courses/erty`}
					className={`flex flex-row justify-between font-bold p-2 ${
						currentChapter
							? "border-primary-red border-t-2 border-b-2  bg-primary-red/30"
							: ""
					} `}
					onClick={() => setCurrentChapter(!currentChapter)}
				>
					<span>{title}</span>
				</Link> */}
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
