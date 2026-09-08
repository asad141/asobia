import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { CmsPage } from "@/types/page";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl text-stone-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl text-stone-900">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 leading-7 text-stone-600">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-stone-300 pl-4 text-stone-600 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="underline underline-offset-4 hover:text-stone-900"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-stone-900">{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-stone-600">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1400).auto("format").url();
      return (
        <div className="relative my-8 aspect-[16/9] overflow-hidden bg-stone-200">
          <Image
            src={src}
            alt={value.alt || ""}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 720px, 100vw"
          />
        </div>
      );
    },
  },
};

export function PageBody({ value }: { value: CmsPage["body"] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
