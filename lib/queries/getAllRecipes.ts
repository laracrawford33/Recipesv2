import { supabase } from '@/lib/supabase';

export type RecipeSummary = {
  id: string;
  title: string;
  category: string;
  created_at: string;
};

export async function getAllRecipes({
  search,
  category,
}: {
  search?: string;
  category?: string;
} = {}): Promise<RecipeSummary[]> {
  let query = supabase
    .from('recipes')
    .select('id, title, category, created_at')
    .order('created_at', { ascending: false });

  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching recipes:', error.message);
    return [];
  }

  return data ?? [];
}