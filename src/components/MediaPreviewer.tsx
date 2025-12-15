"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";
import type { MediaPreviewerProps } from "@/@types";

export default function MediaPreviewer({
	media,
	selectedFile,
	onFileSelected,
	allowedTypes = "image/*,video/*",
	maxSize = 500 * 1024 * 1024, // 500Mo
}: MediaPreviewerProps) {
	const [fileToUpload, setFileToUpload] = useState<File | null>(selectedFile);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!selectedFile) {
			setPreviewUrl(null);
			return;
		}
		const url = URL.createObjectURL(selectedFile);
		setPreviewUrl(url);
		return () => URL.revokeObjectURL(url);
	}, [selectedFile]);

	async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		// vérifier la taille max
		if (file.size > maxSize) {
			setError(
				`le fichier dépasse la taille maximale autorisée (${(maxSize / (1024 * 1024)).toFixed(0)} Mo)`,
			);
			e.currentTarget.value = "";
			setFileToUpload(null);
			setPreviewUrl(null);
			return;
		}
		setError("");

		setFileToUpload(file);
		onFileSelected(file);

		// prévisualisation
		const url = URL.createObjectURL(file); // Blob
		setPreviewUrl(url);
	}

	return (
		<div className="relative w-full h-full  flex items-center justify-center">
			{error && <p className="text-red-950">{error}</p>}
			<LuUpload className="absolute text-gray-400 text-7xl" />
			{previewUrl && fileToUpload?.type.startsWith("image/") && (
				<Image
					src={previewUrl}
					alt=""
					width={100}
					height={100}
					className="h-full w-auto"
				/>
			)}
			{media?.type?.startsWith("image/") && !previewUrl && (
				<Image
					src={media.url}
					alt=""
					width={100}
					height={100}
					className="h-full w-auto"
				/>
			)}
			{media?.type?.startsWith("video/") && !previewUrl && (
				// biome-ignore lint/a11y/useMediaCaption: c'est pour l'upload, pas de besoin d'accessibilité à ce niveau
				<video
					src={media.url}
					width={100}
					height={100}
					className="h-full w-auto"
				/>
			)}
			{previewUrl && fileToUpload?.type.startsWith("video/") && (
				// biome-ignore lint/a11y/useMediaCaption: c'est pour l'upload, pas de besoin d'accessibilité à ce niveau
				<video
					src={previewUrl}
					width={100}
					height={100}
					className="h-full w-auto"
				/>
			)}
			<input
				type="file"
				accept={allowedTypes}
				onChange={handleFileChange}
				className="absolute bottom-0  h-full w-full opacity-0"
			/>
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
