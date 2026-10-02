import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { categories, manufacturers, statusLabel, type Manufacturer } from "@/lib/data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/products", label: "Продукция" },
  { to: "/manufacturers", label: "Производители" },
  { to: "/process", label: "Как мы работаем" },
  { to: "/company", label: "Компания" },
  { to: "/contacts", label: "Контакты" },
] as const;

export function Button({
  to, search, children, variant = "signal", className,
}: { to: string; search?: Record<string, string> | undefined; children: ReactNode; variant?: "signal" | "ghost-light" | "ghost-dark"; className?: string }) {
  const styles = {
    signal: "bg-signal text-ink hover:bg-ink hover:text-navy",
    "ghost-light": "border border-line text-ink hover:border-signal hover:text-signal",
    "ghost-dark": "border border-navy/25 text-navy hover:border-signal hover:text-signal",
  }[variant];
  return (
    <Link
      to={to}
      search={search as never}
      className={cn("label inline-flex min-h-12 items-center gap-3 px-6 transition-colors duration-300", styles, className)}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-40 text-ink">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between border-b border-line px-5 md:px-10">
        <Link to="/" className="flex items-baseline gap-3" aria-label="Uzman Rulman — главная">
          <span className="font-display text-lg font-semibold tracking-tight">UZMAN RULMAN</span>
          <span className="label hidden text-steel sm:inline">Marine spare parts</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="label group relative py-2 text-ink/80 transition-colors hover:text-ink"
              activeProps={{ className: "text-ink [&>span]:scale-x-100" }}
            >
              {n.label}
              <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <Button to="/inquiry" className="hidden lg:inline-flex">Отправить технический запрос ↗</Button>
        <button
          className="label min-h-12 px-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Закрыть" : "Меню"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-b border-line bg-navy px-5 pb-8 lg:hidden" aria-label="Мобильная навигация">
          {nav.map((n, i) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-line py-5">
              <span className="label text-signal">0{i + 1}</span>
              <span className="font-display text-2xl">{n.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function MobileInquiryBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-navy p-3 lg:hidden">
      <Button to="/inquiry" className="w-full justify-center">Отправить технический запрос ↗</Button>
    </div>
  );
}

export function SectionLabel({ no, children, dark }: { no: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-4", dark ? "text-steel" : "text-muted-foreground")}>
      <span className="label text-signal">{no}</span>
      <span className={cn("h-px w-10", dark ? "bg-line" : "bg-navy/20")} />
      <span className="label">{children}</span>
    </div>
  );
}

export function TechnicalMeta({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <dl className={cn("grid grid-cols-2 border-t sm:grid-cols-3", dark ? "border-line" : "border-navy/15")}>
      {items.map((it) => (
        <div key={it} className={cn("border-b py-3 pr-4", dark ? "border-line" : "border-navy/15")}>
          <dt className={cn("label", dark ? "text-steel" : "text-muted-foreground")}>{it}</dt>
          <dd className={cn("mt-2 h-px w-12", dark ? "bg-line" : "bg-navy/20")} aria-hidden />
        </div>
      ))}
    </dl>
  );
}

export function ProductDirection({ c }: { c: (typeof categories)[number] }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: c.slug }}
      className="group relative grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-t border-line py-7 md:grid-cols-[6rem_1fr_18rem_3rem] md:py-9"
    >
      <span className="label text-signal">{c.no}</span>
      <h3 className="font-display text-2xl text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-4xl lg:text-5xl">{c.title}</h3>
      <p className="col-start-2 mt-3 text-sm text-steel md:col-start-3 md:mt-0">{c.short}</p>
      <span className="hidden text-right text-2xl text-steel transition-colors group-hover:text-signal md:block">↗</span>
      <img
        src={c.image}
        alt=""
        loading="lazy"
        className="photo-treat pointer-events-none absolute right-24 top-1/2 hidden h-48 w-72 -translate-y-1/2 object-cover opacity-0 transition-all duration-700 [clip-path:inset(0_100%_0_0)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0_0)] xl:block"
      />
    </Link>
  );
}

export function ManufacturerCard({ m }: { m: Manufacturer }) {
  const muted = m.status === "historical";
  return (
    <Link
      to="/manufacturers/$slug"
      params={{ slug: m.slug }}
      className="group flex min-h-36 flex-col justify-between border-b border-r border-navy/15 p-5 transition-colors hover:bg-navy hover:text-ink"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={cn("font-display text-xl tracking-tight md:text-2xl", muted && "text-muted-foreground group-hover:text-steel")}>
          {m.name.toUpperCase()}
        </span>
        <span className="text-muted-foreground transition-colors group-hover:text-signal">↗</span>
      </div>
      <span className={cn("label mt-6", m.status === "current" ? "text-muted-foreground group-hover:text-steel" : "text-signal")}>
        {statusLabel[m.status]}
      </span>
    </Link>
  );
}

export function ManufacturerIndex({ list = manufacturers }: { list?: Manufacturer[] }) {
  const groups: { key: Manufacturer["status"]; title: string }[] = [
    { key: "current", title: "Оборудование" },
    { key: "component", title: "Компоненты и уплотнения" },
    { key: "subsystem", title: "Автоматизация" },
    { key: "historical", title: "Исторические линейки" },
  ];
  return (
    <div className="space-y-14">
      {groups.map((g) => {
        const items = list.filter((m) => m.status === g.key);
        if (!items.length) return null;
        return (
          <div key={g.key}>
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="label text-muted-foreground">{g.title}</h3>
              <span className="label text-muted-foreground">{String(items.length).padStart(2, "0")}</span>
            </div>
            <div className="grid grid-cols-1 border-l border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((m) => <ManufacturerCard key={m.slug} m={m} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function InquiryCTA({ title, search }: { title: string; search?: Record<string, string> | undefined }) {
  return (
    <section className="blueprint relative bg-navy text-ink">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-8">
          <SectionLabel no="→" dark>Технический запрос</SectionLabel>
          <h2 className="mt-8 text-4xl leading-[1.05] md:text-6xl">{title}</h2>
          <p className="mt-6 max-w-xl text-steel">
            Точный номер детали не обязателен. Укажите производителя, модель или приложите фото / чертёж — мы рассмотрим запрос.
          </p>
        </div>
        <div className="flex items-end md:col-span-4 md:justify-end">
          <Button to="/inquiry" search={search}>Отправить запрос ↗</Button>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ no, eyebrow, title, intro, image }: { no: string; eyebrow: string; title: string; intro?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy text-ink">
      {image && <img src={image} alt="" className="photo-treat absolute inset-0 h-full w-full object-cover opacity-45" />}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-40 md:px-10 md:pb-28 md:pt-52">
        <SectionLabel no={no} dark>{eyebrow}</SectionLabel>
        <h1 className="reveal mt-8 max-w-5xl text-4xl uppercase leading-[1.02] md:text-7xl">{title}</h1>
        {intro && <p className="reveal mt-8 max-w-2xl text-lg text-steel [animation-delay:150ms]">{intro}</p>}
        <div className="line-draw mt-14 h-px w-full bg-line" />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy pb-24 text-ink lg:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-12 border-t border-line px-5 py-20 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-display text-3xl font-semibold tracking-tight">UZMAN RULMAN</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel">
            Подбор и поставка запасных частей для судового оборудования: пропульсия, валопроводы, рулевое управление, автоматизация, палубные механизмы.
          </p>
          <Button to="/inquiry" className="mt-10">Отправить технический запрос ↗</Button>
        </div>
        <div className="md:col-span-3">
          <p className="label text-steel">Навигация</p>
          <ul className="mt-6 space-y-3 text-sm">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-signal">{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="label text-steel">Направления</p>
          <ul className="mt-6 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/products/$slug" params={{ slug: c.slug }} className="flex gap-3 hover:text-signal">
                  <span className="text-steel">{c.no}</span>{c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 border-t border-line px-5 py-6 text-xs text-steel md:flex-row md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} Uzman Rulman</span>
        {/* PLACEHOLDER: replace with real legal pages when available */}
        <div className="flex gap-6">
          <span>Политика конфиденциальности</span>
          <span>Правовая информация</span>
        </div>
      </div>
    </footer>
  );
}
