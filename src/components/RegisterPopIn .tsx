"use client";
import { useAuthStore } from "@/app/store/auth";
import Image from "next/image";
import { useState } from "react";



interface IRegisterPopInProps {
  onClose: () => void;
  onFullClose: () => void;
}

export default function RegisterPopIn({ onClose, onFullClose }: IRegisterPopInProps) {
const login = useAuthStore((state) => state.login);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");     

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {; 
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            mutation RegisterUser($input: CreateUserInput!) {
            registerUser(input: $input) {
            id
            firstName
            lastName
            email
          }
      }

        `,
        variables: {
          input: { firstName, lastName, email, password },
        },
      }),
    });

    const result = await response.json();


    if (!response.ok) {
      alert("Erreur serveur : " + response.status);
      return;
    }

    if (result.errors) {
      alert("Erreur : " + result.errors[0].message);
      return;
    }

    if (!result.data?.registerUser) {
      alert("Erreur : utilisateur non créé");
      return;
    }

    alert("Inscription réussie !");
        const loginResponse = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation LoginUser($input: LoginUserInput!) {
            loginUser(input: $input) {
              user {
                id
                email
                firstName
                lastName
              }
              accessToken
            }
          }
        `,
        variables: { input: { email, password } },
      }),
    });

    const loginResult = await loginResponse.json();

    if (loginResult.errors) {
      alert("Login automatique échoué : " + loginResult.errors[0].message);
      return;
    }

    const { user, accessToken } = loginResult.data.loginUser;

    if (!accessToken) {
      alert("Login automatique échoué : pas de token");
      return;
    }


    login(user, accessToken);

    onFullClose();
    
  } catch (error) {
    console.error("Error during registration or login:", error);
    alert("Une erreur est survenue");
  }
};
  return(
    <div className="flex justify-center items-center z-50 fixed inset-0">
    <div className="min-h-90 h-100 w-150 md:w-100">
      <p></p>
    </div>
    <div className="min-h-110 h-140 w-70 md:w-110 flex flex-col border-4 rounded-md border-primary-red justify-between shadow-xl/30 bg-primary-red">
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
        <label className="font-display font-normal text-background-charte mb-1">Prénom</label>
        <input name="firstname" type="firstname" className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte outline-hidden" onChange={(event) => setFirstName(event.target.value)}/>
        <label className="font-display font-normal text-background-charte mb-1">Nom</label>
        <input name="lastname" type="lastname" className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte outline-hidden" onChange={(event) => setLastName(event.target.value)}/>
        <label className="font-display font-normal text-background-charte mb-1">Adresse Mail</label>
        <input name="email" type="email" className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte" onChange={(event) => setEmail(event.target.value)}/>
        <label className="font-display font-normal text-background-charte mb-1">Mot de Passe</label>
        <input name="password" type="password" className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte outline-hidden" onChange={(event) => setPassword(event.target.value)}/>
        <div className="flex justify-around">
        <button type="submit" className=" self-end w-30 px-2 border-2 rounded-md border-secondary-red bg-secondary-red text-background-charte cursor-pointer ">s'inscrire</button>
        </div>
      </form>
      </div>
    </div>
    <div className="min-h-90 h-90 w-150 md:w-100">
    </div>
    </div>
  )
}

 