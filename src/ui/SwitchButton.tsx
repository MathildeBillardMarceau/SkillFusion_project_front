import { Switch } from "radix-ui";

export function SwitchButton({
	checked,
	setChecked,
	textTrue,
	textFalse,
}: {
	checked: boolean;
	setChecked: (value: boolean) => void;
	textTrue: string;
	textFalse: string;
}) {
	return (
		<div className="flex items-center gap-3 w-full">
			<Switch.Root
				className="cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full bg-gray-500 transition-colors data-[state=checked]:bg-primary-red"
				checked={checked}
				onCheckedChange={setChecked}
				id="status"
			>
				<Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-5" />
			</Switch.Root>
			<label htmlFor="status" className="text-sm font-medium cursor-pointer">
				{checked ? textTrue : textFalse}
			</label>
		</div>
	);
}
