import Image from "next/image";
import { useState } from "react";

export default function  ProfilOnDashboard() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `
            mutation UpdateUser(id: UUID, $input: UpdateUserInput!) {
              updateUser(input: $input) {
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
					variables: { input: { email, firstname, lastname} },
				}),
			});
			const result = await response.json();
    } catch (error) {
			console.error("Error during update:", error);
			return;
		}
    };

  return(
    <div className="w-full">
 			<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Image src="/logo/Logo.svg" alt="Login Image" width={40} height={20} className="self-center object-cover w-35 h-35 mb-1 rounded-full border-2 bg-background-charte border-primary-red"/>
				<label
					htmlFor="email"
					className="font-display font-normal text-background-charte"
				>
					Adresse Mail
				</label>
				<input
					type="email"
					name="email"
					placeholder="email"
					className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
        <button></button>

        <label
					htmlFor="email"
					className="font-display font-normal text-background-charte"
				>
					Prénom
				</label>
				<input
					type="firstName"
					name="firstName"
					placeholder="prénom"
					className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte"
					value={firstName}
					onChange={(event) => setFirstName(event.target.value)}
				/>
        <button></button>

        <label
					htmlFor="Nom"
					className="font-display font-normal text-background-charte"
				>
					Nom
				</label>
				<input
					type="lastName"
					name="lastName"
					placeholder="nom"
					className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte"
					value={lastName}
					onChange={(event) => setLastName(event.target.value)}
				/>
        <button></button>
      </form>
    </div>
    
  )

}