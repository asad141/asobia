import Link from "next/link";
import type { NavPage } from "@/types/page";

export function Header({ pages = [] }: { pages?: NavPage[] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#f6f1ea]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl tracking-[0.28em] text-stone-900">
          ASOBIA
        </Link>
        <nav className="flex items-center gap-8 text-sm text-stone-600">
          <Link href="/shop" className="transition-colors hover:text-stone-900">
            Shop
          </Link>
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              className="transition-colors hover:text-stone-900"
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
