"use client";
import Image from "next/image";
import { useState } from "react";
import { useAuthStore } from "@/app/store/auth";


interface ILoginPopInProps {
  onClose: () => void;
}

export default function LoginPopIn({ onClose }: ILoginPopInProps) {

  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");     

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const User = { email, password};
  
      login(email, password);

      onClose();
  };

  return(
    <div className="flex justify-center items-center z-50 fixed inset-0">
    <div className="min-h-90 h-100 w-150 md:w-100">
      <p></p>
    </div>
    <div className="min-h-90 h-90 w-60 md:w-100 flex flex-col border-4 rounded-md border-primary-red justify-between shadow-xl/30 bg-primary-red">
      <div className="flex self-end">
        <button className="m-2 cursor-pointer" onClick={onClose}>
          <p className="text-background-charte ">
          X
          </p>
        </button>
      </div>
      <div className="flex justify-center ">
      <button className="flex justify-center cursor-pointer">
      <Image src="/logo/Logo.svg" alt="Login Image" width={400} height={120} className="max-w-20 flex justify-center object-cover w-20 h-20 mb-1 rounded-full border-2 bg-background-charte border-background-charte"/>
      </button>
      </div>
      <div>
      <form className="flex flex-col m-5" onSubmit={handleSubmit}>
        <label className="font-display font-normal text-background-charte mb-1">Adresse Mail</label>
        <input name="email" type="email" className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte" onChange={(event) => setEmail(event.target.value)}/>
        <label className="font-display font-normal text-background-charte mb-1">Mot de Passe</label>
        <input name="password" type="password" className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte outline-hidden" onChange={(event) => setPassword(event.target.value)}/>
        <button type="submit" className=" self-end w-30 px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer ">Se connecter</button>
      </form>
      </div>
    </div>
    <div className="min-h-90 h-90 w-150 md:w-100">
      <p></p>
    </div>
    </div>
  )
}