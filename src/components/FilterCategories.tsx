"use client";
import { CourseType } from "@/@types";
import { CategoryProps } from "@/@types";

type FilterCategoriesProps = {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
};

export default function FilterCategories({
  categories,
  selectedCategory,
  onSelect,
}: FilterCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center ">
      {/* Bouton "Tous" */}
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 font-bold rounded-md cursor-pointer ${
          selectedCategory === null
            ? "bg-primary-red text-background-charte" // sélectionné
            : "bg-secondary-red text-white"           // pas sélectionné
        }`}
      >
        Tous
      </button>

      {/* Boutons des catégories */}
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onSelect(category.name)}
          className={`px-4 py-2 font-bold rounded-md cursor-pointer ${
            selectedCategory === category.name
              ? "bg-primary-red text-background-charte" // sélectionné
              : "bg-secondary-red text-white"           // pas sélectionné
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
