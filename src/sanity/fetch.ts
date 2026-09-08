import { client } from "./client";
import { urlFor } from "./image";
import {
  featuredProductsQuery,
  navPagesQuery,
  pageBySlugQuery,
  pageSlugsQuery,
  productBySlugQuery,
  productSlugsQuery,
  productsQuery,
} from "./queries";
import type { CmsPage, NavPage } from "@/types/page";
import type { Product } from "@/types/product";
import type { SanityImageSource } from "@sanity/image-url";

type SanityProduct = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  price?: number | null;
  colors?: string[] | null;
  sizes?: string[] | null;
  featured?: boolean | null;
  image?: SanityImageSource | null;
};

function normalizeProduct(product: SanityProduct | null): Product | null {
  if (!product?.slug || !product.name || product.price == null) return null;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description ?? "",
    price: product.price,
    colors: product.colors ?? [],
    sizes: product.sizes ?? [],
    image: product.image ? urlFor(product.image).width(1400).auto("format").url() : "",
    featured: Boolean(product.featured),
  };
}

export async function getProducts(): Promise<Product[]> {
  const products = (await client.fetch<SanityProduct[]>(productsQuery)) ?? [];
  return products
    .map(normalizeProduct)
    .filter((product): product is Product => Boolean(product));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = (await client.fetch<SanityProduct[]>(featuredProductsQuery)) ?? [];
  return products
    .map(normalizeProduct)
    .filter((product): product is Product => Boolean(product));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await client.fetch<SanityProduct | null>(productBySlugQuery, {
    slug,
  });
  return normalizeProduct(product);
}

export async function getProductSlugs(): Promise<string[]> {
  return (await client.fetch<string[]>(productSlugsQuery)) ?? [];
}

export async function getNavPages(): Promise<NavPage[]> {
  return (await client.fetch<NavPage[]>(navPagesQuery)) ?? [];
}

export async function getPageSlugs(): Promise<string[]> {
  return (await client.fetch<string[]>(pageSlugsQuery)) ?? [];
}

export async function getPageBySlug(slug: string): Promise<CmsPage | null> {
  const page = await client.fetch<(Omit<CmsPage, "products"> & {
    products?: SanityProduct[] | null;
  }) | null>(pageBySlugQuery, { slug });
  if (!page?.slug || !page.title) return null;

  return {
    ...page,
    seoDescription: page.seoDescription ?? "",
    heroImage: page.heroImage ?? null,
    body: page.body ?? [],
    products: (page.products ?? [])
      .map(normalizeProduct)
      .filter((product): product is Product => Boolean(product)),
  };
}
