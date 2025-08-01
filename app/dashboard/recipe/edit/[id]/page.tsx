import { getRecipeById, Recipe } from "@/lib/queries/getRecipeById";
import RecipeForm from "@/app/components/RecipeForm";
import { notFound } from "next/navigation";

interface RecipePageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function EditRecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeById(params.id);

  if (!recipe) return notFound();

  return (
    <div className="p-8 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <RecipeForm recipe={recipe} />
    </div>
  );
}
