"use client";
import { useAuthStore } from "@/app/store/auth";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface IProfilPopInProps {
  onClose: () => void;
}

export default function ProfilPopIn({ onClose }: IProfilPopInProps) {

  const logout = useAuthStore((state) => state.logout);

  const [showProfile, setShowProfile] = useState(true);

  return (
        <div className="flex justify-center items-center z-50 fixed inset-0">
 
        <div className="flex justify-center h-60 w-45 md:min-w-25 md:max-h-70 m-2.5 p-2.5 border-2 font-bold rounded-md border-primary-red bg-primary-red text-background-charte cursor-pointer">
          <div className="flex flex-col justify-center items-center">
          <button className="cursor-pointer">
          <Image src="/logo/Logo.svg" alt="Login Image" width={400} height={120} className=" max-w-20 object-cover w-20 h-20 mb-1 rounded-full border-2 bg-background-charte border-background-charte"/>
          </button>
          <div className="flex flex-col justify-center">
          <Link href="/dashboard">
            <button type="button" className=" self-end w-40 mt-1 px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer " onClick={()=> setShowProfile(true)}>Tableau de bord</button>
          </Link>
            <button type="button" className=" self-end w-40 mt-1 px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer " onClick={() => {
              logout();
              onClose()
            }}>déconnexion</button>
          <div className="flex justify-center">
            <button className="m-2 cursor-pointer" onClick={onClose}>
              <p className="text-background-charte ">
              X
              </p>
            </button>
          </div>
          </div>
            </div>
        </div>
        </div>
  )
};