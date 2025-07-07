'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllRecipes, RecipeSummary } from '@/lib/queries/getAllRecipes';

const categories = ['All', 'Dessert', 'Dinner', 'Snacks', 'Breakfast', 'Drinks'];

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getAllRecipes({ search, category });
      setRecipes(data);
    };
    fetchRecipes();
  }, [search, category]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">My Recipes</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {recipes.length === 0 ? (
        <p className="text-gray-500">No recipes found.</p>
      ) : (
        <ul className="space-y-2">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link
                href={`/dashboard/recipe/${recipe.id}`}
                className="text-blue-500 hover:underline"
              >
                {recipe.title}{' '}
                <span className="text-sm text-gray-500">({recipe.category})</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}