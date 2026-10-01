import { createFileRoute } from "@tanstack/react-router";
import shaft from "@/assets/cat-shaft.jpg";
import { InquiryCTA, PageHero, SectionLabel } from "@/components/site";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Компания — Uzman Rulman" },
      { name: "description", content: "Uzman Rulman — подбор и поставка запасных частей для судового оборудования." },
      { property: "og:title", content: "Компания — Uzman Rulman" },
      { property: "og:description", content: "Технический подбор запасных частей для судового оборудования." },
    ],
  }),
  component: () => (
    <>
      <PageHero no="—" eyebrow="Компания" title="Uzman Rulman" intro="Подбор и поставка запасных частей для судового оборудования." image={shaft} />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-4"><SectionLabel no="A">О компании</SectionLabel></div>
        <div className="space-y-6 text-lg text-muted-foreground md:col-span-7">
          <p className="font-display text-3xl leading-tight text-foreground md:text-4xl">
            Мы работаем как технический партнёр, а не как каталог.
          </p>
          <p>Каждый запрос рассматривается на основе данных об оборудовании: производителя, модели, OEM-номера, фото или чертежа. Это позволяет работать даже тогда, когда точный номер детали неизвестен.</p>
          {/* PLACEHOLDER: add verified company facts (history, locations, credentials) when supplied */}
        </div>
      </section>
      <InquiryCTA title="Обсудим ваше оборудование" />
    </>
  ),
});
