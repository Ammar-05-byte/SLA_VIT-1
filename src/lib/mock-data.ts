export const mockBlogs = [
  {
    id: "b1",
    title: "Garcia Lorca and the Fire of Spanish Poetry",
    slug: "garcia-lorca-and-the-fire-of-spanish-poetry",
    excerpt: "A quick journey through rhythm, memory, and modern Spanish verse.",
    content:
      "Spanish literature carries intensity and musicality. This article explores how Lorca shaped modern poetic identity.",
    category: "Literature",
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    publishedAt: new Date().toISOString(),
  },
  {
    id: "b2",
    title: "How Spanish Storytelling Influences Cinema",
    slug: "how-spanish-storytelling-influences-cinema",
    excerpt: "From prose to screen: emotion, silence, and color as narrative tools.",
    content:
      "The association celebrates how literary structures move into film language across generations.",
    category: "Culture",
    coverImage:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    publishedAt: new Date().toISOString(),
  },
];

export const mockEvents = [
  {
    id: "e1",
    title: "Velada Poetica",
    description: "Open mic evening dedicated to contemporary Spanish poetry.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
    startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: "e2",
    title: "Flamenco and Literature Dialogues",
    description: "Interactive lecture on the link between oral stories and flamenco.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
];

export const mockMaterials = [
  {
    id: "m1",
    title: "Spanish Literature Starter Pack",
    description: "Curated reading list and lecture notes.",
    category: "Reading Lists",
    resourceUrl: "https://example.com/literature-pack",
    kind: "Link",
  },
  {
    id: "m2",
    title: "Grammar Notes A1-A2",
    description: "Printable notes for beginners.",
    category: "Language",
    resourceUrl: "https://example.com/grammar-notes",
    kind: "PDF",
  },
];

/**
 * Portraits live in `/public/` with these filenames (spaces / & preserved).
 * Admin DB rows should set the same `image` paths, e.g. `/President.jpg`.
 */
export const mockTeam = [
  {
    id: "t1",
    name: "Shrish Singh Sourya",
    role: "President",
    image: "/President.jpg",
    instagram: "https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA==",
    linkedin: "https://www.linkedin.com/company/sla-vit",
  },
  {
    id: "t2",
    name: "Ammar Abdullah",
    role: "Vice President",
    image: "/Vice President.jpg",
    instagram: "https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA==",
    linkedin: "https://www.linkedin.com/company/sla-vit",
  },
  {
    id: "t3",
    name: "Ramanaa B V",
    role: "Secretary General",
    image: "/Secretary General.jpg",
    instagram: "https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA==",
    linkedin: "https://www.linkedin.com/company/sla-vit",
  },
  {
    id: "t4",
    name: "Tejas Pisal",
    role: "Associate Secretary",
    image: "/Associate Secretary.jpg",
    instagram: "https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA==",
    linkedin: "https://www.linkedin.com/company/sla-vit",
  },
  {
    id: "t5",
    name: "R. Naren",
    role: "Director of Human Resources",
    image: "/Director of Human Resource.jpg",
    instagram: "https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA==",
    linkedin: "https://www.linkedin.com/company/sla-vit",
  },
  {
    id: "t6",
    name: "S. Mithal Surya",
    role: "Director of Editorial & Publications",
    image: "/Director of Editorial & Publications.jpg",
    instagram: "https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA==",
    linkedin: "https://www.linkedin.com/company/sla-vit",
  },
  {
    id: "t7",
    name: "Samridhi",
    role: "Director of Events",
    image: "/Director of Events.jpg",
    instagram: "https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA==",
    linkedin: "https://www.linkedin.com/company/sla-vit",
  },
  {
    id: "t8",
    name: "Jai Kishore",
    role: "Treasurer",
    image: "/Treasurer.jpg",
    instagram: "https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA==",
    linkedin: "https://www.linkedin.com/company/sla-vit",
  },
  {
    id: "t9",
    name: "Senthilpranav",
    role: "Director of Design",
    image: "/Director of Design.jpg",
    instagram: "https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA==",
    linkedin: "https://www.linkedin.com/company/sla-vit",
  },
  {
    id: "t10",
    name: "Misbah Waseem MI",
    role: "Director of Partnerships & Outreach",
    image: "/Director of Partnerships & Outreach.jpg",
    instagram: "https://www.instagram.com/vit_sla?igsh=MTVlaDBlcHh2aWNpZA==",
    linkedin: "https://www.linkedin.com/company/sla-vit",
  },
];

export const mockStories = [
  {
    id: "s1",
    title: "A Chapter in Motion",
    slug: "a-chapter-in-motion",
    excerpt: "Reflections on building community through language and shared stories.",
    content:
      "The Spanish Literary Association brings together readers, writers, and curious minds. This is a sample story for local preview when no database is configured.",
    coverImage:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    publishedAt: new Date().toISOString(),
  },
];

export const mockDidYouKnow = [
  {
    id: "d1",
    title: "Spanish connects 500M+ people",
    content: "Spanish is one of the most widely spoken languages for native speakers worldwide.",
    sourceUrl: "",
    sortOrder: 0,
  },
  {
    id: "d2",
    title: "The first modern novel is often traced to Spanish literature",
    content: "Don Quixote remains a cornerstone of narrative innovation in European letters.",
    sourceUrl: "",
    sortOrder: 1,
  },
];
