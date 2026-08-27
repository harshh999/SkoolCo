import { createServerFn } from "@tanstack/react-start";

export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | "REEL";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

// High-quality fallback posts matching Skool Company aesthetic
const FALLBACK_POSTS: InstagramPost[] = [
  {
    id: "fallback-1",
    caption:
      "Crafting viral social campaigns and distinct brand identities. Made to stop the scroll. ⚡ #SkoolCompany #CreativeAgency #BrandIdentity",
    media_type: "IMAGE",
    media_url:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    permalink: "https://www.instagram.com/skoolcompany/",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: "fallback-2",
    caption:
      "Behind the scenes on our latest 3D motion concept. Great ideas, brewed daily. ☕🎨 #MotionDesign #3D #VisualStorytelling",
    media_type: "CAROUSEL_ALBUM",
    media_url:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    permalink: "https://www.instagram.com/skoolcompany/",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "fallback-3",
    caption:
      "Minimal aesthetic, maximal impact. Exploring raw typography and kinetic layouts. 📐✨ #DesignStudio #Typography #GraphicDesign",
    media_type: "IMAGE",
    media_url:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80",
    permalink: "https://www.instagram.com/skoolcompany/",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "fallback-4",
    caption:
      "Reel drop: Interactive canvas experiments and fluid web transitions in action. 🚀📽️ #WebDesign #CreativeCoding #UIUX",
    media_type: "REEL",
    media_url:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    thumbnail_url:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    permalink: "https://www.instagram.com/skoolcompany/",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: "fallback-5",
    caption:
      "Bold color stories and high-octane editorial visuals. Push boundaries or go home. 💥🎨 #ArtDirection #Editorial #CreativeDirection",
    media_type: "IMAGE",
    media_url:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80",
    permalink: "https://www.instagram.com/skoolcompany/",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
];

// In-memory server cache (15 minutes revalidation)
let cachedPosts: InstagramPost[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export const getInstagramPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ posts: InstagramPost[]; source: "live" | "cache" | "fallback" }> => {
    const now = Date.now();

    // Return cached posts if still fresh
    if (cachedPosts && now - lastFetchTime < CACHE_DURATION) {
      return { posts: cachedPosts, source: "cache" };
    }

    const token = process.env["INSTAGRAM_ACCESS_TOKEN"];
    const accountId = process.env["INSTAGRAM_ACCOUNT_ID"] || "me";

    if (!token) {
      console.info(
        "[Instagram Feed] INSTAGRAM_ACCESS_TOKEN not configured. Serving fallback posts.",
      );
      return { posts: FALLBACK_POSTS, source: "fallback" };
    }

    try {
      const url = `https://graph.instagram.com/v19.0/${accountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=5&access_token=${token}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[Instagram API Error]:", response.status, errorText);
        if (cachedPosts) return { posts: cachedPosts, source: "cache" };
        return { posts: FALLBACK_POSTS, source: "fallback" };
      }

      const data = (await response.json()) as { data?: InstagramPost[] };
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        const rawPosts = data.data.slice(0, 5);

        // Sort newest to oldest
        const sorted = rawPosts.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );

        cachedPosts = sorted;
        lastFetchTime = now;
        return { posts: sorted, source: "live" };
      }

      if (cachedPosts) return { posts: cachedPosts, source: "cache" };
      return { posts: FALLBACK_POSTS, source: "fallback" };
    } catch (err) {
      console.error("[Instagram Feed Exception]:", err);
      if (cachedPosts) return { posts: cachedPosts, source: "cache" };
      return { posts: FALLBACK_POSTS, source: "fallback" };
    }
  },
);
