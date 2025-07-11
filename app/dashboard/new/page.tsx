import RecipeForm from "@/app/components/RecipeForm";

export default function NewRecipePage() {
  return (
    <div className="p-8  mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
      <RecipeForm />
    </div>
  );
}
