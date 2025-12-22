import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { MdModeEdit, MdRemoveRedEye } from "react-icons/md";
import { CourseType } from "@/@types";

interface ISmallCoursesCard_with_progressBarProps {
	image: string;
	title: string;
	slug: string;
	progress?: number;
	editMode?: boolean;
	published?: string | null;
}

export default function SmallCoursesCard_with_progressBar({
	image,
	title,
	slug,
	progress,
	editMode,
	published,
}: ISmallCoursesCard_with_progressBarProps) {
	// console.log("course.chapters", course?.chapters);
	return (
		<div className="w-full h-full">
			<main className="py-4">
				<div
					className={clsx(
						"bg-black/5 hover:bg-black/10 block rounded-xl p-4 shadow-xl/10 min-h-25 overflow-hidden", // flex flex-col items-center
						editMode && !published
							? "bg-[repeating-linear-gradient(125deg,transparent,transparent_10px,rgba(0,0,0,0.125)_10px,rgba(0,0,0,0.125)_20px)]"
							: "bg-black/5",
					)}
				>
					<div className="flex flex-row h-10 w-60 md:w-100 md:h-full justify-between items-center">
						<Link href={`courses/${slug}`} className="flex items-center">
							{image && (
								<Image
									src={image}
									alt={title}
									width={60}
									height={10}
									className="object-cover max-h-10 border-2 rounded-md border-primary-red md:min-w-15"
								/>
							)}
							<div className="font-display-title font-bold text-primary-text mx-3 text-left">
								{title}
							</div>
							{/* {editMode && published && "published"} */}
						</Link>
						<div className="flex flex-col h-full items-center justify-center">
							<div className="flex gap-2">
								<Link
									href={`courses/${slug}`}
									className="px-4 py-2 rounded-md text-secondary-red cursor-pointer flex items-center transition hover:bg-secondary-red hover:text-white"
									title="voir"
								>
									<MdRemoveRedEye className="text-2xl" />
								</Link>
								{editMode && (
									<Link
										href={`courses/${slug}/edit`}
										className="px-4 py-2 rounded-md text-secondary-red cursor-pointer flex items-center transition hover:bg-secondary-red hover:text-white"
										title="éditer"
									>
										<MdModeEdit className="text-2xl" />
									</Link>
								)}
							</div>
							{editMode && !published && (
								<div className="bg-amber-300 py-2 px-4 rounded-xl text-center">
									brouillon
								</div>
							)}
						</div>
					</div>
					{progress?.toString() && (
						<div className="w-2/3 bg-secondary-text rounded-full h-1.5 justify-center">
							<div
								className="bg-primary-red mt-3 h-1.5 rounded-full"
								style={{ width: `${progress}%` }}
							/>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
