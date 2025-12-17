"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/auth";
import Modal from "./Modal";
import DeleteModal from "./modals/DeleteModal";
import UpdateModal from "./modals/UpdateModal";

export default function Dashboard() {
	const router = useRouter();
	const {
		user,
		token: accessToken,
		isAuthenticated,
		updateUser,
		logout,
	} = useAuthStore();

	const [openUpdate, setOpenUpdate] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	useEffect(() => {
		if (!isAuthenticated) {
			setOpenDelete(false);
			setOpenUpdate(false);
			router.replace("/");
		}
	}, [isAuthenticated, router]);

	if (!user) {
		return <p>Loading...</p>;
	}

	return (
		<div className="w-full">
			<div className="flex flex-col m-8">
				<Image
					src="/logo/Logo.svg"
					alt="Login Image"
					width={40}
					height={20}
					className="flex flex-col self-center object-cover w-35 h-35 m-16 rounded-full border-2 bg-background-charte border-primary-red"
				/>
				<div className="flex flex-row justify-between">
					<p className="self-center m-2 font-bold text-xl">{user.firstName}</p>
				</div>

				<div className="flex flex-row justify-between">
					<p className="self-center m-2 font-bold text-xl">{user.lastName}</p>
				</div>

				<div className="flex flex-row justify-between">
					<p className="self-center m-2 font-bold text-xl">{user.email}</p>
				</div>

				<div className="flex flex-row justify-center p-4 gap-2">
					<button
						type="button"
						className="px-4 py-2 rounded-md font-bold cursor-pointer flex items-center bg-secondary-red text-white transition hover:bg-primary-red hover:brightness-130 hover:shadow-xl hover:text-white"
						onClick={() => {
							setOpenUpdate(true);
						}}
					>
						Modifier
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md font-bold cursor-pointer flex items-center bg-secondary-red text-white transition hover:bg-primary-red hover:brightness-130 hover:shadow-xl hover:text-white"
						onClick={() => {
							setOpenDelete(true);
						}}
					>
						Supprimer
					</button>
				</div>

				<Modal open={openUpdate} onClose={() => setOpenUpdate(false)}>
					<UpdateModal setOpenUpdate={setOpenUpdate} />
				</Modal>
				<Modal open={openDelete} onClose={() => setOpenDelete(false)}>
					<DeleteModal setOpenDelete={setOpenDelete} userId={user.id} />
				</Modal>
			</div>
		</div>
	);
}
