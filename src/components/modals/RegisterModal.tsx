"use client";

import { useAuthStore } from "@/app/store/auth";
import { useState } from "react";

interface ILoginModalProps {
	setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterModal({ setOpenRegister }: ILoginModalProps) {
	const login = useAuthStore((state) => state.login);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
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
			const loginResponse = await fetch(
				process.env.NEXT_PUBLIC_GRAPHQL_API_URL!,
				{
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
				},
			);

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
			setOpenRegister(false);
		} catch (error) {
			console.error("Error during registration or login:", error);
			alert("Une erreur est survenue");
		}
	};
	return (
		<>
			<h2 className="text-white text-2xl font-bold mb-4">S'inscrire</h2>
			<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
				<label
					htmlFor="firstName"
					className="font-display font-normal text-background-charte"
				>
					Prénom
				</label>
				<input
					name="firstName"
					type="text"
					placeholder="Prénom"
					className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte"
					onChange={(event) => setFirstName(event.target.value)}
				/>
				<label
					htmlFor="lastName"
					className="font-display font-normal text-background-charte"
				>
					Nom
				</label>
				<input
					name="lastName"
					type="text"
					placeholder="Nom"
					className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte"
					onChange={(event) => setLastName(event.target.value)}
				/>
				<label
					htmlFor="email"
					className="font-display font-normal text-background-charte"
				>
					Adresse Mail
				</label>
				<input
					name="email"
					type="email"
					placeholder="email"
					className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte"
					onChange={(event) => setEmail(event.target.value)}
				/>
				<label
					htmlFor="password"
					className="font-display font-normal text-background-charte"
				>
					Mot de Passe
				</label>
				<input
					name="password"
					type="password"
					placeholder="mot de passe"
					className="mb-3 p-2 rounded-md border-2 border-background-charte bg-background-charte"
					onChange={(event) => setPassword(event.target.value)}
				/>
				<div className="flex justify-center">
					<button
						type="submit"
						className="py-2 px-4 bg-secondary-red text-background-charte rounded font-bold cursor-pointer transition hover:bg-primary-red hover:brightness-130 hover:shadow-xl hover:text-white"
					>
						S'inscrire
					</button>
				</div>
			</form>
		</>
	);
}
