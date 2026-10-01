import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/lib/data";
import { InquiryCTA, PageHero, ProductDirection } from "@/components/site";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Продукция — направления оборудования | Uzman Rulman" },
      { name: "description", content: "Пять направлений судового оборудования: пропульсия, валопроводы, рулевое управление, автоматизация, палубное оборудование." },
      { property: "og:title", content: "Продукция — Uzman Rulman" },
      { property: "og:description", content: "Направления судового оборудования, для которых мы подбираем запасные части." },
    ],
  }),
  component: Products,
});

function Products() {
  return (
    <>
      <PageHero no="—" eyebrow="Продукция" title="Направления оборудования" intro="Выберите направление, чтобы увидеть типы оборудования и производителей." />
      <section className="bg-navy text-ink">
        <div className="mx-auto max-w-[1440px] border-b border-line px-5 pb-24 md:px-10">
          {categories.map((c) => <ProductDirection key={c.slug} c={c} />)}
        </div>
      </section>
      <InquiryCTA title="Не нашли нужное оборудование?" />
    </>
  );
}
