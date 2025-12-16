import { Toast } from "radix-ui";

interface IToasterProps {
	openToast: boolean;
	setOpenToast: (open: boolean) => void;
	messageToast: string;
	bgColorToast: string;
}

export function Toaster({
	openToast,
	setOpenToast,
	messageToast,
	bgColorToast,
}: IToasterProps) {
	return (
		<Toast.Provider>
			<Toast.Root
				className="mt-2  text-white px-4 py-2 rounded shadow-lg"
				style={{
					backgroundColor: bgColorToast,
				}}
				open={openToast}
				onOpenChange={setOpenToast}
			>
				<Toast.Description>
					<p dangerouslySetInnerHTML={{ __html: messageToast }} />
				</Toast.Description>
			</Toast.Root>
			<Toast.Viewport />
		</Toast.Provider>
	);
}
