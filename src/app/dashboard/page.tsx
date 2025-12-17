"use client";
import Dashboard from "@/components/Dashboard";
import ProfilOnDashboard from "@/components/ProfilOnDashboard";

export default function ProfilDashboard() {
	return (
		<div>
			<main className="max-w-7xl m-auto px-4">
				<div className="rounded-2xl overflow-hidden">
					<h1 className="text-4xl text-center p-4 font-display-title font-bold text-primary-red">
						Tableau de bord
					</h1>
					<div className="flex">
						<div className="w-1/4 bg-black/5 rounded-l-2xl">
							<ProfilOnDashboard />
						</div>
						<div className="w-3/4 rounded-br-2xl rounded-r-2xl">
							<Dashboard />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
