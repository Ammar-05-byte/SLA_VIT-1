import { hasUsableDatabaseUrl, prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { getDashboardStats } from "@/lib/data";

export async function getAdminDashboardData() {
  const stats = await getDashboardStats();
  let commentCount = 0;
  let likeCount = 0;

  try {
    const supabase = await createClient();
    const [c, l] = await Promise.all([
      supabase.from("comments").select("*", { count: "exact", head: true }),
      supabase.from("likes").select("*", { count: "exact", head: true }),
    ]);
    commentCount = c.count ?? 0;
    likeCount = l.count ?? 0;
  } catch {
    /* Missing env, tables, or RLS */
  }

  let latestBlogs: Array<{ id: string; title: string; slug: string; publishedAt: Date }> = [];
  let latestMessages: Array<{ id: string; subject: string; name: string; createdAt: Date }> = [];
  /** Same source as Manage Posts (`prisma.blog`) so totals and lists never disagree. */
  let posts = stats.blogs;

  if (hasUsableDatabaseUrl()) {
    try {
      const [blogRows, messageRows, blogCount] = await Promise.all([
        prisma.blog.findMany({
          orderBy: { publishedAt: "desc" },
          take: 5,
          select: { id: true, title: true, slug: true, publishedAt: true },
        }),
        prisma.contactMessage.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          select: { id: true, subject: true, name: true, createdAt: true },
        }),
        prisma.blog.count(),
      ]);
      latestBlogs = blogRows;
      latestMessages = messageRows;
      posts = blogCount;
    } catch {
      /* prisma unavailable — keep stats.blogs from getDashboardStats */
    }
  }

  return {
    posts,
    commentCount,
    likeCount,
    stats,
    latestBlogs,
    latestMessages,
  };
}
