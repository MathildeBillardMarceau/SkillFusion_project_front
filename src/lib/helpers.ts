export function slugify(text: string) {
	return text
		.toString()
		.normalize("NFD") // Sépare les accents (é → e + ́)
		.replace(/[\u0300-\u036f]/g, "") // Supprime les accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-") // Remplace tout ce qui n'est pas alphanumérique par -
		.replace(/^-+|-+$/g, ""); // Supprime les - au début/fin
}
