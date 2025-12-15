"use client";

import Image from "next/image";
import { useState} from "react";
import { useAuthStore } from "@/app/store/auth";
import Modal from "./Modal";
import UpdateModal from './modals/UpdateModal';


export default function Dashboard() {
 
	const { user, token: accessToken, isAuthenticated } = useAuthStore();
	const [openUpdate, setOpenUpdate] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  
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
					<button type="button"
					className=" text-sm underline cursor-pointer"
					onClick={() => {
						setOpenUpdate(false);
						setOpenUpdate(true);
					}}> Modifier </button> 
					
					<Modal open={openUpdate} onClose={() => setOpenUpdate(false)}>
						<UpdateModal setOpenUpdate={setOpenUpdate} />
					</Modal>
			</div>
    </div>
  );
}
