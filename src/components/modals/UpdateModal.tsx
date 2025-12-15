"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/auth";

interface IUpdateModalProps {
	setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfilOnDashboard({
	setOpenUpdate,
}: IUpdateModalProps) {
 
  const { user, token: accessToken, isAuthenticated, updateUser } = useAuthStore();


  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated || !accessToken) {
      console.error("Not authenticated");
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_GRAPHQL_API_URL!,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            query: `
              mutation UpdateUser($id: UUID!, $input: UpdateUserInput!) {
                updateUser(id: $id, input: $input) {
                id
                email
                firstName
                lastName
                }
              }
            `,
            variables: {
              id: user.id,
              input: { email, firstName, lastName },
            },
          }),
        }
      );
      const result = await response.json();


      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      updateUser(result.data.updateUser);

      setOpenUpdate(false);
    } catch (error) {
      console.error("Error during update:", error);
    }
  };
  return(
    <div>
    	<form className="flex flex-col gap-3" onSubmit={handleSubmit}> 
				<label htmlFor="email" className="font-display font-normal text-background-charte" > Adresse Email </label> 
				<input type="text" name="email" placeholder="email" className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte" value={email} onChange={(event) => setEmail(event.target.value)} /> 



				<label htmlFor="email" className="font-display font-normal text-background-charte" > Prénom </label> 
				<input type="text" name="prénom" placeholder="prénom" className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte" value={firstName} onChange={(event) => setFirstName(event.target.value)} /> 



				<label htmlFor="Nom" className="font-display font-normal text-background-charte" > Nom </label> 
				<input type="text" name="nom" placeholder="nom" className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte" value={lastName} onChange={(event) => setLastName(event.target.value)} /> 
				
        
        <button type="submit"
					className="underline cursor-pointer"> Enregister les modifications </button> 
			</form>

    </div>
  )
}