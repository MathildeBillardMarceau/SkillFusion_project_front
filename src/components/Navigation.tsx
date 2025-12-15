import { useAuthStore } from "@/app/store/auth";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface INavigationProps {
	setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navigation({ setOpenLogin }: INavigationProps) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);

	const [openProfil, setOpenProfil] = useState(false);

	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpenProfil(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<>
			<Link
				href="/courses"
				className="px-4 py-2 font-bold rounded-md bg-secondary-red text-background-charte cursor-pointer min-w-50 text-center"
			>
				liste des cours
			</Link>
			{isAuthenticated ? (
				<div className="relative" ref={menuRef}>
					<button
						onClick={() => {
							setOpenProfil(on => !on);
						}}
						type="button"
						className={`px-4 py-2 font-bold bg-primary-red text-background-charte cursor-pointer min-w-50 ${openProfil ? "rounded-t-md" : "rounded-md"}`}
					>
						{user.firstName}
					</button>
					{openProfil && (
						<div className="absolute w-full right-0 flex font-bold rounded-b-md bg-primary-red text-background-charte">
							<div className="flex flex-col w-full p-4 gap-2">
								<Image src="/logo/Logo.svg" alt="Login Image" width={40} height={20} className="self-center max-w-20 object-cover w-15 h-15 mb-1 rounded-full border-2 bg-background-charte border-background-charte"/>
								<Link
									href={"/dashboard"}
									className="px-4 py-2 rounded-md bg-secondary-red text-background-charte cursor-pointer text-center"
								>
									Tableau de bord
								</Link>
								<button
									type="button"
									className="px-4 py-2 rounded-md bg-secondary-red text-background-charte cursor-pointer"
									onClick={() => {
										logout();
										setOpenProfil(false);
									}}
								>
									déconnexion
								</button>
							</div>
						</div>
					)}
				</div>
			) : (
				<button
					onClick={() => {
						setOpenLogin(true);
					}}
					type="button"
					className="px-4 py-2 font-bold rounded-md bg-primary-red text-background-charte cursor-pointer min-w-50"
				>
					Se connecter
				</button>
			)}
		</>
	);
}
