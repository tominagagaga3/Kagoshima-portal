// src/lib/wp/categories.ts
import { wpFetchJson } from "./http";
import type { WpPost } from "./types";

export async function getCategoryIdBySlug(wp: string, slug: string): Promise<number | null> {
  const url = `${wp}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}&per_page=1`;

  const r = await wpFetchJson<Array<{ id: number; slug: string }>>(wp, url);
  if (!r.ok) return null;

  return r.data?.[0]?.id ?? null;
}

export async function fetchPostsByCategorySlug(wp: string, slug: string, perPage = 10) {
  const catId = await getCategoryIdBySlug(wp, slug);
  if (!catId) return [];

  const url = `${wp}/wp-json/wp/v2/posts?per_page=${perPage}&_embed=1&categories=${catId}`;

  const r = await wpFetchJson<WpPost[]>(wp, url);
  if (!r.ok) return [];
  return r.data;
}

const WP = import.meta.env.WORDPRESS_DOMAIN;

function assertWp() {
  if (!WP) throw new Error("WORDPRESS_DOMAIN is not set");
}

// 一覧（最新投稿）
export async function fetchPosts(perPage = 12): Promise<WpPost[]> {
  assertWp();
  const url = new URL(`${WP}/wp-json/wp/v2/posts`);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("_embed", "1");

  const r = await wpFetchJson<WpPost[]>(WP, url.toString());
  if (!r.ok) throw new Error(`WP fetch failed: ${r.status}`);
  return r.data;
}

// slugで1件
export async function fetchPostBySlug(slug: string): Promise<WpPost | null> {
  assertWp();
  const url = new URL(`${WP}/wp-json/wp/v2/posts`);
  url.searchParams.set("slug", slug);
  url.searchParams.set("_embed", "1");

  const r = await wpFetchJson<WpPost[]>(WP, url.toString());
  if (!r.ok) throw new Error(`WP fetch failed: ${r.status}`);

  return r.data?.[0] ?? null;
}

// アイキャッチURL
export function featuredImageUrl(post: WpPost, size = "medium") {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const bySize = media?.media_details?.sizes?.[size]?.source_url;
  return bySize || media?.source_url || "";
}