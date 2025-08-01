// lib/types/recipe-page.ts
export interface RecipePageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}
