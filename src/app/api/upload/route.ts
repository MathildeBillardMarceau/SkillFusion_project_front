import { NextResponse } from "next/server";
import * as fs from "node:fs";
import path from "node:path";

const MAX_SIZE = 500 * 1024 * 1024; // 500Mo
const MAX_SIZE_FOR_IMAGES = 5 * 1024 * 1024; // 5Mo
const MAX_SIZE_FOR_VIDEO = 500 * 1024 * 1024; // 500Mo

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
	const formData = await req.formData();
	const file = formData.get("file") as File;

	if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });

	// vérifier le type de media
	if (!ALLOWED_TYPES.includes(file.type))
		return NextResponse.json(
			{ error: "file type not allowed" },
			{ status: 400 },
		);

	// on convertit le fichier en buffer
	const arrayBuffer = await file.arrayBuffer();

	// vérifier le poids du media
	if (arrayBuffer.byteLength > MAX_SIZE)
		return NextResponse.json({ error: "file too large" }, { status: 400 });

	const buffer = Buffer.from(arrayBuffer);

	const fileName = `${Date.now()}_${file.name}`;
	const filePath = path.join(process.cwd(), "public/uploads", fileName);

	fs.writeFileSync(filePath, buffer);

	const publicUrl = `/uploads/${fileName}`;

	return NextResponse.json({ url: publicUrl });
}
