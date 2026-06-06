import Link from "next/link";
import { FileText, Heart, MessageCircle, Plus, Settings, Eye } from "lucide-react";
import { getAdminDashboardData } from "@/lib/admin-metrics";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cardSurface =
  "max-w-full rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5";

export default async function AdminOverviewPage() {
  const { posts, commentCount, likeCount, latestBlogs, latestMessages } = await getAdminDashboardData();

  const statCards = [
    {
      label: "Total posts",
      value: posts,
      sub: "Blog posts on site",
      icon: FileText,
      iconBg: "bg-red-100 text-red-800",
    },
    {
      label: "Total comments",
      value: commentCount,
      sub: "Supabase comments",
      icon: MessageCircle,
      iconBg: "bg-orange-100 text-orange-900",
    },
    {
      label: "Total likes",
      value: likeCount,
      sub: "Supabase likes",
      icon: Heart,
      iconBg: "bg-amber-100 text-amber-900",
    },
  ];

  return (
    <div className="min-w-0 text-neutral-900">
      <AdminPageHeader title="Dashboard" subtitle="Overview of site activity" />

      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.label} className={cn("flex gap-4", cardSurface)}>
            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", card.iconBg)}>
              <card.icon className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-700">{card.label}</p>
              <p className="mt-1 text-3xl font-bold tabular-nums text-neutral-900">{card.value}</p>
              <p className="mt-0.5 text-xs text-neutral-500">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <p className="text-sm font-semibold text-neutral-900">Quick actions</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            href="/admin/new-post"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-xl bg-[#6B0F1A] text-white hover:translate-y-0 hover:bg-[#5a0d16] hover:shadow-none",
            )}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
          <Link
            href="/admin/manage-posts"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-xl border-neutral-300 bg-white text-neutral-900 hover:translate-y-0 hover:bg-neutral-50",
            )}
          >
            <Settings className="mr-2 h-4 w-4 text-neutral-700" />
            Manage Posts
          </Link>
          <Link
            href="/admin/comments"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-xl border-neutral-300 bg-white text-neutral-900 hover:translate-y-0 hover:bg-neutral-50",
            )}
          >
            <Eye className="mr-2 h-4 w-4 text-neutral-700" />
            Manage Comments
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className={cn(cardSurface, "p-6")}>
          <h2 className="font-semibold text-neutral-900">Latest posts</h2>
          <ul className="mt-4 space-y-3">
            {latestBlogs.length === 0 ? (
              <li className="text-sm text-neutral-600">No posts yet.</li>
            ) : (
              latestBlogs.map((b) => (
                <li key={b.id}>
                  <Link href={`/blogs/${b.slug}`} className="text-sm font-medium text-[#6B0F1A] hover:underline">
                    {b.title}
                  </Link>
                  <p className="text-xs text-neutral-500">
                    {b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : ""}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className={cn(cardSurface, "p-6")}>
          <h2 className="font-semibold text-neutral-900">Latest messages</h2>
          <ul className="mt-4 space-y-3">
            {latestMessages.length === 0 ? (
              <li className="text-sm text-neutral-600">No messages yet.</li>
            ) : (
              latestMessages.map((m) => (
                <li key={m.id} className="text-sm">
                  <p className="font-medium text-neutral-900">{m.subject}</p>
                  <p className="text-xs text-neutral-600">{m.name}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
