import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/lib/format";
import {
  getProductBySlug,
  getProductSlugs,
  getProducts,
} from "@/sanity/fetch";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = (await getProducts())
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
      <Link href="/shop" className="text-sm text-stone-500 hover:text-stone-900">
        ← Back to shop
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-200">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          ) : null}
        </div>
        <div>
          <h1 className="text-3xl text-stone-900 sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-xl text-stone-800">{formatPrice(product.price)}</p>
          <p className="mt-6 max-w-md leading-7 text-stone-600">
            {product.description}
          </p>

          {product.colors.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-medium text-stone-900">Colors</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="border border-stone-300 px-3 py-1.5 text-sm text-stone-700"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-stone-900">Sizes</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="border border-stone-300 px-3 py-1.5 text-sm text-stone-700"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            className="mt-10 w-full bg-stone-900 px-6 py-3 text-sm tracking-wide text-white transition-colors hover:bg-stone-800 lg:w-auto"
          >
            Add to bag (coming soon)
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl text-stone-900">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
