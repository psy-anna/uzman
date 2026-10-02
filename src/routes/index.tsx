import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import deck from "@/assets/cat-deck.jpg";
import steering from "@/assets/cat-steering.jpg";
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
      <section className="relative overflow-hidden bg-navy text-ink">
        <img src={hero} alt="Азимутальная винторулевая колонка в сухом доке" width={1920} height={1088} className="photo-treat absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy to-transparent" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-28 md:min-h-[100svh] md:px-10 md:pb-16">
          <div className="mono flex items-center gap-4 text-steel">
            <span className="text-signal">01</span><span className="h-px w-10 bg-line" />Marine spare parts / technical sourcing
          </div>
          <h1 className="reveal mt-8 text-[2.55rem] font-light uppercase leading-[0.95] tracking-[-0.035em] sm:text-6xl md:text-[5.5rem] lg:text-[7.25rem]">
            Запасные части<br />для судового<br /><span className="text-steel">оборудования</span>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-line pt-8 md:mt-14 md:grid-cols-12">
            <p className="reveal max-w-md text-[15px] leading-relaxed text-ink/75 md:col-span-5 [animation-delay:200ms]">
              Подбираем и поставляем запасные части для судового оборудования. Укажите производителя и модель, OEM / Part Number, если известен, или приложите фото / чертёж — мы рассмотрим технический запрос.
            </p>
            <dl className="mono hidden grid-cols-2 gap-x-6 gap-y-3 self-end text-steel md:col-span-3 md:grid">
              {["OEM Part No.", "Model", "Serial No.", "Drawing"].map((x) => (
                <dt key={x} className="flex items-center gap-2"><span className="h-px w-3 bg-signal" />{x}</dt>
              ))}
            </dl>
            <div className="flex flex-col gap-3 sm:flex-row md:col-span-4 md:flex-col md:items-stretch md:justify-end lg:flex-row lg:items-end lg:justify-end">
              <Button to="/inquiry" className="justify-between">Отправить запрос <span>↗</span></Button>
              <a href="#directions" className="label inline-flex min-h-12 items-center justify-between gap-3 border border-line px-6 text-ink transition-colors hover:border-signal hover:text-signal">
                Оборудование <span>↓</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mono absolute right-10 top-28 hidden text-right text-steel xl:block">
          <p className="text-signal">Fig. 01</p>
          <p className="mt-1">Azimuth thruster / dry dock</p>
        </div>
      </section>

      {/* 02 WHAT WE SUPPLY */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-4"><SectionLabel no="02">Что мы поставляем</SectionLabel></div>
        <div className="md:col-span-8">
          <h2 className="text-3xl font-light leading-[1.1] md:text-[3.25rem]">
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

      {/* IMAGE BAND */}
      <figure className="relative h-[52vh] min-h-80 overflow-hidden bg-navy md:h-[78vh]">
        <img src={deck} alt="Палубный кран и люковые закрытия" loading="lazy" className="photo-treat h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/0 via-transparent to-navy" />
        <figcaption className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1440px] items-end justify-between gap-6 px-5 pb-8 text-ink md:px-10">
          <p className="max-w-xl font-display text-2xl font-light leading-tight md:text-4xl">От пропульсии до палубных механизмов — пять направлений судового оборудования.</p>
          <span className="mono hidden text-steel md:block">Fig. 02 — Deck / cargo</span>
        </figcaption>
      </figure>

      {/* 03 PRODUCT DIRECTIONS */}
      <section id="directions" className="scroll-mt-10 bg-navy text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionLabel no="03" dark>Направления оборудования</SectionLabel>
              <h2 className="mt-8 text-4xl font-light md:text-6xl">Направления оборудования</h2>
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
          <div className="md:col-span-8">
            <div className="mono flex justify-between border-b border-navy pb-3 text-muted-foreground">
              <span>Manufacturer</span><span>Status</span>
            </div>
            <ul className="grid sm:grid-cols-2 sm:gap-x-10">
              {index.map((m) => (
                <li key={m.slug} className="border-b border-navy/15">
                  <Link to="/manufacturers/$slug" params={{ slug: m.slug }} className="group flex min-h-14 items-center justify-between gap-4 py-3">
                    <span className="font-display text-xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">{m.name.toUpperCase()}</span>
                    <span className={m.status === "current" ? "mono text-muted-foreground/60 group-hover:text-signal" : "mono text-signal"}>
                      {m.status === "current" ? "OEM" : m.status === "component" ? "Comp." : "Sys."}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-12 border-l-2 border-navy/15 pl-5">
              <p className="mono text-muted-foreground">Historical product lines — не самостоятельные текущие производители</p>
              <p className="mt-3 text-lg text-muted-foreground">
                {historical.map((h, i) => (
                  <span key={h.slug}>
                    <Link to="/manufacturers/$slug" params={{ slug: h.slug }} className="underline-offset-4 hover:text-foreground hover:underline">{h.name}</Link>
                    {i < historical.length - 1 && <span className="px-2 text-navy/20">/</span>}
                  </span>
                ))}
              </p>
            </div>
            <p className="mono mt-8 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
              <span>OEM — оборудование</span><span className="text-signal">Comp. — компоненты и уплотнения</span><span className="text-signal">Sys. — автоматизация</span>
            </p>
          </div>
        </div>
      </section>

      {/* 05 HOW WE WORK */}
      <section className="grid border-t border-navy/15 md:grid-cols-12">
        <div className="relative min-h-72 overflow-hidden md:col-span-5">
          <img src={steering} alt="Рулевая машина в машинном отделении" loading="lazy" className="photo-treat absolute inset-0 h-full w-full object-cover" />
          <span className="mono absolute bottom-4 left-5 text-ink">Fig. 03 — Steering gear</span>
        </div>
        <div className="px-5 py-20 md:col-span-7 md:px-16 md:py-28">
          <SectionLabel no="05">Как мы работаем</SectionLabel>
          <ol className="mt-12">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-navy/15 py-7 md:grid-cols-[5rem_12rem_1fr]">
                <span className="font-display text-3xl font-light text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl">{s.title}</h3>
                <p className="col-start-2 text-sm leading-relaxed text-muted-foreground md:col-start-3">{s.text}</p>
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
