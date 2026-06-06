"use client";

import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const inputClass =
  "mt-2 h-12 rounded-xl border-neutral-300 bg-white text-neutral-900 shadow-none placeholder:text-neutral-400 focus-visible:ring-[#B91C1C]/35";

const CONFIG_ERROR =
  "Authentication is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your hosting environment.";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/sla-vit-logo.png");

  const urlError = searchParams.get("error");
  const configBanner = urlError === "config" ? CONFIG_ERROR : "";
  const [notAdminBanner, setNotAdminBanner] = useState("");

  useEffect(() => {
    if (urlError !== "not_admin") return;
    startTransition(() => setNotAdminBanner("This account is not registered as an admin."));
    try {
      const supabase = createClient();
      void supabase.auth.signOut().then(() => router.replace("/admin/login"));
    } catch {
      router.replace("/admin/login");
    }
  }, [urlError, router]);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    let supabase;
    try {
      supabase = createClient();
    } catch {
      setLoading(false);
      setError(CONFIG_ERROR);
      return;
    }

    const { data, error: signError } = await supabase.auth.signInWithPassword({ email, password });

    if (signError || !data.user) {
      setLoading(false);
      setError(signError?.message || "Invalid credentials.");
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("This account is not registered as an admin.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const banner = configBanner || notAdminBanner;

  return (
    <div className="flex min-h-[100dvh] w-full max-w-[100vw] items-center justify-center overflow-x-hidden bg-[#FFF9E6] px-4 py-10 sm:py-12 md:py-16">
      <form
        className="mx-auto w-full min-w-0 max-w-[420px] rounded-[1.5rem] bg-white px-5 py-8 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] sm:px-8 sm:py-10 md:px-10 md:py-12"
        onSubmit={(e) => {
          e.preventDefault();
          void onSubmit(new FormData(e.currentTarget));
        }}
        aria-busy={loading}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              "relative mb-7 flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#B91C1C] bg-[#FEF3C7]",
            )}
          >
            <Image
              src={logoSrc}
              alt="Spanish Literary Association"
              fill
              className={logoSrc.endsWith(".svg") ? "object-contain p-2" : "object-cover"}
              sizes="88px"
              priority
              onError={() => setLogoSrc("/sla-admin-badge.svg")}
            />
          </div>

          <h1 className="text-[1.65rem] font-bold tracking-tight text-[#B91C1C] md:text-[1.85rem] [font-family:Georgia,'Times_New_Roman',Times,serif]">
            SLA Admin
          </h1>
          <p className="mt-2 text-sm text-neutral-500">Sign in to your admin account</p>
        </div>

        <div className="mt-10 space-y-5">
          <div>
            <label htmlFor="admin-email" className="text-sm font-medium text-neutral-900">
              Email
            </label>
            <Input
              id="admin-email"
              name="email"
              type="email"
              placeholder="admin@sla.org"
              required
              autoComplete="email"
              disabled={loading}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-sm font-medium text-neutral-900">
              Password
            </label>
            <Input
              id="admin-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              disabled={loading}
              className={inputClass}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || !!configBanner}
          className="mt-8 h-12 w-full rounded-xl border-0 bg-[#B91C1C] text-base font-semibold text-white shadow-none hover:bg-[#991b1b] hover:translate-y-0 hover:shadow-none focus-visible:ring-[#B91C1C]/50"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
              Signing in
            </span>
          ) : (
            "Sign In"
          )}
        </Button>

        {loading ? (
          <div
            className="mt-4 flex items-center gap-3 rounded-xl border border-[#F4D6A2] bg-[#FFF8EA] px-4 py-3 text-left"
            role="status"
            aria-live="polite"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B91C1C]/10 text-[#B91C1C]">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900">Verifying admin access</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F4D6A2]/70">
                <div className="h-full w-1/2 animate-[login-progress_1.1s_ease-in-out_infinite] rounded-full bg-[#B91C1C]" />
              </div>
            </div>
          </div>
        ) : null}

        {banner ? <p className="mt-4 text-center text-sm text-red-600">{banner}</p> : null}
        {error ? <p className="mt-4 text-center text-sm text-red-600">{error}</p> : null}
      </form>
    </div>
  );
}
