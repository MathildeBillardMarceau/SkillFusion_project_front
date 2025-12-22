import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// import { supabaseAdmin } from "@/lib/supabase/server";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function POST(req: Request) {
	const formData = await req.formData();
	const file = formData.get("file") as File;

	if (!file) {
		return NextResponse.json({ error: "No file" }, { status: 400 });
	}

	// const fileExt = file.name.split(".").pop();
	// const filePath = `media/${crypto.randomUUID()}.${fileExt}`;

	const filePath = `media/${Date.now()}_${file.name.replace(/\s+/g, "_")}`; // on sécurise le nom du fichier avec "replace"
	console.log("filePath", filePath);
	/* const { error } = await supabaseAdmin.storage
		.from("media")
		.upload(filePath, file, {
			cacheControl: "3600",
			upsert: false,
		});

	if (error) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const { data } = supabaseAdmin.storage.from("media").getPublicUrl(filePath); */

	const { error } = await supabase.storage.from("media").upload(filePath, file);

	if (error) throw error;

	const { data } = supabase.storage.from("media").getPublicUrl(filePath);

	// return data.publicUrl;

	return NextResponse.json({ url: data.publicUrl });
}
