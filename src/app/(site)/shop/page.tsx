import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/sanity/fetch";
import Link from "next/link";

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.25em] text-stone-500">SHOP</p>
      <h1 className="mt-2 text-3xl text-stone-900 sm:text-4xl">All products</h1>
      <p className="mt-3 max-w-xl text-stone-600">
        Products are loaded from Sanity. Add or edit them in Studio.
      </p>

      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-8 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-stone-600">
          No products yet. Open{" "}
          <Link href="/studio" className="underline">
            /studio
          </Link>{" "}
          to create your first product.
        </p>
      )}
    </main>
  );
}
