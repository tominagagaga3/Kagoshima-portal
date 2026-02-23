// src/lib/wp/categories.ts
export async function getCategoryIdBySlug(wp: string, slug: string): Promise<number | null> {
  const res = await fetch(`${wp}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}&per_page=1`);
  if (!res.ok) return null;

  const cats: Array<{ id: number; slug: string }> = await res.json();
  return cats?.[0]?.id ?? null;
}

export async function fetchPostsByCategorySlug(wp: string, slug: string, perPage = 10) {
  const catId = await getCategoryIdBySlug(wp, slug);
  if (!catId) return [];

  const res = await fetch(`${wp}/wp-json/wp/v2/posts?per_page=${perPage}&_embed=1&categories=${catId}`);
  if (!res.ok) return [];

  return await res.json();
}