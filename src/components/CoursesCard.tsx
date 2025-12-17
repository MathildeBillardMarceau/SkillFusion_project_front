import Image from "next/image";
import Link from "next/link";
import formatDate from "@/app/utils/date";

interface ICoursesCardProps {
	image: string;
	title: string;
	date: string;
	description: string;
	slug: string;
}

export default function Courses({
	image,
	title,
	date,
	description,
	slug,
}: ICoursesCardProps) {
	return (
		<div className="">
			{/* max-w-300 max-h-500 */}
			<div className="bg-background-charte sm:items-start w-[90vw] md:w-97 max-w-97">
				<div className=" flex flex-col border-4 rounded-md border-primary-red justify-between shadow-xl/30 min-h-90">
					<div className="w-full h-45 mb-1">
						{image && (
							<Image
								src={image}
								alt={title}
								width={400}
								height={120}
								className="object-cover w-full h-full"
							/>
						)}
					</div>
					<div className="p-2">
						<h3 className="font-display-title font-bold text-primary-text">
							{title}
						</h3>
						<h4 className="font-display-light font-light text-secondary-text">
							{formatDate(date)}
						</h4>
						<p className="font-display font-normal text-primary-text truncate">
							{description}
						</p>
					</div>
					<div className="flex justify-end m-2">
						<Link
							href={`courses/${slug}`}
							className="w-15 px-4 py-2 sticky right-0 bottom-0 rounded-md bg-secondary-red text-background-charte cursor-pointer"
						>
							Voir
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
