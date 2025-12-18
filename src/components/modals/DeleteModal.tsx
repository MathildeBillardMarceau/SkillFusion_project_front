"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/app/store/auth";

interface IDeleteModalProps {
  setOpenDelete: (open: boolean) => void;
  userId: string;
}

export default function DeleteProfil({setOpenDelete,}: IDeleteModalProps) {
  const router = useRouter();

 	const isAuthenticated = useAuthStore((state) => Boolean(state.accessToken));

  const { user, accessToken, logout } = useAuthStore();

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated || !accessToken || !user?.id) {
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
              mutation DeleteUser($id: UUID!) {
              deleteUser(id: $id)
              }
              `,
            variables: {
              id: user.id,
            },
          }),
        }
      );
      const result = await response.json();

      router.push("/");
      logout();

    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };
  return(
    <div className="flex flex-col justify-center">
        <h1 className="text-center text-background-charte font-bold text-2xl m-4
        ">Êtes-vous sûr de vouloir supprimer votre compte ?</h1>
          
          <div>
          <form onClick={handleDelete} className="flex flex-row justify-center">
            <button type="submit"
              className="underline cursor-pointer text-background-charte m-4"> confirmer la suppression
            </button> 
            <button type="button" onClick={() => setOpenDelete(false)} className="underline cursor-pointer font-bold text-background-charte m-4">
              Annuler
            </button>

          </form>

          </div>



    </div>
  )
}