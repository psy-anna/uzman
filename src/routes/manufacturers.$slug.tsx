import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categoryTitle, getManufacturer, statusLabel } from "@/lib/data";
import { InquiryCTA, PageHero, SectionLabel } from "@/components/site";

export const Route = createFileRoute("/manufacturers/$slug")({
  loader: ({ params }) => {
    const m = getManufacturer(params.slug);
    if (!m) throw notFound();
    return { slug: m.slug };
  },
  head: ({ loaderData }) => {
    const m = loaderData && getManufacturer(loaderData.slug);
    if (!m) return { meta: [{ title: "Не найдено" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${m.name} — запасные части | Uzman Rulman` },
        { name: "description", content: `${m.name}: ${m.description} Технический запрос на запасные части.` },
        { property: "og:title", content: `${m.name} — Uzman Rulman` },
        { property: "og:description", content: m.description },
      ],
    };
  },
  component: ManufacturerPage,
});

function ManufacturerPage() {
  const { slug } = Route.useLoaderData();
  const m = getManufacturer(slug)!;
  return (
    <>
      <PageHero no="—" eyebrow={statusLabel[m.status]} title={m.name} intro={m.description} />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <SectionLabel no="A">{m.status === "historical" ? "Связанные направления" : "Подтверждённые направления"}</SectionLabel>
          {m.status === "historical" && (
            <p className="mt-6 max-w-xs text-sm text-muted-foreground">Историческая продуктовая линейка, не самостоятельный текущий производитель. Запросы по установленному оборудованию принимаются.</p>
          )}
        </div>
        <ul className="md:col-span-8">
          {(m.directions ?? []).map((d) => (
            <li key={d} className="border-t border-navy/15 py-5 font-display text-xl md:text-3xl">{d}</li>
          ))}
          {m.categories.map((c) => (
            <li key={c} className="border-t border-navy/15 last:border-b">
              <Link to="/products/$slug" params={{ slug: c }} className="group flex items-baseline justify-between py-5">
                <span className="font-display text-xl transition-colors group-hover:text-signal md:text-3xl">{categoryTitle(c)}</span>
                <span className="text-muted-foreground group-hover:text-signal">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <InquiryCTA title={`Нужна запасная часть ${m.name}?`} search={{ manufacturer: m.name }} />
    </>
  );
}
