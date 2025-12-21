import { fetchGraphQL } from "@/lib/fetchGQL";
import {
	mutationCreateUserSubscription,
	mutationDeleteUserSubscription,
} from "@/queries/subscriptionQueries";

interface SubStatus {
	subscribed: boolean | null;
	userId?: string;
	courseId?: string;
	setSubscribedLesson: (val: boolean) => void;
}

export default function SubscriptionStatus({
	subscribed,
	userId,
	courseId,
	setSubscribedLesson,
}: SubStatus) {
	console.log("subscribed", subscribed);
	console.log("courseId:", courseId);
	console.log("userId:", userId);

	const handleClick = async () => {
		if (!userId || !courseId) return;

		if (subscribed === true) {
			await fetchGraphQL(mutationDeleteUserSubscription, {
				userId,
				courseId,
			});
			setSubscribedLesson(false);
		} else if (subscribed === false) {
			await fetchGraphQL(mutationCreateUserSubscription, {
				input: { user: userId, course: courseId, completion: "" },
			});
			// ici je dois préciser les inputs de ma mutation (voir back, donc user course et completion)
			setSubscribedLesson(true);
		} else {
			return;
		}
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="px-4 py-2 font-bold rounded-md bg-secondary-red text-background-charte cursor-pointer w-auto md:w-full text-center"
		>
			{subscribed === true
				? "Vous suivez ce cours"
				: subscribed === false
					? "Suivre ce cours ?"
					: "loading"}
		</button>
	);
}
