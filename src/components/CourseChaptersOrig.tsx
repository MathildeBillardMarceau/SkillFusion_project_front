import Link from "next/link";
import { useState } from "react";

interface CourseChapterList {
	key: string;
	title: string;
}

export default function ShowCourseChapters(title): CourseChapterList {
	const [checkedChapter, setCheckedChapter] = useState(false);
	// permet de définir les chapitres déjà cochés (mockup marche sur 1 uniquement)
	const [currentChapter, setCurrentChapter] = useState(false);
	// permet d'afficher le chapitre en cours (mockup marche sur 3 uniquement)

	return (
		<ul className="min-h-20 w-60 md:w-full flex flex-col gap-4 border-4 rounded-md border-primary-red shadow-xl/30">
			{/* la classe du ul est la même que la classe du div ci-dessous */}
			{/* les li vont être gérénées automatiquement */}
			<li className="flex flex-row justify-between font-bold p-2">
				Etape 1{" "}
				<input
					type="checkbox"
					className={`appearance-none border-primary-red w-6 h-6 border-3 rounded 
                      ${checkedChapter ? "bg-primary-red" : "border-primary-red"}`}
					checked={checkedChapter}
					onChange={() => setCheckedChapter(!checkedChapter)}
				/>
			</li>
			<li className="flex flex-row justify-between font-bold p-2">
				Etape 2{" "}
				<input
					type="checkbox"
					className="appearance-none border-primary-red w-6 h-6 border-3 rounded"
				/>
			</li>
			<li>
				<Link
					href={`http://localhost:3000/courses/erty`}
					className={`flex flex-row justify-between font-bold p-2 ${
						currentChapter
							? "border-primary-red border-t-2 border-b-2  bg-primary-red/30"
							: ""
					} `}
					onClick={() => setCurrentChapter(!currentChapter)}
				>
					{" "}
					<span>Etape 3</span>
					<input
						type="checkbox"
						className="appearance-none border-primary-red w-6 h-6 border-3 rounded"
					/>
				</Link>
			</li>
			<li className="flex flex-row justify-between p-2">
				Etape 1{" "}
				<input
					type="checkbox"
					className="appearance-none border-primary-red w-6 h-6 border-3 rounded"
				/>
			</li>
			<li className="flex flex-row justify-between p-2">
				Etape 2{" "}
				<input
					type="checkbox"
					className="appearance-none border-primary-red w-6 h-6 border-3 rounded"
				/>
			</li>
			<li className="flex flex-row justify-between p-2">
				Etape 3{" "}
				<input
					type="checkbox"
					className="appearance-none border-primary-red w-6 h-6 border-3 rounded"
				/>
			</li>
		</ul>
	);
}
