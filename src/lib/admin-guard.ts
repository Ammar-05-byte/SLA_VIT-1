import { redirect } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";

export async function requireAdmin() {
  if (!hasSupabaseConfig()) {
    redirect("/admin/login?error=config");
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  const { data: admin } = await supabase.from("admins").select("id,name,email,role").eq("id", user.id).maybeSingle();
  if (!admin) {
    redirect("/admin/login?error=not_admin");
  }

  return {
    user,
    admin: {
      id: admin.id,
      name: admin.name ?? user.email ?? "Admin",
      email: admin.email ?? user.email ?? "",
      role: admin.role ?? "admin",
    },
  };
}
