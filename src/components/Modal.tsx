"use client";

import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import Portal from "./Portal";

export default function Modal({
	open,
	onClose,
	children,
}: {
	open: boolean;
	onClose: () => void;
	children?: React.ReactNode;
}) {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	if (!open) return null;

	return (
		<Portal>
			<div className="fixed inset-0 z-99 flex justify-center items-center bg-black/30 backdrop-blur-xs transition-opacity duration-200">
				<div className="w-full md:w-md m-4 flex flex-col border-4 rounded-md border-primary-red justify-between shadow-xl/30 bg-primary-red p-4 animate-fadeIn">
					<div className="flex justify-end text-white text-2xl">
						<button type="button" onClick={onClose} className="cursor-pointer">
							<MdClose />
						</button>
					</div>
					{children}
				</div>
			</div>
		</Portal>
	);
}
