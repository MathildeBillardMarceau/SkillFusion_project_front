import Image from "next/image";

export default function CoursesCard() {
  return (
    <div>
      <Image
        src=
        alt="Sample Course"
      />
      <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
      Titre
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
      Description
      </p>
    </div>
  )
}