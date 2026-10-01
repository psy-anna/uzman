import { createFileRoute } from "@tanstack/react-router";
import { InquiryCTA, PageHero, SectionLabel } from "@/components/site";

export const steps = [
  { title: "Запрос", text: "Вы указываете производителя, оборудование, модель или OEM-номер — либо описываете задачу." },
  { title: "Документация", text: "Фото, чертёж, шильдик или технический документ помогают точно идентифицировать деталь." },
  { title: "Технический анализ", text: "Мы рассматриваем запрос и уточняем данные, если требуется." },
  { title: "Предложение", text: "Вы получаете ответ по возможности подбора и поставки." },
];

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Как мы работаем — Uzman Rulman" },
      { name: "description", content: "Порядок работы с техническим запросом на запасные части для судового оборудования." },
      { property: "og:title", content: "Как мы работаем — Uzman Rulman" },
      { property: "og:description", content: "От технического запроса до предложения: четыре шага." },
    ],
  }),
  component: Process,
});

function Process() {
  return (
    <>
      <PageHero no="—" eyebrow="Как мы работаем" title="От запроса к решению" intro="Работа начинается с любых доступных данных о вашем оборудовании." />
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <ol>
          {steps.map((s, i) => (
            <li key={s.title} className="grid gap-6 border-t border-navy/15 py-12 md:grid-cols-12">
              <div className="md:col-span-3"><SectionLabel no={String(i + 1).padStart(2, "0")}>Шаг</SectionLabel></div>
              <h2 className="text-3xl md:col-span-4 md:text-5xl">{s.title}</h2>
              <p className="max-w-md text-muted-foreground md:col-span-5">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <InquiryCTA title="Начните с технического запроса" />
    </>
  );
}
