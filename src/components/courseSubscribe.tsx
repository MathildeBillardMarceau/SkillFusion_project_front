interface SubStatus {
	subscribed: boolean | null;
	userId?: string;
	courseId?: string;
}

export default function SubscriptionStatus({
	subscribed,
	userId,
	courseId,
}: SubStatus) {
	console.log("subscribed", subscribed);
	console.log("courseId:", courseId);
	console.log("userId:", userId);
	return (
		<button
			type="button"
			className="px-4 py-2 font-bold rounded-md bg-secondary-red text-background-charte cursor-pointer w-auto md:w-full text-center"
		>
			{subscribed === true
				? "Vous désabonner ?"
				: subscribed === false
					? "Vous abonner ?"
					: "loading"}
		</button>
	);
}
