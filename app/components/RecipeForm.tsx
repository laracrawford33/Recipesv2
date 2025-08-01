"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";

type Ingredient = {
  quantity: string;
  measurement: string;
  name: string;
  description?: string;
};

type Instruction = {
  id: string;
  step_number: number;
  text: string;
};

type RecipeFormProps = {
  recipe?: {
    id: string;
    title: string;
    category: string;
    ingredients: Ingredient[];
    instructions: Instruction[];
    image_url?: string;
  };
};

function RecipeForm({ recipe }: RecipeFormProps) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(recipe?.title || "");
  const [category, setCategory] = useState(recipe?.category || "");
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe?.ingredients || []
  );

  const [steps, setSteps] = useState<string[]>(
    recipe?.instructions?.map((step) => step.text) || [""]
  );

  const [imageUrl, setImageUrl] = useState(recipe?.image_url || "");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let recipeId = recipe?.id;

      if (recipeId) {
        await supabase
          .from("recipes")
          .update({ title, category, image_url: imageUrl })
          .eq("id", recipeId);
        await supabase.from("ingredients").delete().eq("recipe_id", recipeId);
        await supabase.from("instructions").delete().eq("recipe_id", recipeId);
      } else {
        const { data, error } = await supabase
          .from("recipes")
          .insert({ title, category, image_url: imageUrl })
          .select()
          .single();
        if (error) throw error;
        recipeId = data.id;
      }

      const ingredientData = ingredients.map((ing) => ({
        ...ing,
        recipe_id: recipeId,
      }));
      await supabase.from("ingredients").insert(ingredientData);

      const instructionData = steps.map((text, i) => ({
        recipe_id: recipeId,
        step_number: i + 1,
        text,
      }));
      await supabase.from("instructions").insert(instructionData);

      router.push(`/dashboard/recipe/${recipeId}`);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
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

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <h3 className="font-semibold">Ingredients</h3>
      {ingredients.map((ing, i) => (
        <div
          key={i}
          className="grid grid-cols-1 sm:[grid-template-columns:auto_1fr_1fr_1fr_1fr] gap-2 items-center"
        >
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
          <button
            type="button"
            onClick={() => {
              const updated = ingredients.filter((_, index) => index !== i);
              setIngredients(updated);
            }}
            className="bg-rose-800 text-white rounded items-center py-1 px-2 text-sm  w-auto justify-self-end"
          >
            <FiX />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setIngredients([
            ...ingredients,
            { quantity: "", measurement: "", name: "", description: "" },
          ])
        }
        className="bg-sky-800 text-white rounded flex flex-row gap-2 items-center py-1 px-2 text-sm"
      >
        <FiPlus />
        Add Ingredient
      </button>

      <h3 className="font-semibold">Instructions</h3>
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-2 items-center">
          <textarea
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
          <button
            type="button"
            onClick={() => {
              const updated = steps.filter((_, index) => index !== i);
              setSteps(updated);
            }}
            className="bg-rose-800 text-white rounded flex flex-row gap-2 items-center py-1 px-2 text-sm"
          >
            <FiX />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setSteps([...steps, ""])}
        className="bg-sky-800 text-white rounded flex flex-row gap-2 items-center py-1 px-2 text-sm"
      >
        <FiPlus />
        Add Step
      </button>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white transition ${
            loading
              ? "bg-teal-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {loading ? "Saving..." : recipe ? "Update Recipe" : "Save Recipe"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
