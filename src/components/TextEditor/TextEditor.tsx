// import { BulletList, ListItem } from "@tiptap/extension-list";
// import { Placeholder } from "@tiptap/extensions";

import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";
import { useEffect, useState } from "react";

import "./styles.css";
import { Placeholder } from "@tiptap/extensions";
import { LuBold, LuHeading, LuItalic, LuList } from "react-icons/lu";

interface ITextEditorProps {
	contentText: string;
	setContentText: (text: string) => void;
}

export default function TextEditor({
	contentText,
	setContentText,
}: ITextEditorProps) {
	const [activeFormats, setActiveFormats] = useState({
		bold: false,
		italic: false,
		heading3: false,
		bulletList: false,
	});

	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({
				placeholder: "Écrivez votre leçon ici...",
			}),
		],
		content: contentText, //`<p>paragraphe</p><p><strong>bold</strong></p><p><em>italic</em></p><h3>Titre</h3><ul><li><p>liste</p></li><li><p>liste</p></li></ul><p></p>`,
		editorProps: {
			attributes: {
				class: "prose p-2 min-h-full",
			},
		},
		immediatelyRender: false,
	});

	useEffect(() => {
		if (!editor) return;

		const updateActiveFormats = () => {
			setActiveFormats({
				bold: editor.isActive("bold"),
				italic: editor.isActive("italic"),
				heading3: editor.isActive("heading", { level: 3 }),
				bulletList: editor.isActive("bulletList"),
			});
		};

		editor.on("selectionUpdate", updateActiveFormats);
		editor.on("transaction", updateActiveFormats); // capture changements de texte ou format

		// Initialisation
		updateActiveFormats();

		const handleUpdate = () => {
			// console.log("Texte brut:", editor.getText()); // Contenu texte
			const html = editor.getHTML();
			// console.log("HTML:", html); // contenu HTML
			setContentText(html);
		};

		editor.on("update", handleUpdate);

		return () => {
			editor.off("update", handleUpdate);
			editor.off("selectionUpdate", updateActiveFormats);
			editor.off("transaction", updateActiveFormats);
		};
	}, [editor, setContentText]);

	if (!editor) {
		return null;
	}

	return (
		<div className="h-auto min-h-full w-full rounded">
			{/* Menu */}
			<BubbleMenu editor={editor}>
				<div className="">
					<div className="flex bg-gray-20s0 p-1 rounded">
						<button
							type="button"
							className={clsx(
								activeFormats.bold
									? "bg-blue-400 text-white"
									: "bg-gray-200 text-gray-500",
								"rounded w-7 py-2 transition flex items-center justify-center cursor-pointer hover:brightness-105",
							)}
							onClick={() => editor.chain().focus().toggleBold().run()}
						>
							<LuBold />
						</button>

						<button
							type="button"
							className={clsx(
								activeFormats.italic
									? "bg-blue-400 text-white"
									: "bg-gray-200 text-gray-500",
								"rounded w-7 py-2 transition flex items-center justify-center cursor-pointer hover:brightness-105",
							)}
							onClick={() => editor.chain().focus().toggleItalic().run()}
						>
							<LuItalic />
						</button>

						<button
							type="button"
							className={clsx(
								activeFormats.heading3
									? "bg-blue-400 text-white"
									: "bg-gray-200 text-gray-500",
								"rounded w-7 py-2 transition flex items-center justify-center cursor-pointer hover:brightness-105",
							)}
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 3 }).run()
							}
						>
							<LuHeading />
						</button>

						<button
							type="button"
							className={clsx(
								activeFormats.bulletList
									? "bg-blue-400 text-white"
									: "bg-gray-200 text-gray-500",
								"rounded w-7 py-2 transition flex items-center justify-center cursor-pointer hover:brightness-105",
							)}
							onClick={() => editor.chain().focus().toggleBulletList().run()}
						>
							<LuList />
						</button>
					</div>
				</div>
			</BubbleMenu>
			{/* Editeur */}
			<EditorContent
				className="editor-content h-full min-h-35 prose prose-sm sm:prose lg:prose-lg"
				editor={editor}
			/>
		</div>
	);
}
/* 	return (
		<textarea
			className="border border-gray-300 p-2 w-1/2"
			name="contentText"
			placeholder="text"
		/>
	);
 */
