"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { getAllRecipes, RecipeSummary } from "@/lib/queries/getAllRecipes";

const categories = [
  "All",
  "Dessert",
  "Dinner",
  "Snacks",
  "Breakfast",
  "Drinks",
  "Soup",
];

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getAllRecipes({ search, category });
      setRecipes(data);
    };
    fetchRecipes();
  }, [search, category]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Search</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/dashboard/recipe/${recipe.id}`}
            className="block bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="h-40 bg-sage flex items-center justify-center text-gray-600">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="h-40 w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-earthy">{recipe.title}</h3>
              <p className="text-sm text-terracotta">{recipe.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
