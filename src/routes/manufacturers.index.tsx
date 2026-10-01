import { createFileRoute } from "@tanstack/react-router";
import { InquiryCTA, ManufacturerIndex, PageHero } from "@/components/site";

export const Route = createFileRoute("/manufacturers/")({
  head: () => ({
    meta: [
      { title: "Производители — индекс | Uzman Rulman" },
      { name: "description", content: "Производители судового оборудования, компонентов и систем автоматизации, а также исторические линейки, по которым мы принимаем технические запросы." },
      { property: "og:title", content: "Производители — Uzman Rulman" },
      { property: "og:description", content: "Типографический индекс производителей судового оборудования." },
    ],
  }),
  component: () => (
    <>
      <PageHero no="—" eyebrow="Производители" title="Индекс производителей" intro="Оборудование, компоненты, автоматизация и исторические продуктовые линейки — с указанием статуса." />
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10"><ManufacturerIndex /></section>
      <InquiryCTA title="Не нашли производителя в списке?" />
    </>
  ),
});
