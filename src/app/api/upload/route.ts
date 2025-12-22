import * as fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const MAX_SIZE = 50 * 1024 * 1024; // 50Mo
const MAX_SIZE_FOR_IMAGES = 5 * 1024 * 1024; // 5Mo
const MAX_SIZE_FOR_VIDEO = 50 * 1024 * 1024; // 50Mo

const ALLOWED_TYPES = [
	// images types
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/gif",
	// video types
	"video/mp4",
	"video/webm",
	"video/ogg",
];

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const file = formData.get("file") as File;

		if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });

		// vérifier le type de media
		if (!ALLOWED_TYPES.includes(file.type))
			return NextResponse.json(
				{ error: "file type not allowed" },
				{ status: 400 },
			);

		// VERSION AVEC MEMOIRE TAMPON
		// on convertit le fichier en buffer
		// const arrayBuffer = await file.arrayBuffer();

		// // vérifier le poids du media
		// if (arrayBuffer.byteLength > MAX_SIZE)
		// 	return NextResponse.json({ error: "file too large" }, { status: 400 });

		// const buffer = Buffer.from(arrayBuffer);

		// const fileName = `${Date.now()}_${file.name}`;
		// const filePath = path.join(process.cwd(), "public/uploads", fileName);

		// fs.writeFileSync(filePath, buffer);

		// VESRION AVEC STREAMING
		const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`; // on sécurise le nom du fichier avec "replace"
		const filePath = path.join(process.cwd(), "public/uploads", fileName);

		// Créer un stream d'écriture pour ne pas charger tout le fichier en mémoire
		const writable = fs.createWriteStream(filePath); // écrit les chunks directement en local
		const readable = file.stream(); // pour lire le fichier par petits chunks

		let uploadedBytes = 0;

		// Copier les chunks du ReadableStream vers le WriteStream
		for await (const chunk of readable) {
			uploadedBytes += chunk.length;

			if (uploadedBytes > MAX_SIZE_FOR_VIDEO) {
				writable.destroy();
				await fs.promises.unlink(filePath);
				return NextResponse.json({ error: "File too large" }, { status: 400 });
			}

			writable.write(chunk);
		}
		writable.end();

		const publicUrl = `/uploads/${fileName}`;

		return NextResponse.json({ url: publicUrl });
	} catch (e) {
		console.error("upload failed", e);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
