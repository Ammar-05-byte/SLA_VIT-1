import { prisma, hasUsableDatabaseUrl } from "@/lib/prisma";
import {
  mockBlogs,
  mockDidYouKnow,
  mockEvents,
  mockMaterials,
  mockStories,
  mockTeam,
} from "@/lib/mock-data";
import { makeSlug } from "@/lib/utils";

/** Shape used by `/did-you-know` (Prisma rows include extra fields; mock rows omit them). */
export type DidYouKnowListItem = {
  id: string;
  title: string;
  content: string;
  sourceUrl: string | null;
  sortOrder: number;
};

export async function getBlogs() {
  if (!hasUsableDatabaseUrl()) return mockBlogs;
  try {
    return await prisma.blog.findMany({ orderBy: { publishedAt: "desc" } });
  } catch {
    return mockBlogs;
  }
}

export async function getBlogBySlug(slug: string) {
  if (!hasUsableDatabaseUrl()) return mockBlogs.find((item) => item.slug === slug) ?? null;
  try {
    return await prisma.blog.findUnique({ where: { slug } });
  } catch {
    return mockBlogs.find((item) => item.slug === slug) ?? null;
  }
}

export async function getStories() {
  if (!hasUsableDatabaseUrl()) return mockStories;
  try {
    return await prisma.story.findMany({ orderBy: { publishedAt: "desc" } });
  } catch {
    return mockStories;
  }
}

export async function getStoryBySlug(slug: string) {
  if (!hasUsableDatabaseUrl()) return mockStories.find((item) => item.slug === slug) ?? null;
  try {
    return await prisma.story.findUnique({ where: { slug } });
  } catch {
    return mockStories.find((item) => item.slug === slug) ?? null;
  }
}

export async function getDidYouKnowItems(): Promise<DidYouKnowListItem[]> {
  if (!hasUsableDatabaseUrl()) return mockDidYouKnow;
  try {
    return await prisma.didYouKnowItem.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  } catch {
    return mockDidYouKnow;
  }
}

export async function getEvents() {
  if (!hasUsableDatabaseUrl()) return mockEvents;
  try {
    return await prisma.event.findMany({ orderBy: { startsAt: "asc" } });
  } catch {
    return mockEvents;
  }
}

export async function getMaterials() {
  if (!hasUsableDatabaseUrl()) return mockMaterials;
  try {
    return await prisma.material.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return mockMaterials;
  }
}

/**
 * Public team page: full core committee order from `mockTeam`.
 * When a DB row matches by `makeSlug(name)`, we keep its `id` (and other DB fields) but use
 * **mock `role` and `image`** so official titles and portrait paths stay in sync with `mock-data`
 * (stale CMS values like "Vice Chairperson" or wrong image paths do not override).
 * Extra DB-only members (no mock match) are appended.
 */
export async function getTeamMembers() {
  if (!hasUsableDatabaseUrl()) return mockTeam;
  try {
    const dbRows = await prisma.teamMember.findMany({ orderBy: { createdAt: "asc" } });
    const bySlug = new Map<string, (typeof dbRows)[number]>();
    for (const row of dbRows) {
      const key = makeSlug(row.name);
      if (!bySlug.has(key)) bySlug.set(key, row);
    }

    const merged = mockTeam.map((mock) => {
      const hit = bySlug.get(makeSlug(mock.name));
      if (hit) {
        bySlug.delete(makeSlug(mock.name));
        return {
          ...hit,
          role: mock.role,
          image: mock.image,
        };
      }
      return mock;
    });

    const extras = [...bySlug.values()];
    return [...merged, ...extras];
  } catch {
    return mockTeam;
  }
}

export async function getDashboardStats() {
  if (!hasUsableDatabaseUrl()) {
    return {
      blogs: mockBlogs.length,
      stories: mockStories.length,
      didYouKnow: mockDidYouKnow.length,
      events: mockEvents.length,
      materials: mockMaterials.length,
      team: mockTeam.length,
      messages: 0,
    };
  }

  /** Per-table counts so one missing/misconfigured table does not replace every stat with mock data. */
  const settled = await Promise.allSettled([
    prisma.blog.count(),
    prisma.story.count(),
    prisma.didYouKnowItem.count(),
    prisma.event.count(),
    prisma.material.count(),
    prisma.teamMember.count(),
    prisma.contactMessage.count(),
  ]);

  const num = (i: number) => (settled[i]?.status === "fulfilled" ? settled[i].value : 0);

  return {
    blogs: num(0),
    stories: num(1),
    didYouKnow: num(2),
    events: num(3),
    materials: num(4),
    team: num(5),
    messages: num(6),
  };
}
