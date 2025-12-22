"use client";
import Dashboard from "@/components/Dashboard";
import ProfilOnDashboard from "@/components/ProfilOnDashboard";

export default function ProfilDashboard() {
	return (
		<div>
			<main className="w-auto m-auto px-4 pb-20">
				<div className="rounded-2xl overflow-hidden max-w-7xl m-auto">
					<h1 className="text-4xl text-center p-4 font-display-title font-bold text-primary-red">
						Tableau de bord
					</h1>
					<div className="flex flex-col justify-center md:flex-row gap-2">
						<div className="w-auto md:w-1/4 rounded-l-2xl bg-secondary-text/20 rounded-r-2xl">
							<ProfilOnDashboard />
						</div>
						<div className="w-auto md:w-3/4  rounded-br-2xl rounded-r-2xl">
							<Dashboard />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
