interface CourseTools {
	duration?: string;
	level?: string;
	cost?: string;
	material?: string;
}

export default function ShowCourseTools({
	duration,
	level,
	cost,
	material,
}: CourseTools) {
	const toolList = material ? material.split(", ") : [];

	return (
		<dl className="min-h-20 w-60 md:w-full flex flex-col gap-4 p-2 border-4 rounded-md border-primary-red justify-between shadow-xl/30">
			<div className="flex flex-row gap-2">
				<dt className="font-bold capitalize">durée:</dt> <dd>{duration}</dd>
			</div>
			<div className="flex flex-row gap-2">
				<dt className="font-bold capitalize">niveau:</dt> <dd>{level}</dd>
			</div>
			<div className="flex flex-row gap-2">
				<dt className="font-bold capitalize">cout:</dt> <dd>{cost}</dd>
			</div>
			<div>
				<dt className="font-bold capitalize">outils:</dt>
				{toolList.map((item) => {
					return <dd key={item}>{item}</dd>;
				})}
			</div>
		</dl>
	);
}
