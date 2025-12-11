"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import Navigation from "./Navigation";

export default function Header() {
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	return (
		<header>
			{/* className="bg-white" */}
			<div className="flex flex-col justify-center items-center md:flex-row md:justify-between relative z-1 max-w-7xl m-auto py-4">
				<div className="flex cursor-pointer justify-center md:justify-start mb-10">
					<Link
						href="/"
						className="flex cursor-pointer justify-center md:justify-start"
					>
						<Image
							src="/logo/Logo.svg"
							alt="SkillFusion Logo"
							width={150}
							height={60}
							className=""
						/>
						<h1 className="flex font-display-title items-center font-bold text-4xl text-primary-red mx-2 ">
							SkillFusion
						</h1>
					</Link>
				</div>

				<div className="flex justify-center md:justify-end gap-4 ">
					<Navigation setOpenLogin={setOpenLogin} />
				</div>
			</div>
			{/* Modal */}
			<Modal open={openLogin} onClose={() => setOpenLogin(false)}>
				<LoginModal
					setOpenLogin={setOpenLogin}
					setOpenRegister={setOpenRegister}
				/>
			</Modal>
			<Modal open={openRegister} onClose={() => setOpenRegister(false)}>
				<RegisterModal setOpenRegister={setOpenRegister} />
			</Modal>
		</header>
	);
}
