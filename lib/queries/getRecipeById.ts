import { supabase } from '@/lib/supabase';

export type Ingredient = {
  id: string;
  recipe_id: string;
  quantity: string;
  measurement: string;
  name: string;
  description?: string;
};

export type Instruction = {
  id: string;
  recipe_id: string;
  step_number: number;
  text: string;
};

export type Recipe = {
  id: string;
  title: string;
  category: string;
  created_at: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
};

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (!recipe || recipeError) return null;

  const { data: ingredients = [] } = await supabase
    .from('ingredients')
    .select('*')
    .eq('recipe_id', id);

  const { data: instructions = [] } = await supabase
    .from('instructions')
    .select('*')
    .eq('recipe_id', id)
    .order('step_number');

  return {
    ...recipe,
    ingredients,
    instructions,
  };
}