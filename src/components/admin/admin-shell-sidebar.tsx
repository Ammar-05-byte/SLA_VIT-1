"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  LogOut,
  FileText,
  MessageCircle,
  Users,
  Calendar,
  BookOpen,
  Lightbulb,
  Package,
  Inbox,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export type AdminProfile = {
  name: string;
  email: string;
  role: string;
};

const primaryNav: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  match: (pathname: string) => boolean;
}[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid, match: (p) => p === "/admin" },
  {
    href: "/admin/manage-posts",
    label: "Manage Posts",
    icon: FileText,
    match: (p) => p.startsWith("/admin/manage-posts"),
  },
  {
    href: "/admin/comments",
    label: "Comments",
    icon: MessageCircle,
    match: (p) => p.startsWith("/admin/comments"),
  },
  { href: "/admin/members", label: "Members", icon: Users, match: (p) => p.startsWith("/admin/members") },
];

const siteNav: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  match?: (pathname: string) => boolean;
}[] = [
  {
    href: "/admin/blogs",
    label: "Blogs",
    icon: FileText,
    match: (p) =>
      p === "/admin/blogs" || p.startsWith("/admin/manage-posts") || p.startsWith("/admin/new-post"),
  },
  { href: "/admin/stories", label: "Stories", icon: BookOpen },
  { href: "/admin/did-you-know", label: "Did You Know?", icon: Lightbulb },
  { href: "/admin/materials", label: "Materials", icon: Package },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/messages", label: "Inbox", icon: Inbox },
];

function formatRole(role: string) {
  if (!role) return "Admin";
  return role.charAt(0).toUpperCase() + role.slice(1).replace(/-/g, " ");
}

export function AdminShellSidebar({
  admin: serverAdmin,
  mobileOpen = false,
  onMobileClose,
}: {
  admin: AdminProfile;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [logoOk, setLogoOk] = useState(true);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside
      id="admin-sidebar-nav"
      className={cn(
        "flex h-full max-h-screen w-[min(280px,88vw)] shrink-0 flex-col bg-[#6B0F1A] text-white md:h-auto md:max-h-none md:w-[280px]",
        "fixed inset-y-0 left-0 z-50 md:static md:z-auto",
        "transition-transform duration-200 ease-out md:translate-x-0",
        mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0 md:shadow-none",
      )}
    >
      <div className="flex items-start justify-between gap-2 border-b border-white/10 p-4 sm:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#f5d78e]/80 bg-[#f5d78e]/20">
            {logoOk ? (
              <Image
                src="/sla-vit-logo.png"
                alt=""
                fill
                className="object-cover"
                sizes="48px"
                onError={() => setLogoOk(false)}
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xs font-bold text-[#f5d78e]">SLA</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-admin-serif),Georgia,serif] text-lg font-bold leading-tight">Admin Panel</p>
            <p
              className="truncate text-xs text-white/75"
              title={serverAdmin.role ? `Role: ${serverAdmin.role}` : undefined}
            >
              {formatRole(serverAdmin.role)}
            </p>
          </div>
        </div>
        {onMobileClose ? (
          <button
            type="button"
            onClick={onMobileClose}
            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/10 md:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        ) : null}
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-3">
        {primaryNav.map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => onMobileClose?.()}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-white/15 text-white" : "text-white/90 hover:bg-white/10",
              )}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-90" />
              {label}
            </Link>
          );
        })}

        <p className="mb-1 mt-6 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Site CMS</p>
        {siteNav.map(({ href, label, icon: Icon, match }) => {
          const active = match ? match(pathname) : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => onMobileClose?.()}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-colors",
                active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white/90",
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={() => void logout()}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
