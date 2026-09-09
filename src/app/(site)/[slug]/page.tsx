import { PageBody } from "@/components/PageBody";
import { ProductCard } from "@/components/ProductCard";
import { urlFor } from "@/sanity/image";
import { getPageBySlug, getPageSlugs } from "@/sanity/fetch";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type CmsPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CmsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return { title: "ASOBIA" };
  }

  return {
    title: `${page.title} — ASOBIA`,
    description: page.seoDescription || undefined,
  };
}

export default async function CmsPage({ params }: CmsPageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  const hero = page.heroImage
    ? urlFor(page.heroImage).width(1800).auto("format").url()
    : null;

  return (
    <main>
      {hero ? (
        <section className="relative h-[36vh] min-h-[220px] overflow-hidden sm:h-[42vh] sm:min-h-[280px]">
          <Image
            src={hero}
            alt={page.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/35" />
          <div className="relative mx-auto flex h-full max-w-6xl items-end px-4 pb-8 sm:px-6 sm:pb-10">
            <h1 className="text-3xl text-white sm:text-4xl md:text-5xl">{page.title}</h1>
          </div>
        </section>
      ) : (
        <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
          <h1 className="text-3xl text-stone-900 sm:text-4xl">{page.title}</h1>
        </div>
      )}

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <PageBody value={page.body} />
      </article>

      {page.products.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          <p className="text-xs tracking-[0.25em] text-stone-500">PRODUCTS</p>
          <h2 className="mt-2 text-2xl text-stone-900 sm:text-3xl">Selected for this page</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-8 lg:grid-cols-4">
            {page.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
