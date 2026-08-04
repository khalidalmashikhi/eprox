"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Languages } from "lucide-react";
import type { Dictionary } from "@/content";
import { navRoutes, localePath, type Locale } from "@/config/site";

interface NavbarProps {
  dict: Dictionary;
  locale: Locale;
}

export function Navbar({ dict, locale }: NavbarProps) {
  const t = dict.nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();
  const other: Locale = locale === "ar" ? "en" : "ar";

  // Current route segment relative to the locale root ("" = home).
  const seg = pathname.replace(/^\/(ar|en)/, "").replace(/^\//, "").split("/")[0] || "";
  const contactHref = localePath(locale, "contact");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock + Escape handling while mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const switchLanguage = useCallback(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const base = pathname.replace(/^\/(ar|en)/, `/${other}`);
    router.push(`${base}${hash}`);
  }, [pathname, other, router]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-white/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="container-x flex items-center justify-between"
          style={{ height: "var(--nav-h)" }}
          aria-label="Primary"
        >
          {/* logo */}
          <Link
            href={localePath(locale)}
            className="group flex shrink-0 items-center"
            aria-label="EPROX — home"
          >
            <Image
              src="/brand/eprox-logo.png"
              alt="EPROX"
              width={364}
              height={152}
              priority
              className="h-auto w-[140px] object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:w-[156px] lg:w-[182px]"
            />
          </Link>

          {/* desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navRoutes.map(({ seg: s, key }) => {
              const isActive = s === seg;
              return (
                <li key={key}>
                  <Link
                    href={localePath(locale, s || undefined)}
                    className={`relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${
                      isActive ? "text-text" : "text-muted hover:text-text"
                    }`}
                  >
                    {t[key]}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={switchLanguage}
              className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-2 text-[0.82rem] font-medium text-text transition-colors hover:border-[var(--border-strong)] sm:inline-flex"
              aria-label={`${t.switchTo}`}
            >
              <Languages className="h-4 w-4" strokeWidth={1.7} />
              {t.switchTo}
            </button>

            <span className="hidden lg:block">
              <Link href={contactHref} className="btn btn-primary h-10 min-h-0 px-4 py-0 text-sm">
                {t.cta}
              </Link>
            </span>

            {/* mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text lg:hidden"
              aria-label={t.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={t.menu}
          >
            <div className="absolute inset-0 bg-white" />
            <motion.div
              className="relative flex h-full flex-col"
              initial={{ y: reduce ? 0 : -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: reduce ? 0 : -12, opacity: 0 }}
              transition={{ duration: reduce ? 0.15 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="container-x flex items-center justify-between"
                style={{ height: "var(--nav-h)" }}
              >
                <Image
                  src="/brand/eprox-logo.png"
                  alt="EPROX"
                  width={336}
                  height={140}
                  className="h-auto w-[140px] object-contain"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text"
                  aria-label={t.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="hairline" />

              <nav className="container-x flex flex-1 flex-col justify-center gap-1 py-8" aria-label="Mobile">
                {navRoutes.map(({ seg: s, key }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: reduce ? 0 : -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduce ? 0 : 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={localePath(locale, s || undefined)}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-border py-4 text-2xl font-semibold ${
                        s === seg ? "text-brand-deep" : "text-text"
                      }`}
                    >
                      {t[key]}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="container-x flex items-center gap-3 py-8">
                <Link
                  href={contactHref}
                  onClick={() => setOpen(false)}
                  className="btn btn-primary flex-1"
                >
                  {t.cta}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    switchLanguage();
                  }}
                  className="btn btn-secondary"
                  aria-label={t.switchTo}
                >
                  <Languages className="h-4 w-4" strokeWidth={1.7} />
                  {t.switchTo}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
