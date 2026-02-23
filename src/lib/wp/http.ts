// src/lib/wp/http.ts
export function wpHeaders(wpBase: string) {
  return {
    Accept: "application/json",
    // Node(=Vercel)っぽいUAを避ける
    "User-Agent": "Mozilla/5.0 (compatible; VercelBuild/1.0; +https://vercel.com/)",
    // WAF対策で効くことがある
    Referer: wpBase,
  } as const;
}

export async function wpFetchJson<T>(wpBase: string, url: string): Promise<{ ok: true; data: T } | { ok: false; status: number }> {
  const res = await fetch(url, { headers: wpHeaders(wpBase) });
  if (!res.ok) return { ok: false, status: res.status };
  return { ok: true, data: (await res.json()) as T };
}