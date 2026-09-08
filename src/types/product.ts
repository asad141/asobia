export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
  sizes: string[];
  image: string;
  featured?: boolean;
};
