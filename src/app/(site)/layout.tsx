import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getNavPages } from "@/sanity/fetch";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pages = await getNavPages();

  return (
    <>
      <Header pages={pages} />
      {children}
      <Footer pages={pages} />
    </>
  );
}
