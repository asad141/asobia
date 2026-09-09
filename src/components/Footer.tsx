import Link from "next/link";
import type { NavPage } from "@/types/page";

export function Footer({ pages = [] }: { pages?: NavPage[] }) {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-3">
        <div>
          <p className="text-lg tracking-[0.28em] text-white">ASOBIA</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-stone-400">
            Contemporary clothing designed for everyday wear.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium text-white">Explore</p>
          <ul className="space-y-2">
            <li>
              <Link href="/shop" className="hover:text-white">
                Shop
              </Link>
            </li>
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={`/${page.slug}`} className="hover:text-white">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-medium text-white">Contact</p>
          <p className="text-stone-400">hello@asobia.studio</p>
          <p className="mt-1 text-stone-400">Mon–Fri, 10–6</p>
        </div>
      </div>
    </footer>
  );
}
