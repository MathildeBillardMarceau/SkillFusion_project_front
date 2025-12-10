import Image from "next/image";
import { useState } from "react";

export default function MediaPreviewer({
	onFileSelected,
	allowedTypes = "image/*,video/*",
}) {
	const [fileToUpload, setFileToUpload] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		setFileToUpload(file);
		onFileSelected(file);

		// prévisualisation
		const url = URL.createObjectURL(file); // Blob
		setPreviewUrl(url);
	}

	return (
		<div>
			<input type="file" accept={allowedTypes} onChange={handleFileChange} />
			{previewUrl && fileToUpload?.type.startsWith("image/") && (
				<Image src={previewUrl} alt="" width={100} height={100} />
			)}
			{previewUrl && fileToUpload?.type.startsWith("video/") && (
				// biome-ignore lint/a11y/useMediaCaption: c'est pour l'upload, pas de besoin d'accessibilité à ce niveau
				<video src={previewUrl} width={100} height={100} />
			)}
		</div>
	);
}

/* 
<video src="/videos/hero.mp4" controls>
  <track 
    kind="descriptions" 
    src="/videos/hero-descriptions.vtt" 
    srclang="fr" 
    label="Description audio française" 
    default
  />
</video>


Fichier .vtt exemple :
```lua
WEBVTT

00:00:00.000 --> 00:00:05.000
Un personnage entre dans une pièce lumineuse et sourit.

00:00:05.000 --> 00:00:10.000
Il prend un livre sur la table et le feuillette.
```
*/
