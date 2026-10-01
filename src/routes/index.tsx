import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { categories, manufacturers, statusLabel } from "@/lib/data";
import { Button, InquiryCTA, ProductDirection, SectionLabel, TechnicalMeta } from "@/components/site";
import { steps } from "./process";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Uzman Rulman — запасные части для судового оборудования" },
      { name: "description", content: "Подбор и поставка запасных частей для судовых пропульсивных, валопроводных, рулевых, палубных систем и автоматизации. Технический запрос по производителю, модели или OEM-номеру." },
      { property: "og:title", content: "Uzman Rulman — запасные части для судового оборудования" },
      { property: "og:description", content: "Технический подбор запасных частей для судового оборудования ведущих производителей." },
    ],
  }),
  component: Index,
});

function Index() {
  const index = manufacturers.filter((m) => m.status !== "historical");
  const historical = manufacturers.filter((m) => m.status === "historical");
  return (
    <>
      {/* 01 HERO */}
      <section className="relative min-h-[100svh] overflow-hidden bg-navy text-ink">
        <img src={hero} alt="Азимутальная винторулевая колонка в сухом доке" width={1920} height={1088} className="photo-treat absolute inset-0 h-full w-full object-cover object-[65%_center] opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-20">
          <SectionLabel no="01" dark>Marine spare parts & technical sourcing</SectionLabel>
          <h1 className="reveal mt-8 text-[2.6rem] uppercase leading-[0.98] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Запасные части<br />для судового<br />оборудования
          </h1>
          <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
            <p className="reveal text-base leading-relaxed text-steel md:col-span-6 md:text-lg [animation-delay:200ms]">
              Подбираем и поставляем запасные части для судового оборудования. Укажите производителя и модель, OEM / Part Number, если известен, или приложите фото / чертёж — мы рассмотрим технический запрос.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:items-end md:justify-end">
              <Button to="/inquiry">Отправить технический запрос ↗</Button>
              <a href="#directions" className="label inline-flex min-h-12 items-center gap-3 border border-line px-6 text-ink transition-colors hover:border-signal hover:text-signal">
                Смотреть оборудование ↓
              </a>
            </div>
          </div>
        </div>
        <div className="absolute right-10 top-32 hidden text-right xl:block">
          <p className="label text-signal">Fig. 01</p>
          <p className="label mt-2 text-steel">Azimuth thruster / dry dock</p>
        </div>
      </section>

      {/* 02 WHAT WE SUPPLY */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-4"><SectionLabel no="02">Что мы поставляем</SectionLabel></div>
        <div className="md:col-span-8">
          <h2 className="text-3xl leading-[1.1] md:text-5xl">
            Точный номер детали знать не обязательно. Достаточно того, что известно о вашем оборудовании.
          </h2>
          <p className="mt-8 max-w-2xl text-muted-foreground">
            Мы работаем с запросами на запасные части для пропульсивных, валопроводных, рулевых и палубных систем, а также компонентов судовой автоматизации. Запрос можно начать с любых данных:
          </p>
          <div className="mt-12">
            <TechnicalMeta items={["Производитель", "Оборудование", "Модель", "OEM Part No.", "Serial No.", "Фото / Drawing"]} />
          </div>
        </div>
      </section>

      {/* 03 PRODUCT DIRECTIONS */}
      <section id="directions" className="scroll-mt-10 bg-navy text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionLabel no="03" dark>Направления оборудования</SectionLabel>
              <h2 className="mt-8 text-4xl md:text-6xl">Пять направлений</h2>
            </div>
            <Link to="/products" className="label text-steel hover:text-signal">Все направления ↗</Link>
          </div>
          <div className="border-b border-line">
            {categories.map((c) => <ProductDirection key={c.slug} c={c} />)}
          </div>
        </div>
      </section>

      {/* 04 MANUFACTURER NETWORK */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel no="04">Производители</SectionLabel>
            <p className="mt-8 max-w-xs text-muted-foreground">
              Мы различаем производителей оборудования, производителей компонентов, системы автоматизации и исторические линейки.
            </p>
            <Button to="/manufacturers" variant="ghost-dark" className="mt-10">Индекс производителей ↗</Button>
          </div>
          <ul className="md:col-span-8">
            {index.map((m) => (
              <li key={m.slug} className="border-t border-navy/15 last:border-b">
                <Link to="/manufacturers/$slug" params={{ slug: m.slug }} className="group flex items-baseline justify-between gap-4 py-4">
                  <span className="font-display text-2xl tracking-tight transition-colors group-hover:text-signal md:text-4xl">{m.name.toUpperCase()}</span>
                  <span className="label shrink-0 text-muted-foreground">{m.status === "current" ? "" : statusLabel[m.status]}</span>
                </Link>
              </li>
            ))}
            <li className="pt-8">
              <p className="label text-muted-foreground">Historical product lines</p>
              <p className="mt-3 font-display text-lg text-muted-foreground">
                {historical.map((h, i) => (
                  <span key={h.slug}>
                    <Link to="/manufacturers/$slug" params={{ slug: h.slug }} className="hover:text-signal">{h.name}</Link>
                    {i < historical.length - 1 && " · "}
                  </span>
                ))}
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* 05 HOW WE WORK */}
      <section className="border-t border-navy/15">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <SectionLabel no="05">Как мы работаем</SectionLabel>
          <ol className="mt-14 grid md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-navy pt-6 md:pr-8">
                <span className="font-display text-5xl text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 TECHNICAL INQUIRY */}
      <InquiryCTA title="Нужна запасная часть для судового оборудования?" />
    </>
  );
}
