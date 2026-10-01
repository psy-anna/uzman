import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getCategory, getManufacturer } from "@/lib/data";
import { InquiryCTA, ManufacturerCard, PageHero, SectionLabel } from "@/components/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const c = getCategory(params.slug);
    if (!c) throw notFound();
    return { slug: c.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData && getCategory(loaderData.slug);
    if (!c) return { meta: [{ title: "Не найдено" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${c.title} — Uzman Rulman` },
        { name: "description", content: c.intro },
        { property: "og:title", content: `${c.title} — Uzman Rulman` },
        { property: "og:description", content: c.intro },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useLoaderData();
  const c = getCategory(slug)!;
  const mfrs = c.manufacturers.map(getManufacturer).filter(Boolean) as NonNullable<ReturnType<typeof getManufacturer>>[];
  const hist = (c.historical ?? []).map(getManufacturer).filter(Boolean) as typeof mfrs;
  const related = categories.filter((x) => x.slug !== c.slug);

  return (
    <>
      <PageHero no={c.no} eyebrow="Направление" title={c.title} intro={c.intro} image={c.image} />

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4"><SectionLabel no="A">Типы оборудования</SectionLabel></div>
        <ul className="md:col-span-8">
          {c.subcategories.map((s, i) => (
            <li key={s} className="border-t border-navy/15 last:border-b">
              <Link to="/inquiry" search={{ equipment: s }} className="group flex items-baseline gap-6 py-5">
                <span className="label w-8 text-muted-foreground">{c.no}.{i + 1}</span>
                <span className="flex-1 font-display text-xl md:text-3xl">{s}</span>
                <span className="label text-muted-foreground opacity-0 transition-opacity group-hover:text-signal group-hover:opacity-100">Запрос ↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10">
        <SectionLabel no="B">Производители</SectionLabel>
        <div className="mt-10 grid grid-cols-1 border-l border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-4">
          {mfrs.map((m) => <ManufacturerCard key={m.slug} m={m} />)}
        </div>
        {hist.length > 0 && (
          <>
            <p className="label mt-14 text-muted-foreground">Historical product lines</p>
            <div className="mt-4 grid grid-cols-1 border-l border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-4">
              {hist.map((m) => <ManufacturerCard key={m.slug} m={m} />)}
            </div>
          </>
        )}
      </section>

      <InquiryCTA title={`Запрос: ${c.title.toLowerCase()}`} search={{ equipment: c.title }} />

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
        <SectionLabel no="C">Смежные направления</SectionLabel>
        <div className="mt-8 grid gap-px md:grid-cols-4">
          {related.map((r) => (
            <Link key={r.slug} to="/products/$slug" params={{ slug: r.slug }} className="group border-t border-navy pt-5">
              <span className="label text-signal">{r.no}</span>
              <p className="mt-3 font-display text-lg transition-colors group-hover:text-signal">{r.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
