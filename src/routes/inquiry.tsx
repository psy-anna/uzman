import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { InquiryForm } from "@/components/InquiryForm";
import { SectionLabel } from "@/components/site";

export const Route = createFileRoute("/inquiry")({
  validateSearch: z.object({ manufacturer: z.string().optional(), equipment: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Технический запрос — Uzman Rulman" },
      { name: "description", content: "Отправьте технический запрос на запасные части: производитель, оборудование, модель, OEM / Part Number, фото или чертёж." },
      { property: "og:title", content: "Технический запрос — Uzman Rulman" },
      { property: "og:description", content: "Запрос на подбор запасных частей для судового оборудования." },
    ],
  }),
  component: Inquiry,
});

function Inquiry() {
  const search = Route.useSearch();
  return (
    <>
      <div className="h-20 bg-navy" />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <aside className="md:col-span-4">
          <SectionLabel no="→">Технический запрос</SectionLabel>
          <h1 className="mt-8 text-4xl uppercase leading-[1.02] md:text-6xl">Отправить запрос</h1>
          <p className="mt-6 max-w-sm text-muted-foreground">
            Точный номер детали не обязателен. Заполните известные поля и приложите фото, чертёж или документ.
          </p>
        </aside>
        <div className="md:col-span-8">
          <InquiryForm key={`${search.manufacturer}-${search.equipment}`} defaults={search} />
        </div>
      </section>
    </>
  );
}
