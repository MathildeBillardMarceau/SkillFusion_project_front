"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import type {
	CategoryProps,
	ICourseBySlugQuery,
	ILessonProps,
	MediaProps,
} from "@/@types";
import { useAuthStore } from "@/app/store/auth";
import { useLazyGraphQL } from "@/hooks/useLazyGraphQL";
import { slugify } from "@/lib/helpers";
import { uploadMedia } from "@/lib/uploadMedia";
import MediaPreviewer from "@/ui/MediaPreviewer";
import { SwitchButton } from "@/ui/SwitchButton";
import { Toaster } from "@/ui/Toaster";

const Lessons = dynamic(() => import("@/components/Lessons"), { ssr: false });
interface ICourseFormProps {
	mode: "create" | "edit";
	initialData?: ICourseBySlugQuery["courseBySlug"]; // TODO: définir le type correctement
}
interface ICategoriesAndLevelsDataProps {
	categories: CategoryProps[];
	levels: string[];
}

export default function CourseForm({ mode, initialData }: ICourseFormProps) {
	const router = useRouter();
	const userId = useAuthStore((state) => state.user.id);

	// ---------------- STATE ----------------
	const [lessons, setLessons] = useState<ILessonProps[]>([]);
	const [published, setPublished] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [cost, setCost] = useState("");
	const [material, setMaterial] = useState("");
	const [duration, setDuration] = useState("");
	const [level, setLevel] = useState<string | null>(null);
	const [categoriesId, setCategoriesId] = useState<string[]>([]);
	const [fileToUpload, setFileToUpload] = useState<File | null>(null);
	const [media, setMedia] = useState<MediaProps | null>(null);
	const [loading, setLoading] = useState(false);

	// if (mode === "edit") console.log("initialData dans CourseForm:", initialData);

	useEffect(() => {
		if (mode !== "edit" || !initialData) return;

		setTitle(initialData.title ?? "");
		setDescription(initialData.description ?? "");
		setDuration(initialData.duration ?? "");
		setCost(initialData.cost ?? "");
		setMaterial(initialData.material ?? "");
		setLevel(initialData.level ?? null);
		setPublished(Boolean(initialData.publishedAt));

		setCategoriesId(
			initialData.categories?.map((c: { id: string }) => c.id) ?? [],
		);
		setMedia(
			initialData.image
				? {
						id: uuid(),
						url: initialData.image,
						type: "image/png", // ou IMAGE si tu préfères
					}
				: null,
		);

		// console.log("Chapters from initialData:", initialData.chapters);
		setLessons(
			initialData.chapters?.map((chapter: any) => ({
				...chapter,
				media: chapter.media ?? null, // chapter.medias?.[0],
				isOpen: false,
			})) ?? [],
		);
	}, [mode, initialData]);

	// ---------------- GRAPHQL ----------------
	const { fetchData: fetchCourseBySlug } = useLazyGraphQL();
	const { fetchData: fetchCreateCourse, loading: loadingGQL } =
		useLazyGraphQL();

	const {
		data: dataCategoriesAndLevels,
		loading: loadingCategoriesAndLevels,
		fetchData: fetchCategoriesAndLevels,
	} = useLazyGraphQL<ICategoriesAndLevelsDataProps>();

	// ---------------- TOAST ----------------
	const [openToast, setOpenToast] = useState(false);
	const [messageToast, setMessageToast] = useState("");
	const [bgColorToast, setBgColorToast] = useState("#6a7282");

	const showToast = (msg: string, bgColor = "#6a7282") => {
		setMessageToast(msg);
		setBgColorToast(bgColor);
		setOpenToast(true);
	};

	// ---------------- EFFECTS ----------------
	useEffect(() => {
		fetchCategoriesAndLevels({
			query: `#graphql
				query CategoriesAndLevels {
					categories { id name color description }
          levels
				}
			`,
		});
	}, [fetchCategoriesAndLevels]);

	// ---------------- CREATE COURSE ----------------
	async function createCourse(formData: FormData) {
		// Required
		const title = formData.get("title")?.toString() || "";
		const slug = slugify(title);

		setLoading(true);

		if (mode === "create" || (mode === "edit" && slug !== initialData?.slug)) {
			// Vérifier si le slug existe déjà
			const slugData = await fetchCourseBySlug({
				query: `#graphql
					query CourseBySlug($slug: String!) {
						courseBySlug(slug: $slug) { id }
					}
				`,
				variables: { slug },
			});

			if (slugData?.courseBySlug) {
				// Le slug existe déjà !
				showToast("Un cours avec ce titre existe déjà", "red");
				setLoading(false);
				return;
			}
		}

		// Optionnel
		const description = formData.get("description") as string;
		const duration = formData.get("duration") as string;
		const cost = formData.get("cost") as string;
		const material = formData.get("material") as string;

		let finalMedia = media;
		let finalLessons = [...lessons];

		try {
			// image principale à uploader
			let imageUrl = undefined;
			if (fileToUpload) {
				if (fileToUpload && !media?.url?.includes(fileToUpload?.name)) {
					imageUrl = await uploadMedia(fileToUpload);
					finalMedia = {
						id: uuid(),
						url: imageUrl,
						type: fileToUpload.type, //.split("/")[0],
					};
				}
			}

			const getMediaType = (type: string) => {
				if (type.toUpperCase().startsWith("IMAGE")) return "IMAGE";
				if (type.toUpperCase().startsWith("VIDEO")) return "VIDEO";
				throw new Error(`Type de média non supporté : ${type}`);
			};

			// images des leçons à uploader
			let lessonsToSave = [...lessons];
			const uploadPromises = lessonsToSave.map(async (l) => {
				if (l?.fileToUpload && !l?.media?.url?.includes(l.fileToUpload?.name)) {
					const url = await uploadMedia(l.fileToUpload);
					l.media = {
						id: uuid(),
						url,
						type: l.fileToUpload.type, // getMediaType(l.fileToUpload.type), // l.fileToUpload.type, //.split("/")[0],
					};
				}
			});
			await Promise.all(uploadPromises);

			lessonsToSave = lessonsToSave.map(
				({ isOpen, fileToUpload, ...rest }) => ({
					...rest,
				}),
			);

			finalLessons = await [...lessonsToSave];

			// on prépare les leçons à envoyer à la bdd en formatant le media et enlevant
			// les props inutiles (id)
			const lessonsToSaveToBdd = lessonsToSave.map(
				({ id, media, ...rest }) => ({
					...rest,
					...(mode === "edit" && id && { id }),
					...(media && {
						media: (({ id: _mediaId, type, ...mediaRest }) => ({
							...mediaRest,
							type: getMediaType(type || ""),
						}))(media),
					}),
				}),
			);

			// mutation graphQL
			const mutation =
				mode === "edit"
					? `#graphql
              mutation UpdateCourse($id: UUID!, $input: UpdateCourseInput!) {
                updateCourse(id: $id, input: $input) {
                  id
                  title
                  slug
                }
              }
            `
					: `#graphql
              mutation CreateCourse($input: CreateCourseInput!) {
                createCourse(input: $input) {
                  id
                  title
                  slug
                }
              }
            `;
			const coursePayload = {
				// id,
				// title,
				// slug,
				// userId,
				image: imageUrl,
				description,
				level,
				duration,
				cost,
				material,
				categoriesId: categoriesId ?? null,
				chapters: lessonsToSaveToBdd,
				publishedAt: published ? new Date().toISOString() : null,
			};

			/* console.log("coursePayload avant mutation :", {
				...(mode === "edit" && { id: initialData?.id }),
				input: {
					...coursePayload,
					...(mode === "edit" && slug !== initialData?.slug && { slug, title }),
					...(mode === "create" && { userId, slug, title }),
				},
			}); */
			// userId  à ajouter si mode === "create"
			// id à ajouter si mode === "edit"
			const result = await fetchCreateCourse({
				query: mutation,
				variables: {
					...(mode === "edit" && { id: initialData?.id }),
					input: {
						...coursePayload,
						...(mode === "edit" &&
							slug !== initialData?.slug && { slug, title }),
						...(mode === "create" && { userId, slug, title }),
					},
				},
			});

			// console.log("Résultat de la mutation create/update :", result);

			if (result?.createCourse) {
				showToast("Le cours a bien été créé");
				router.push(`/courses/${result.createCourse.slug}/edit`);
			} else if (result?.updateCourse && mode === "edit") {
				showToast("Le cours a bien été mis à jour");
			}
		} finally {
			setMedia(finalMedia);
			setLessons(finalLessons);
			setLoading(false);
		}
	}

	const levelTranslations = {
		BEGINNER: "débutant",
		INTERMEDIATE: "intermédiaire",
		ADVANCED: "avancé",
	} as Record<string, string>;

	// ---------------- RENDER ----------------
	return (
		<div className="bg-white">
			<div className="max-w-7xl mx-auto p-5">
				<h1 className="text-2xl">
					{mode === "create" ? "Créer un cours" : "Modifier le cours"}
				</h1>
			</div>

			<form action={createCourse}>
				<div className="flex flex-col justify-end z-0 mx-4 md:mr-2 md:-mt-5 md:fixed md:right-[max(1rem,calc((100vw-80rem)/2))] ">
					<div className="bg-white shadow-md p-4 rounded border border-gray-300 flex flex-col gap-4 min-w-3xs w-full md:w-auto md:mx-0">
						<SwitchButton
							checked={published}
							setChecked={setPublished}
							textTrue="Doit être publié"
							textFalse="Reste à l'état de brouillon"
						/>
						<button
							type="submit"
							disabled={loading || loadingGQL || !title.length}
							className={clsx(
								"text-white py-2 px-4 rounded font-bold cursor-pointer transition-all hover:bg-primary-red",
								loading || loadingGQL || !title.length
									? "bg-gray-200 pointer-events-none"
									: "bg-gray-500",
							)}
						>
							Enregistrer
						</button>
					</div>
					<Toaster
						openToast={openToast}
						setOpenToast={setOpenToast}
						messageToast={messageToast}
						bgColorToast={bgColorToast}
					/>
				</div>
				<div className="m-auto w-full max-w-7xl p-5 md:pr-75">
					{/* TITLE */}
					<input
						className="border border-gray-300 p-2 w-full"
						type="text"
						placeholder="titre"
						name="title"
						value={title}
						onChange={(e) => {
							setTitle(e.currentTarget.value);
						}}
					/>
					<div className="py-4 flex gap-4 items-baseline">
						{/* CATEGORIES */}
						<p className="py-2">Catégorie(s)</p>
						{!loadingCategoriesAndLevels && (
							<div className="flex gap-4 h-min flex-wrap">
								{dataCategoriesAndLevels?.categories?.map(
									(category: { id: string; name: string }) => {
										const isSelected = categoriesId.includes(category.id);
										return (
											<button
												type="button"
												key={category.id}
												className={clsx(
													"text-white  rounded-2xl px-4 py-1 flex transition-all cursor-pointer",
													isSelected ? "bg-primary-red" : "bg-gray-400",
												)}
												onClick={() => {
													if (categoriesId.includes(category.id)) {
														setCategoriesId((prev) =>
															prev.filter((catId) => catId !== category.id),
														);
													} else {
														setCategoriesId((prev) => [...prev, category.id]);
													}
												}}
											>
												{category.name}
											</button>
										);
									},
								)}
							</div>
						)}
					</div>
					<div className="flex justify-between gap-4">
						<div className="w-full">
							{/* DESCRIPTION */}
							<textarea
								className="border border-gray-300 p-2 w-full"
								name="description"
								placeholder="description"
								// defaultValue={initialData?.description ?? ""}
								value={description}
								onChange={(e) => {
									setDescription(e.currentTarget.value);
								}}
							></textarea>
							{/* LEVELS */}
							<div className="py-4">
								<p className="py-2">Niveau</p>
								{!loadingCategoriesAndLevels && (
									<div className="flex gap-4 h-min flex-wrap">
										{dataCategoriesAndLevels?.levels?.map(
											(levelElement: string) => {
												const isSelected = level === levelElement;
												const foundKey = Object.keys(levelTranslations).find(
													(l) => l === levelElement,
												);
												const translatedLevel = foundKey
													? levelTranslations[foundKey]
													: levelElement.toLowerCase();
												return (
													<button
														key={levelElement}
														className={clsx(
															"text-white  rounded-2xl px-4  py-1 flex h-min cursor-pointer",
															isSelected ? "bg-primary-red" : "bg-gray-400",
														)}
														type="button"
														onClick={() => {
															setLevel(levelElement);
														}}
													>
														{translatedLevel}
													</button>
												);
											},
										)}
									</div>
								)}
							</div>
						</div>
						{/* UPLOAD IMAGE */}
						<div className="border border-gray-300 p-2 w-full bg-gray-100">
							<MediaPreviewer
								media={media}
								selectedFile={fileToUpload ?? null}
								onFileSelected={setFileToUpload}
								allowedTypes={"image/*"}
								maxSize={1 * 1024 * 1024} // 1Mo}
							/>
						</div>
					</div>
					{/* OPTIONNAL SETTINGS */}
					<div className="flex justify-between py-4 gap-4">
						<div className="flex w-full gap-4 flex-wrap">
							<input
								className="border border-gray-300 p-2"
								type="text"
								placeholder="durée"
								name="duration"
								// defaultValue={initialData?.duration ?? ""}
								value={duration}
								onChange={(e) => {
									setDuration(e.currentTarget.value);
								}}
							/>
							<input
								className="border border-gray-300 p-2"
								type="text"
								placeholder="coût"
								name="cost"
								// defaultValue={initialData?.cost ?? ""}
								value={cost}
								onChange={(e) => {
									setCost(e.currentTarget.value);
								}}
							/>
						</div>
						<input
							className="border border-gray-300 p-2 w-full"
							type="text"
							placeholder="matériel"
							name="material"
							// defaultValue={initialData?.material ?? ""}
							value={material}
							onChange={(e) => {
								setMaterial(e.currentTarget.value);
							}}
						/>
					</div>

					{loading && <p>Uploading...</p>}
				</div>
				<div className="bg-gray-100">
					<div className="m-auto w-full max-w-7xl p-5 md:pr-75">
						<Lessons lessons={lessons} setLessons={setLessons} />
					</div>
				</div>
			</form>
		</div>
	);
}
