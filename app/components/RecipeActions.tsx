"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function RecipeActions({ recipeId }: { recipeId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    await supabase.from("ingredients").delete().eq("recipe_id", recipeId);
    await supabase.from("instructions").delete().eq("recipe_id", recipeId);
    await supabase.from("recipes").delete().eq("id", recipeId);

    router.push("/dashboard");
  };

  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={() => router.push(`/dashboard/recipe/edit/${recipeId}`)}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
      >
        ✏️ Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        🗑️ Delete
      </button>
    </div>
  );
}
