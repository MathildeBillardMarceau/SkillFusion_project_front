"use client";

import { useState } from "react";
import { useAuthStore } from "@/app/store/auth";

interface ILoginModalProps {
	setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginModal({
	setOpenLogin,
	setOpenRegister,
}: ILoginModalProps) {
	const login = useAuthStore((state) => state.login);

	const [email, setEmail] = useState("2john@carpenter.io"); // 2john@carpenter.io
	const [password, setPassword] = useState("Azerty123!"); // Azerty123!

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
			const result = await response.json();

			if (result.errors) {
				alert("Login failed: " + result.errors[0].message);
				return;
			}

			const { user, accessToken } = result.data.loginUser;

			if (!accessToken) {
				alert("Login failed: No token received");
				return;
			}
			login(user, accessToken);
			setOpenLogin(false);
		} catch (error) {
			console.error("Error during login:", error);
			return;
		}
	};

	return (
		<>
			<h2 className="text-white text-2xl font-bold mb-4">Connexion</h2>
			<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<div className="flex justify-center">
					<button
						type="submit"
						className="py-2 px-4 bg-secondary-red text-background-charte rounded font-bold cursor-pointer transition hover:bg-primary-red hover:brightness-130 hover:shadow-xl hover:text-white"
					>
						Se connecter
					</button>
				</div>
			</form>
			<p className="text-white mt-4 text-sm">
				Pas de compte ?{" "}
				<button
					type="button"
					className="underline cursor-pointer"
					onClick={() => {
						setOpenLogin(false);
						setOpenRegister(true);
					}}
				>
					S'inscrire
				</button>
			</p>
		</>
	);
}
