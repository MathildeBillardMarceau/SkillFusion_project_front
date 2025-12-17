import Image from "next/image";
import { useState } from "react";
import { uploadMedia } from "@/lib/uploadMedia";

export default function MediaUploader({
	onUploaded,
}: {
	onUploaded: (url: string) => void;
}) {
	const [loading, setLoading] = useState(false);
	const [url, setUrl] = useState<string | null>(null);

	async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		setLoading(true);
		try {
			const publicUrl = await uploadMedia(file);
			console.log("publicUrl:", publicUrl);
			setUrl(publicUrl);
			onUploaded(publicUrl);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<input type="file" accept="image/*,video/*" onChange={handleFileChange} />
			{loading && <p>Uploading...</p>}
			{url && (
				<>
					<p>Upload success!</p>
					<Image src={url} alt="" width={100} height={100} />
				</>
			)}
		</div>
	);
}
