import { NextResponse } from "next/server";
import { hasUsableDatabaseUrl, prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/api-auth";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!hasUsableDatabaseUrl()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await params;
  await prisma.contactMessage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
