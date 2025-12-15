"use client";

import {
	closestCenter,
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RxDragHandleDots2 } from "react-icons/rx";
import { v4 as uuid } from "uuid";
import MediaPreviewer from "./MediaPreviewer";
import TextEditor from "./TextEditor/TextEditor";

type MediaProps = {
	id: string;
	url: string;
	type?: string;
};

interface ILessonProps {
	id: string;
	title: string;
	description?: string;
	text?: string;
	media?: MediaProps;
	fileToUpload?: File | null;
	isNew?: boolean;
	isOpen?: boolean;
}
interface ILessonsProps {
	lessons: ILessonProps[];
	setLessons: React.Dispatch<React.SetStateAction<ILessonProps[]>>;
}
/* 
Dispatch<SetStateAction<(
{ id: string; 
 title: string; 
 description: string; 
 text: string; 
 media: { id: string; url: string; type: string; }; 
 } | 
  { id: string; title: string; description?: undefined; text?: undefined; media?: undefined; })[]>>' au type 'Dispatch<SetStateAction<ILessonProps[]>>
 */
interface ISortbaleLesson {
	item: ILessonProps;
	lastCreatedLessonRef: React.RefObject<string | null>;
	setLessons: React.Dispatch<React.SetStateAction<ILessonProps[]>>;
}

export default function Lessons({ lessons, setLessons }: ILessonsProps) {
	const lastCreatedLessonRef = useRef<string | null>(null);
	const sensors = useSensors(useSensor(PointerSensor));
	const [activeLesson, setActiveLesson] = useState<ILessonProps | null>(null);

	const handleDragEnd = (e) => {
		const { active, over } = e;
		if (!over || active.id === over.id) return; // on ne drop pas sur lui même ou sur un element inexistant
		setLessons((prev) => {
			const oldIndex = prev.findIndex((l) => l.id === active.id);
			const newIndex = prev.findIndex((l) => l.id === over.id);
			return arrayMove(prev, oldIndex, newIndex);
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={(event) => {
					const id = event.active.id;
					const lesson = lessons.find((l) => l.id === id);
					setActiveLesson(lesson || null);
				}}
				onDragEnd={(e) => {
					handleDragEnd(e);
					setActiveLesson(null);
				}}
				onDragCancel={() => setActiveLesson(null)}
				// onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={lessons?.map((l) => l.id)}
					strategy={verticalListSortingStrategy}
				>
					<div className="flex flex-col gap-4">
						{lessons?.map((lesson) => (
							<SortbaleLesson
								key={lesson.id}
								item={lesson}
								lastCreatedLessonRef={lastCreatedLessonRef}
								setLessons={setLessons}
							/>
						))}
					</div>
				</SortableContext>
				{/* OVERLAY */}
				<DragOverlay>
					{activeLesson ? (
						<>
							<SortbaleLesson
								item={{ ...activeLesson, isNew: true }}
								lastCreatedLessonRef={lastCreatedLessonRef}
								setLessons={setLessons}
							/>
						</>
					) : null}
				</DragOverlay>
			</DndContext>
			<div className="flex flex-wrap">
				<button
					type="button"
					className="flex items-center gap-2 bg-gray-500 text-white px-4 pr-5 py-2 rounded-4xl cursor-pointer transition-all hover:bg-blue-400"
					onClick={() => {
						const newId = uuid();
						setLessons((prev) => [
							...prev,
							{ id: newId, title: "", isNew: true, isOpen: true },
						]);

						lastCreatedLessonRef.current = newId;
					}}
				>
					<BsFillPlusCircleFill /> Ajouter une leçon
				</button>
			</div>
		</div>
	);
}

function SortbaleLesson({
	item,
	lastCreatedLessonRef,
	setLessons,
}: ISortbaleLesson) {
	const [isOpen, setIsOpen] = useState(item.isOpen);
	// const [isOpen, setIsOpen] = useState(item.isNew);
	const [description, setDescription] = useState(item.description);
	const [fileToUpload, setFileToUpload] = useState<File | null>(
		item.fileToUpload || null,
	);
	const [title, setTitle] = useState(item.title);
	const [text, setText] = useState(item.text);
	const { id } = item;
	const {
		setNodeRef,
		listeners,
		attributes,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });
	const style = {
		opacity: isDragging ? 0.4 : 1,
		filter: isDragging ? "blur(1px)" : "none",
		// height: isDragging ? `${setNodeRef.current?.height}` : undefined,
		zIndex: isDragging ? 999 : 0,
		// transform: CSS.Transform.toString(transform),
		transform: transform
			? `translate3d(${transform.x}px, ${transform.y}px, 0)`
			: undefined,
		transition,
	};
	const inputRef = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		if (lastCreatedLessonRef.current === id) {
			inputRef.current?.focus();
			lastCreatedLessonRef.current = null;
		}
	}, [id, lastCreatedLessonRef]);

	useEffect(() => {
		setLessons((prev) =>
			prev.map((l) =>
				l.id === item.id
					? {
							...l,
							title,
							text,
							fileToUpload,
							isOpen,
							isNew: undefined,
							media: item.media,
							description,
						}
					: l,
			),
		);
	}, [
		title,
		text,
		fileToUpload,
		isOpen,
		item.id,
		description,
		item.media,
		setLessons,
	]);

	return (
		<article
			ref={setNodeRef}
			style={style}
			className="bg-white p-2 rounded-md flex text-gray-400 gap-2 items-start justify-between touch-none will-change-transform"
		>
			<div
				className={clsx(
					"flex gap-2 items-center py-2 cursor-pointer transition hover:text-blue-400",
					isOpen && "rotate-180",
				)}
			>
				<IoMdArrowDropdownCircle
					className="text-2xl"
					onClick={() => {
						setIsOpen((prev) => !prev);
					}}
				/>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<input
					ref={inputRef}
					className={clsx(
						"border p-2 transition",
						isOpen ? "border-gray-300" : "border-transparent",
					)}
					type="text"
					placeholder="titre"
					name="title"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				{isOpen && (
					<div className="flex flex-col gap-2 w-full animate-fadeInDISABLED">
						<div className="flex gap-4">
							<textarea
								className="border border-gray-300 p-2 w-1/2"
								name="description"
								placeholder="description"
								value={description}
								onChange={(e) => {
									setDescription(e.currentTarget.value);
								}}
							/>

							<div className="border border-gray-300 p-2 w-1/2 bg-gray-100 min-h-50">
								<MediaPreviewer
									media={item.media}
									selectedFile={fileToUpload}
									onFileSelected={setFileToUpload}
									allowedTypes={"image/*"}
									maxSize={1 * 1024 * 1024} // 1Mo}
								/>
							</div>
						</div>
						<div className="border border-gray-300 p-2 w-full">
							<TextEditor contentText={text} setContentText={setText} />
						</div>
					</div>
				)}
			</div>
			<div className="flex gap-2 items-center py-2">
				<FaTrash
					className="text-md cursor-pointer transition hover:text-blue-400"
					onClick={() => {
						setLessons((prev) => prev.filter((l) => l.id !== item.id));
					}}
				/>
				<button type="button" {...listeners} {...attributes}>
					<RxDragHandleDots2 className="cursor-grab active:cursor-grabbing text-2xl transition hover:text-blue-400" />
				</button>
			</div>
		</article>
	);
}
