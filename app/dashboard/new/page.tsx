'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type Ingredient = {
  quantity: string;
  measurement: string;
  name: string;
  description?: string;
};

type RecipeFormProps = {
  recipe?: {
    id: string;
    title: string;
    category: string;
    ingredients: Ingredient[];
    instructions: string[];
  };
};

export default function RecipeForm({ recipe }: RecipeFormProps) {
  const [title, setTitle] = useState(recipe?.title || '');
  const [category, setCategory] = useState(recipe?.category || '');
const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [steps, setSteps] = useState<string[]>(recipe?.instructions || ['']);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let recipeId = recipe?.id;

    if (recipeId) {
      await supabase.from('recipes').update({ title, category }).eq('id', recipeId);
      await supabase.from('ingredients').delete().eq('recipe_id', recipeId);
      await supabase.from('instructions').delete().eq('recipe_id', recipeId);
    } else {
      const { data, error } = await supabase
        .from('recipes')
        .insert({ title, category })
        .select()
        .single();
      if (error) return alert(error.message);
      recipeId = data.id;
    }

    const ingredientData = ingredients.map((ing) => ({ ...ing, recipe_id: recipeId }));
    await supabase.from('ingredients').insert(ingredientData);

    const instructionData = steps.map((text, i) => ({
      recipe_id: recipeId,
      step_number: i + 1,
      text,
    }));
    await supabase.from('instructions').insert(instructionData);

    router.push(`/dashboard/recipe/${recipeId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Category (e.g. Dessert)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <h3 className="font-semibold">Ingredients</h3>
      {ingredients.map((ing, i) => (
        <div key={i} className="grid grid-cols-4 gap-2">
          <input
            placeholder="Qty"
            value={ing.quantity}
            onChange={(e) => {
              const val = [...ingredients];
              val[i].quantity = e.target.value;
              setIngredients(val);
            }}
            className="p-2 border rounded"
          />
          <input
            placeholder="Measurement"
            value={ing.measurement}
            onChange={(e) => {
              const val = [...ingredients];
              val[i].measurement = e.target.value;
              setIngredients(val);
            }}
            className="p-2 border rounded"
          />
          <input
            placeholder="Ingredient"
            value={ing.name}
            onChange={(e) => {
              const val = [...ingredients];
              val[i].name = e.target.value;
              setIngredients(val);
            }}
            className="p-2 border rounded"
            required
          />
          <input
            placeholder="Description"
            value={ing.description}
            onChange={(e) => {
              const val = [...ingredients];
              val[i].description = e.target.value;
              setIngredients(val);
            }}
            className="p-2 border rounded"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setIngredients([...ingredients, { quantity: '', measurement: '', name: '', description: '' }])
        }
        className="text-blue-600"
      >
        ➕ Add Ingredient
      </button>

      <h3 className="font-semibold">Instructions</h3>
      {steps.map((step, i) => (
        <textarea
          key={i}
          placeholder={`Step ${i + 1}`}
          value={step}
          onChange={(e) => {
            const val = [...steps];
            val[i] = e.target.value;
            setSteps(val);
          }}
          className="w-full p-2 border rounded"
          required
        />
      ))}
      <button
        type="button"
        onClick={() => setSteps([...steps, ''])}
        className="text-blue-600"
      >
        ➕ Add Step
      </button>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {recipe ? 'Update Recipe' : 'Save Recipe'}
      </button>
    </form>
  );
}