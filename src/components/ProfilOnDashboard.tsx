"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/auth";
import Modal from "./Modal";
import UpdateModal from './modals/UpdateModal';
import DeleteModal from './modals/DeleteModal';


export default function Dashboard() {
	const router = useRouter();
	const { user, token: accessToken, isAuthenticated, updateUser, logout } = useAuthStore();


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
			<Image src="/logo/Logo.svg" alt="Login Image" width={40} height={20} className="flex flex-col self-center object-cover w-35 h-35 m-16 rounded-full border-2 bg-background-charte border-primary-red"/> 
				<div className="flex flex-row justify-between">
					<p className="self-center m-2 font-bold text-xl">{user.firstName}</p>
				</div>
     		
				<div className="flex flex-row justify-between">
		  		<p className="self-center m-2 font-bold text-xl">{user.lastName}</p>
		 		</div>
      	
				<div className="flex flex-row justify-between">
					<p className="self-center m-2 font-bold text-xl">{user.email}</p>
				</div>

				<div className="flex flex-row justify-center">
					<button type="button"
					className="text-sm underline cursor-pointer m-4"
					onClick={() => {
						setOpenUpdate(true);
					}}> Modifier </button> 
					<button type="button"
					className=" text-sm underline cursor-pointer m-4"
					onClick={() => {
					setOpenDelete(true);
					}}> Supprimer </button> 
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
