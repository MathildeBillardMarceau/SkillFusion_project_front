"use client";

import MediaPreviewer from "@/components/MediaPreviewer";
import { useLazyGraphQL } from "@/hooks/useLazyGraphQL";
import { slugify } from "@/lib/helpers";
import { uploadMedia } from "@/lib/uploadMedia";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";

export default function CreateCoursePage() {
	const [title, setTitle] = useState("");
	const [fileToUpload, setFileToUpload] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	const {
		data: dataCategories,
		loading: loadingCategories,
		fetchData: fetchCategories,
	} = useLazyGraphQL();
	const { loading: loadingGQL, fetchData } = useLazyGraphQL();
	const {
		data: dataLevels,
		loading: loadingLevels,
		fetchData: fetchLevels,
	} = useLazyGraphQL();

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
	}, [fetchLevels]);

	async function handleSubmit(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) {
		setLoading(true);
		try {
			const slug = slugify(title);
			// file to upload
			let publicUrl = undefined;
			if (fileToUpload) {
				publicUrl = await uploadMedia(fileToUpload);
			}

			// mutation graphQL pour la création du cours
			fetchData({
				query: `#graphql
          mutation CreateCourse($input: CreateCourseInput!) {
            createCourse(input: $input) {
              id
              title
              slug
              categories {
                id
                name
              }
              user {
                id
                email
              }
            }
          }
        `,
				variables: {
					input: {
						title,
						slug,
						image: publicUrl,
						userId: "019b02a7-c2ef-71cd-9b81-2257a7d82d27", // TODO: récupérer le userId
						categoriesId: ["019b02a7-c32e-716f-b07a-551b6a92636c"], // TODO: faire une query des categories et les afficher dans un select
					},
				},
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="w-full max-w-7xl h-lvh bg-gray-50 m-auto p-5">
			{/* HEADER */}
			<header className="pb-10">
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
			</header>
			{/* CONTENT */}

			<div className="">
				<div className="m-auto w-full max-w-4xl ">
					<h1 className="text-2xl  ">Création d'un cours</h1>
				</div>
				<div className="border-b-2 border-gray-200 mt-3 mb-6"></div>
				<div className="m-auto w-full max-w-4xl">
					<input
						className="border border-gray-300 p-2 w-full"
						type="text"
						placeholder="titre"
						value={title}
						onChange={(e) => {
							setTitle(e.currentTarget.value);
						}}
					/>
					<div className="py-4 flex gap-4 items-center">
						<p className="py-2">Catégorie(s)</p>
						{loadingCategories && <>Loading categories...</>}
						{!loadingCategories && (
							<div className="flex gap-4 h-min">
								{dataCategories?.categories?.map((category) => {
									return (
										<div
											key={category.id}
											className="bg-gray-400 text-white  rounded-2xl pl-4 pr-2 py-1 flex"
										>
											<button
												type="button"
												onClick={() => {
													console.log("click");
												}}
												className="cursor-pointer"
											>
												{category.name}
											</button>
											<button
												type="button"
												className="cursor-pointer px-2"
												onClick={(e) => {
													e.preventDefault();
													console.log("click2");
												}}
											>
												<VscClose />
											</button>
										</div>
									);
								})}
							</div>
						)}
					</div>
					<div className="flex justify-between gap-4">
						<div className="w-full">
							<div className="border border-gray-300 p-2 w-full">
								<textarea name="" id="" placeholder="description"></textarea>
							</div>
							<div className="py-4">
								<p className="py-2">Niveau</p>
								<div className="flex gap-4 h-min">
									{dataLevels?.levels?.map((level) => {
										return (
											<button
												key={level}
												className="bg-gray-400 text-white  rounded-2xl px-4  py-1 flex h-min cursor-pointer"
												type="button"
												onClick={() => {
													console.log("click");
												}}
											>
												{level.toLowerCase()}
											</button>
										);
									})}
								</div>
							</div>
						</div>
						<div className="border border-gray-300 p-2 w-full bg-gray-100">
							<MediaPreviewer
								onFileSelected={setFileToUpload}
								allowedTypes={"image/*"}
							/>
						</div>
					</div>
					<div className="flex justify-between py-4 gap-4">
						<div className="flex w-full gap-4">
							<input
								className="border border-gray-300 p-2"
								type="text"
								placeholder="durée"
								value={title}
								onChange={(e) => {
									setTitle(e.currentTarget.value);
								}}
							/>
							<input
								className="border border-gray-300 p-2"
								type="text"
								placeholder="coût"
								value={title}
								onChange={(e) => {
									setTitle(e.currentTarget.value);
								}}
							/>
						</div>
						<input
							className="border border-gray-300 p-2 w-full"
							type="text"
							placeholder="matériel"
							value={title}
							onChange={(e) => {
								setTitle(e.currentTarget.value);
							}}
						/>
					</div>

					{loading && <p>Uploading...</p>}
					<div className="flex justify-end mt-4">
						<button
							type="button"
							onClick={handleSubmit}
							disabled={loading || loadingGQL}
							className="bg-gray-500 text-white py-2 px-4 rounded font-bold"
						>
							Enregistrer
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
