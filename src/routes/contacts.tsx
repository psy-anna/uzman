import { createFileRoute } from "@tanstack/react-router";
import { Button, PageHero, SectionLabel } from "@/components/site";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Uzman Rulman" },
      { name: "description", content: "Свяжитесь с Uzman Rulman через технический запрос." },
      { property: "og:title", content: "Контакты — Uzman Rulman" },
      { property: "og:description", content: "Технический запрос — самый быстрый способ связаться с нами." },
    ],
  }),
  component: () => (
    <>
      <PageHero no="—" eyebrow="Контакты" title="Контакты" />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4"><SectionLabel no="A">Связь</SectionLabel></div>
        <div className="md:col-span-8">
          <p className="font-display text-3xl leading-tight md:text-4xl">Самый быстрый путь — технический запрос с данными оборудования.</p>
          <Button to="/inquiry" className="mt-10">Отправить технический запрос ↗</Button>
          {/* PLACEHOLDER: add real e-mail, phone and address when supplied */}
        </div>
      </section>
    </>
  ),
});
