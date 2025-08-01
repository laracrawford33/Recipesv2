import { supabase } from "@/lib/supabase";

export async function getAllCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("recipes") // use your actual table name
    .select("category");

  if (error) {
    console.error("Error fetching categories:", error.message || error);
    return [];
  }

  const uniqueCategories = Array.from(
    new Set(data.map((item) => item.category).filter(Boolean))
  );

  // Avoid duplicate "All"
  return uniqueCategories.includes("All")
    ? uniqueCategories
    : ["All", ...uniqueCategories];
}
