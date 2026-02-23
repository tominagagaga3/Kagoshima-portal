import type { WpPost } from "./types";

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

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`WP fetch failed: ${res.status}`);
  return (await res.json()) as WpPost[];
}

// slugで1件
export async function fetchPostBySlug(slug: string): Promise<WpPost | null> {
  assertWp();
  const url = new URL(`${WP}/wp-json/wp/v2/posts`);
  url.searchParams.set("slug", slug);
  url.searchParams.set("_embed", "1");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`WP fetch failed: ${res.status}`);
  const arr = (await res.json()) as WpPost[];
  return arr[0] ?? null;
}

// アイキャッチURL
export function featuredImageUrl(post: WpPost, size = "medium") {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const bySize = media?.media_details?.sizes?.[size]?.source_url;
  return bySize || media?.source_url || "";
}