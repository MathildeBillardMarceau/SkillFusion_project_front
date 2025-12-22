import Image from "next/image";
import Link from "next/link";
import { MdModeEdit, MdRemoveRedEye } from "react-icons/md";

interface ISmallCoursesCardProps {
	image: string;
	title: string;
	slug: string;
}

export default function SmallCoursesCard({
	image,
	title,
	slug,
}: ISmallCoursesCardProps) {
	return (
		<div className="max-w-30 max-h-20 ">
			<main className="py-10 px-1 sm:items-start">
				<div className="flex flex-row h-10 w-60 md:w-100 justify-between">
					{image && (
						<Image
							src={image}
							alt={title}
							width={60}
							height={10}
							className="object-cover border-2 rounded-md border-primary-red shadow-xl/30"
						/>
					)}
					<h1 className="font-display-title font-bold text-xs text-primary-text mx-3 text-left">
						{title}
					</h1>
					{/* <Link
						href={`courses/${slug}`}
						className="text-xs justify-items-end text-secondary-text"
					>
						Lien -&gt;
					</Link> */}
					<div className="flex gap-2">
						<Link
							href={`courses/${slug}`}
							className="px-4 py-2 rounded-md bg-secondary-red/80 hover:bg-secondary-red transition text-background-charte cursor-pointer flex items-center"
						>
							<MdRemoveRedEye />
						</Link>
						<Link
							href={`courses/${slug}/edit`}
							className="px-4 py-2 rounded-md bg-secondary-red/80 hover:bg-secondary-red transition text-background-charte cursor-pointer flex items-center"
						>
							<MdModeEdit />
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
