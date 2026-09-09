import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/sanity/fetch";

export const revalidate = 60;

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <main>
      <section className="relative min-h-[70vh] overflow-hidden sm:min-h-[78vh]">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2000&q=80"
          alt="ASOBIA lookbook"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/35" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:min-h-[78vh] sm:px-6 sm:pb-20">
          <p className="text-xs tracking-[0.3em] text-white/80 sm:text-sm">NEW SEASON</p>
          <h1 className="mt-3 max-w-xl text-3xl leading-tight text-white sm:text-4xl md:text-6xl">
            Clothes made to be worn every day.
          </h1>
          <Link
            href="/shop"
            className="mt-8 inline-flex w-fit bg-white px-6 py-3 text-sm tracking-wide text-stone-900 transition-colors hover:bg-stone-100"
          >
            Shop the collection
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-xs tracking-[0.25em] text-stone-500">FEATURED</p>
            <h2 className="mt-2 text-2xl text-stone-900 sm:text-3xl">Selected pieces</h2>
          </div>
          <Link href="/shop" className="shrink-0 text-sm text-stone-600 hover:text-stone-900">
            View all
          </Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-stone-600">
            No featured products yet. Add products in{" "}
            <Link href="/studio" className="underline">
              Sanity Studio
            </Link>{" "}
            and mark them as featured.
          </p>
        )}
      </section>
    </main>
  );
}
