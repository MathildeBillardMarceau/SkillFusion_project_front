"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import type {
	CategoriesDataProps,
	ILessonProps,
	LevelsDataProps,
	MediaProps,
} from "@/@types";
import { useAuthStore } from "@/app/store/auth";
import MediaPreviewer from "@/components/MediaPreviewer";
import { useLazyGraphQL } from "@/hooks/useLazyGraphQL";
import { slugify } from "@/lib/helpers";
import { uploadMedia } from "@/lib/uploadMedia";

// import Lessons from "@/components/Lessons";
const Lessons = dynamic(() => import("@/components/Lessons"), { ssr: false });

export default function CreateCoursePage() {
	const [lessons, setLessons] = useState<ILessonProps[]>([
		/* {
			id: "01",
			title: "titre d'une leçon 1",
			description: "description leçon 1", // ?
			text: "<p><b>Text</b> du contenu du chapitre</p>", // ?
			media: {
				// ?
				id: "541564",
				url: "./uploads/test.png",
				type: "image",
			},
		},
		{
			id: "02",
			title: "titre d'une leçon 2",
		}, */
	]);
	const [title, setTitle] = useState("");
	const [level, setLevel] = useState<string | null>(null);
	const [categoriesId, setCategoriesId] = useState<string[]>([]);
	const [fileToUpload, setFileToUpload] = useState<File | null>(null);
	const [media, setMedia] = useState<MediaProps | null>(null);
	const [loading, setLoading] = useState(false);

	const userId = useAuthStore((state) => state.user.id);

	// useEffect(() => {
	// 	console.log("lessons", lessons);
	// }, [lessons]);

	// save the course
	const {
		data: dataCourse,
		loading: loadingGQL,
		fetchData: fetchCreateCourse,
	} = useLazyGraphQL();

	// categories
	const {
		data: dataCategories,
		loading: loadingCategories,
		fetchData: fetchCategories,
	} = useLazyGraphQL<CategoriesDataProps>();

	const {
		data: dataLevels,
		loading: loadingLevels,
		fetchData: fetchLevels,
	} = useLazyGraphQL<LevelsDataProps>();

	useEffect(() => {
		console.log("dataCourse", dataCourse);
	}, [dataCourse]);

	useEffect(() => {
		fetchCategories({
			query: `#graphql
          query Categories {
            categories {
              id
              name
              color
              description
            }
          }
        `,
		});
	}, [fetchCategories]);

	useEffect(() => {
		fetchLevels({
			query: `#graphql
          query Levels {
            levels
          }
        `,
		});

		/* 
		{levelTranslations[
															Object.keys(levelTranslations).find(
																(l) => l === levelElement,
															)
														] || levelElement.toLowerCase()} */
	}, [fetchLevels]);

	async function createCourse(formData: FormData) {
		console.log("createCourse");
		// Required
		const title = formData.get("title")?.toString() || "";
		const slug = slugify(title);

		// Optionnel
		const description = formData.get("description") as string;
		const duration = formData.get("duration") as string;
		const cost = formData.get("cost") as string;
		const material = formData.get("material") as string;

		setLoading(true);
		let finalMedia = media;
		let finalLessons = [...lessons];
		try {
			// image principale à uploader
			let publicUrl = undefined;
			if (fileToUpload) {
				if (fileToUpload && !media?.url?.includes(fileToUpload?.name)) {
					publicUrl = await uploadMedia(fileToUpload);
					finalMedia = {
						id: uuid(),
						url: publicUrl,
						type: fileToUpload.type, //.split("/")[0],
					};
				}
			}
			//////////////////////////
			//////////////////////////
			let lessonsToSave = [...lessons];
			const uploadPromises = lessonsToSave.map(async (l) => {
				if (l?.fileToUpload && !l?.media?.url?.includes(l.fileToUpload?.name)) {
					const url = await uploadMedia(l.fileToUpload);
					l.media = {
						id: uuid(),
						url,
						type: l.fileToUpload.type, //.split("/")[0],
					};
				}
			});
			await Promise.all(uploadPromises);

			lessonsToSave = lessonsToSave.map(
				({ isNew, isOpen, fileToUpload, ...rest }) => ({
					...rest,
				}),
			);

			finalLessons = await [...lessonsToSave];

			console.log("variables:", {
				input: {
					title,
					slug,
					image: publicUrl,
					description,
					level,
					duration,
					cost,
					material,
					userId,
					categoriesId,
					lessons: lessonsToSave,
				},
			});
			return;
			//////////////////////////
			//////////////////////////

			// mutation graphQL pour la création du cours
			fetchCreateCourse({
				query: `#graphql
          mutation CreateCourse($input: CreateCourseInput!) {
            createCourse(input: $input) {
              id
							title
							slug
							image
							description
							level
							duration
							cost
							material
							userId
							categoriesId
            }
          }
        `,
				variables: {
					input: {
						title,
						slug,
						image: publicUrl,
						description,
						level,
						duration,
						cost,
						material,
						userId,
						categoriesId,
					},
				},
			});
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

	return (
		<main className="w-full  h-lvh bg-white m-auto">
			<div className="">
				<div className="m-auto w-full max-w-7xl m-auto  p-5 bg-white ">
					<h1 className="text-2xl  ">Création d'un cours</h1>
				</div>
				<div className="border-b-2 border-gray-200 mt-3 mb-6"></div>
				<form action={createCourse}>
					<div className="m-auto w-full max-w-7xl p-5">
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
						<div className="py-4 flex gap-4 items-center">
							{/* CATEGORIES */}
							<p className="py-2">Catégorie(s)</p>
							{!loadingCategories && (
								<div className="flex gap-4 h-min">
									{dataCategories?.categories?.map(
										(category: { id: string; name: string }) => {
											const isSelected = categoriesId.includes(category.id);
											return (
												<button
													type="button"
													key={category.id}
													className={clsx(
														"text-white  rounded-2xl px-4 py-1 flex transition-all cursor-pointer",
														isSelected ? "bg-blue-400" : "bg-gray-400",
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
								></textarea>
								{/* LEVELS */}
								<div className="py-4">
									<p className="py-2">Niveau</p>
									{!loadingLevels && (
										<div className="flex gap-4 h-min">
											{dataLevels?.levels?.map((levelElement: string) => {
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
															isSelected ? "bg-blue-400" : "bg-gray-400",
														)}
														type="button"
														onClick={() => {
															setLevel(levelElement);
														}}
													>
														{translatedLevel}
													</button>
												);
											})}
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
							<div className="flex w-full gap-4">
								<input
									className="border border-gray-300 p-2"
									type="text"
									placeholder="durée"
									name="duration"
								/>
								<input
									className="border border-gray-300 p-2"
									type="text"
									placeholder="coût"
									name="cost"
								/>
							</div>
							<input
								className="border border-gray-300 p-2 w-full"
								type="text"
								placeholder="matériel"
								name="material"
							/>
						</div>

						{loading && <p>Uploading...</p>}
						<div className="flex justify-end mt-4">
							<button
								type="submit"
								disabled={loading || loadingGQL || !title.length}
								className={clsx(
									"text-white py-2 px-4 rounded font-bold cursor-pointer transition-all hover:bg-blue-400",
									loading || loadingGQL || !title.length
										? "bg-gray-200 pointer-events-none"
										: "bg-gray-500",
								)}
							>
								Enregistrer
							</button>
						</div>
					</div>
					<div className="bg-amber-200">
						<div className="m-auto w-full max-w-7xl p-5">
							<Lessons lessons={lessons} setLessons={setLessons} />
						</div>
					</div>
				</form>
			</div>
		</main>
	);
}
