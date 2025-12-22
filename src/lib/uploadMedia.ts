export async function uploadMedia(file: File) {
	if (process.env.NEXT_PUBLIC_MEDIA_PROVIDER === "supabase") {
		return uploadCloud(file);
	}

	return uploadLocal(file);
}

async function uploadCloud(file: File) {
	const body = new FormData();
	body.append("file", file);

	const res = await fetch("/api/upload/supabase", {
		method: "POST",
		body,
	});

	console.log("res", res);
	if (!res.ok) throw new Error("upload supabase failed");

	const data = await res.json();
	return data.url as string;
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
