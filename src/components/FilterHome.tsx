interface IFilterHomeProps {
	activeFilter: "popular" | "new";
	onChange: (filter: "popular" | "new") => void;
}


export default function FilterHome({ activeFilter, onChange }: IFilterHomeProps) {
	return (
		<div>
			<nav className="flex py-10 bg-background-charte justify-center md:justify-start">
				<button
					type="button"
        	className={`px-4 py-2 font-bold rounded-l-md cursor-pointer
          ${
            activeFilter === "popular"
              ? "bg-primary-red text-background-charte"
              : "bg-secondary-red text-white"
          }`}
					onClick={() => onChange("popular")}
				>
					Populaires
				</button>
				<button
					type="button"
        	onClick={() => onChange("new")}
        	className={`px-4 py-2 font-bold rounded-r-md cursor-pointer
          ${
            activeFilter === "new"
              ? "bg-primary-red text-background-charte"
              : "bg-secondary-red text-white"
          }`}
				>
					Nouveautés
				</button>
			</nav>
		</div>
	);
}