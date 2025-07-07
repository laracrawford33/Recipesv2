import { notFound } from 'next/navigation';
import { getRecipeById } from '@/lib/queries/getRecipeById';

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id);

  if (!recipe) return notFound();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-gray-600 mb-4">{recipe.category}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Ingredients</h2>
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((item) => (
          <li key={item.id}>
            {item.quantity} {item.measurement} {item.name}
            {item.description ? ` — ${item.description}` : ''}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Instructions</h2>
      <ol className="list-decimal list-inside space-y-2">
        {recipe.instructions.map((step) => (
          <li key={step.id}>{step.text}</li>
        ))}
      </ol>
    </div>
  );
}