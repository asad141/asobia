"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { NavPage } from "@/types/page";

export function Header({ pages = [] }: { pages?: NavPage[] }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    ...pages.map((page) => ({ href: `/${page.slug}`, label: page.title })),
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative z-50 border-b border-stone-200/80 bg-[#f6f1ea]/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            href="/"
            className="text-lg tracking-[0.28em] text-stone-900 sm:text-xl"
            onClick={() => setOpen(false)}
          >
            ASOBIA
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-stone-600 md:flex">
            {links
              .filter((link) => link.href !== "/")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-stone-900"
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-stone-900 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-5 bg-stone-900 transition duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-stone-900 transition duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-stone-900 transition duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-[#f6f1ea] transition-opacity duration-500 ease-out md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav
          className={`flex h-full flex-col justify-center px-8 pt-14 transition-all duration-500 ease-out ${
            open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {links.map((link, index) => (
              <li
                key={link.href}
                className={`transition-all duration-500 ease-out ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${120 + index * 70}ms` : "0ms" }}
              >
                <Link
                  href={link.href}
                  className="block py-3 text-2xl tracking-wide text-stone-800"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
