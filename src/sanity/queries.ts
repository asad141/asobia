import { groq } from "next-sanity";

export const productsQuery = groq`
  *[_type == "product" && defined(slug.current)] | order(_createdAt desc) {
    "id": _id,
    "slug": slug.current,
    name,
    description,
    price,
    colors,
    sizes,
    featured,
    image
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true && defined(slug.current)] | order(_createdAt desc) {
    "id": _id,
    "slug": slug.current,
    name,
    description,
    price,
    colors,
    sizes,
    featured,
    image
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    name,
    description,
    price,
    colors,
    sizes,
    featured,
    image
  }
`;

export const productSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)].slug.current
`;

export const pagesQuery = groq`
  *[_type == "page" && defined(slug.current)] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    seoDescription,
    heroImage,
    body,
    showInNav
  }
`;

export const navPagesQuery = groq`
  *[_type == "page" && showInNav == true && defined(slug.current)] | order(title asc) {
    title,
    "slug": slug.current
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    seoDescription,
    heroImage,
    body,
    "products": products[]->{
      "id": _id,
      "slug": slug.current,
      name,
      description,
      price,
      colors,
      sizes,
      featured,
      image
    }
  }
`;

export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)].slug.current
`;
