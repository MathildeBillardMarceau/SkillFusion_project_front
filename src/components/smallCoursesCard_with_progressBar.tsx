import Image from "next/image";
import Link from "next/link";
import { MdModeEdit, MdRemoveRedEye } from "react-icons/md";

interface ISmallCoursesCard_with_progressBarProps {
	image: string;
	title: string;
	slug: string;
	progress?: number;
	editMode?: boolean;
}

export default function SmallCoursesCard_with_progressBar({
	image,
	title,
	slug,
	progress,
	editMode,
}: ISmallCoursesCard_with_progressBarProps) {
	return (
		<div className="w-full h-full">
			<main className="py-4">
				<Link
					href={`courses/${slug}`}
					className="bg-black/5 hover:bg-secondary-red/20 block rounded-xl p-4 shadow-xl/10 min-h-25"
				>
					<div className="flex flex-row h-10 w-60 md:w-100 justify-between items-center ">
						<div className="flex items-center">
							{image && (
								<Image
									src={image}
									alt={title}
									width={60}
									height={10}
									className="object-cover max-h-10 border-2 rounded-md border-primary-red"
								/>
							)}
							<div className="font-display-title font-bold text-primary-text mx-3 text-left">
								{title}
							</div>
						</div>
						<div className="flex gap-2">
							<div
								className="px-4 py-2 rounded-md text-secondary-red cursor-pointer flex items-center transition hover:bg-secondary-red hover:text-white"
								title="voir"
							>
								<MdRemoveRedEye className="text-2xl" />
							</div>
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
					</div>
					{progress?.toString() && (
						<div className="w-2/3 bg-secondary-text rounded-full h-1.5 justify-center">
							<div
								className="bg-primary-red mt-3 h-1.5 rounded-full"
								style={{ width: `${progress}%` }}
							/>
						</div>
					)}
				</Link>
			</main>
		</div>
	);
}
