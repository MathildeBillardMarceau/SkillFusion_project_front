import Link from "next/link";
import { useState } from "react";

interface CourseChapterList {
	// key: string;
	id: string;
	title: string;
	isSelected: boolean;
	isValidated: boolean;
	handleCheckChapter: any;
	// ici je récupère mon bool pour savoir si ce chapitre est celui selectionné
	onClick: () => void;
	// et là la fonction du parent pour définir le chapitre selectionné
}

export default function ShowCourseChapters({
	id,
	title,
	isSelected,
	isValidated,
	handleCheckChapter,
	onClick,
}: CourseChapterList) {
	const [checkedChapter, setCheckedChapter] = useState(isValidated);
	// permet de définir les chapitres déjà cochés (mockup marche sur 1 uniquement)

	return (
		<li
			className={
				isSelected
					? "border-primary-red border-t-2 border-b-2  bg-primary-red/30 flex flex-row items-center font-bold p-2"
					: "flex flex-row items-center font-bold p-2"
			}
		>
			<div className="w-[90%]">
				<button type="button" onClick={onClick}>
					<span>{title}</span>
				</button>
			</div>
			<div className="w-[10%] flex justify-center">
				<input
					type="checkbox"
					className={`p-2 appearance-none border-primary-red w-6 h-6 border-3 rounded 
                      ${checkedChapter ? "bg-primary-red" : "border-primary-red"}`}
					checked={checkedChapter}
					onChange={() => {
						setCheckedChapter(!checkedChapter);
						handleCheckChapter(id, !checkedChapter);
					}}
				/>
			</div>
		</li>
	);
}
