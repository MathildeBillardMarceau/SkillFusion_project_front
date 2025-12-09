"use client";
import { useAuthStore } from "@/app/store/auth";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  onLoginclick: () => void;
}

export default function Header({ onLoginclick}: HeaderProps) {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  return(
    <div className="flex md:flex-row flex-col justify-center md:justify-between">
      <div className="flex cursor-pointer justify-center md:justify-start">
        <Link href="/" className="flex cursor-pointer justify-center md:justify-start">
        <Image src="/logo/Logo.svg" alt="SkillFusion Logo" width={150} height={60} className=""/>
        <h1 className="flex font-display-title items-center font-bold text-4xl text-primary-red mx-2 ">SkillFusion</h1>
        </Link>
      </div>
      <div className="flex justify-center md:justify-end ">
        <Link href="/courses">
          <button type="button" className="md:min-w-45 md:max-h-15 m-2.5 p-2.5 border-2 font-bold rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer"> listes des cours </button>
        </Link>
        { isAuthenticated ? (          
          <button onClick={onLoginclick} type="button" className="md:min-w-45 md:max-h-15 m-2.5 p-2.5 border-2 font-bold rounded-md border-primary-red bg-primary-red text-background-charte cursor-pointer"> {user.firstName} </button>
        ) :  
        <Link href="#">          
        <button onClick={onLoginclick} type="button" className="md:min-w-45 md:max-h-15 m-2.5 p-2.5 border-2 font-bold rounded-md border-primary-red bg-primary-red text-background-charte cursor-pointer"> Se connecter </button>
        </Link>
        }
      </div>
    </div>

  )
};