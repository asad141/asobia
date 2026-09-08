import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-200">
        {product.image ? (
          <Image
            src={product.image}
          alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="text-sm text-stone-900">{product.name}</h3>
        <p className="text-sm text-stone-700">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
