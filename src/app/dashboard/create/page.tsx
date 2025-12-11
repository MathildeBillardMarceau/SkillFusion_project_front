"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/auth";
import MediaPreviewer from "@/components/MediaPreviewer";
import { useLazyGraphQL } from "@/hooks/useLazyGraphQL";
import { slugify } from "@/lib/helpers";
import { uploadMedia } from "@/lib/uploadMedia";

export default function CreateCoursePage() {
	const [title, setTitle] = useState("");
	const [level, setLevel] = useState<string | null>(null);
	const [categoriesId, setCategoriesId] = useState<string[]>([]);
	const [fileToUpload, setFileToUpload] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	const userId = useAuthStore((state) => state.user.id);

	const {
		data: dataCategories,
		loading: loadingCategories,
		fetchData: fetchCategories,
	} = useLazyGraphQL();
	const { loading: loadingGQL, fetchData: fetchCreateCourse } =
		useLazyGraphQL();

	const {
		data: dataLevels,
		loading: loadingLevels,
		fetchData: fetchLevels,
	} = useLazyGraphQL();

	useEffect(() => {
		console.log("fetchCategories");
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
		console.log("fetchLevels");
		fetchLevels({
			query: `#graphql
          query Levels {
            levels
          }
        `,
		});
	}, [fetchLevels]);

	async function createCourse(formData: FormData) {
		console.log("createCourse");
		// Required
		const title = formData.get("title") as string;
		const slug = slugify(title);

		// Optionnel
		const description = formData.get("description") as string;
		const duration = formData.get("duration") as string;
		const cost = formData.get("cost") as string;
		const material = formData.get("material") as string;

		setLoading(true);
		try {
			// fichier à uploader
			let publicUrl = undefined;
			console.log("fileToUpload", fileToUpload);
			if (fileToUpload) {
				publicUrl = await uploadMedia(fileToUpload);
				console.log("publicUrl", publicUrl);
			}

			// mutation graphQL pour la création du cours
			fetchCreateCourse({
				query: `#graphql
          mutation CreateCourse($input: CreateCourseInput!) {
            createCourse(input: $input) {
              id
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
			setLoading(false);
		}
	}

	return (
		<main className="w-full max-w-7xl h-lvh bg-gray-50 m-auto p-5 rounded-2xl">
			{/* HEADER */}
			{/* <header className="pb-10">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Image
							src="https://placehold.co/600x400/png?text=logo"
							alt="logo"
							width={100}
							height={100}
						/>
						<p className="text-4xl">Skill Fusion</p>
					</div>
					<button
						type="button"
						className="flex items-center gap-2 cursor-pointer"
					>
						<FaUserCircle size={40} />
						<p className="font-bold">Prénom Nom</p>
					</button>
				</div>
			</header> */}
			{/* CONTENT */}
			{/* 

  --breakpoint-md: 830px;
  --color-primary-text: #3c2e2a;
  --color-secondary-text: #a78a7f;
  --color-background-charte: #f4ece2;
  --color-primary-red: #8c1c13;
  --color-secondary-red: #bf4342;
*/}
			<div className="">
				<div className="m-auto w-full max-w-4xl ">
					<h1 className="text-2xl  ">Création d'un cours</h1>
				</div>
				<div className="border-b-2 border-gray-200 mt-3 mb-6"></div>
				<form action={createCourse}>
					<div className="m-auto w-full max-w-4xl">
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
											{dataLevels?.levels?.map((levelElement) => {
												const isSelected = level === levelElement;
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
														{levelElement.toLowerCase()}
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
				</form>
			</div>
		</main>
	);
}
