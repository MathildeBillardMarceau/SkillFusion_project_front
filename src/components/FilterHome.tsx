export default function FilterHome() {
	return (
		<div>
			<nav className="flex py-10 bg-background-charte justify-center md:justify-start">
				<button
					type="button"
					className="px-4 py-2 font-bold rounded-l-md bg-primary-red text-background-charte cursor-pointer"
				>
					Populaires
				</button>
				<button
					type="button"
					className="px-4 py-2 font-bold rounded-r-md bg-secondary-red text-background-charte cursor-pointer"
				>
					Nouveautés
				</button>
			</nav>
		</div>
	);
}
