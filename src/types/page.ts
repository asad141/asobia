import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import type { Product } from "@/types/product";

export type NavPage = {
  title: string;
  slug: string;
};

export type CmsPage = {
  id: string;
  title: string;
  slug: string;
  seoDescription: string;
  heroImage: SanityImageSource | null;
  body: PortableTextBlock[];
  products: Product[];
};
