export async function uploadMedia(file: File) {
	// TODO: conditionner selon le mode dev: local / prod: cloud
	return uploadLocal(file);
}

async function uploadCloud(file: File) {
	const filePath = `media/${Date.now()}_${file.name}`;

	// TODO: upload sur supabase
	const publicUrl = `/storage/public/media/${filePath}`;

	return publicUrl;
}

async function uploadLocal(file: File) {
	const body = new FormData();
	body.append("file", file);

	const res = await fetch("/api/upload", {
		method: "POST",
		body,
	});

	const data = await res.json();

	if (!res.ok) throw new Error("upload local failed");

	return data.url;
}
