export type WpRendered = { rendered: string };

export type WpFeaturedMedia = {
  source_url?: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, { source_url: string }>;
  };
};

export type WpPost = {
  id: number;
  slug: string;
  modified: string;
  date: string;
  status: string;
  title: WpRendered;
  content: WpRendered;
  excerpt?: WpRendered;
  _embedded?: {
    "wp:featuredmedia"?: WpFeaturedMedia[];
  };
  meta?: Record<string, any>;

};

