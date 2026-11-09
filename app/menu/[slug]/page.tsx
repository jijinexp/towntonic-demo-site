// One page per menu: a centred title and intro, then a split layout with the photo
// bleeding off the left (sticky on desktop) and the dishes group by group on the right,
// and a link on to the next menu.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MENU_ITEMS } from "@/components/menu-items";
import { ADD_ONS } from "@/components/menu-layout";
import { MENU_PAGES, menuPageBySlug } from "@/components/menu-pages";
import Reveal, { RiseTitle } from "@/components/scroll-reveal";

export function generateStaticParams() {
  return MENU_PAGES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = menuPageBySlug((await params).slug);
  return { title: found ? `${found.menu.label} Menu - Town Tonic Christchurch` : "Menu - Town Tonic",
    description: found?.menu.intro, };
}

export default async function MenuPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const found = menuPageBySlug((await params).slug);
  if (!found) notFound();
  const { menu, next } = found;
  const items = MENU_ITEMS.filter((i) => i.category === menu.id);
  const groups = menu.groups.filter((g) => items.some((i) => i.subCategory === g.sub));
  const total = String(MENU_PAGES.length).padStart(2, "0");

  return (
    <div className="serif-ink pb-8">
      {/* back + position */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-8 md:pt-10 text-base md:text-xl uppercase tracking-[0.2em]">
        <Link
          href="/#menu"
          className="group inline-flex items-center gap-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary rounded-sm"
        >
          {/* a hairline, like the menu index, that reaches further on hover */}
          <span aria-hidden="true" className="h-px w-8 md:w-12 bg-current transition-[width] duration-500 ease-[cubic-bezier(.23,1,.32,1)] group-hover:w-14 md:group-hover:w-20" />
          All menus
        </Link>
        <span>
          {menu.number} / {total}
        </span>
      </div>

      {/* title, with the hours, count and intro under it */}
      <header className="mx-auto max-w-3xl px-5 pt-8 pb-12 md:pt-12 md:pb-16 text-center">
        <RiseTitle as="h1" text={menu.label} className="title-font block text-6xl md:text-[7.5rem] leading-[0.9]" />
        <Reveal className="mt-6 md:mt-8">
          <p className="text-sm! uppercase tracking-[0.2em]">
            {`${menu.hours ?? "Served all day"} \u00b7 ${menu.count} dishes & drinks`}
          </p>
        </Reveal>
        <Reveal as="p" className="mt-6 text-xl! md:text-2xl! leading-snug">{menu.intro}</Reveal>
      </header>

      {/* split: the photo bleeds off the left edge and stays put; the dishes scroll on the right */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:items-start">
        <Reveal
          kind="fade"
          className="relative aspect-[4/3] md:aspect-auto md:h-[min(50vw,calc(100svh-8rem))] w-full overflow-hidden md:sticky md:top-32"
        >
          <Image src={menu.image} alt={menu.imageAlt} fill loading="eager" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover"
            style={menu.imagePosition ? { objectPosition: menu.imagePosition } : undefined} />
        </Reveal>

        <div className="w-full max-w-[640px] px-5 pt-12 md:px-12 md:pt-2 lg:px-16 flex flex-col gap-16 md:gap-20">
          {groups.map((g) => (
            <section key={g.sub} aria-labelledby={`g-${g.sub}`}>
              <div className="mb-2">
                <RiseTitle as="h2" id={`g-${g.sub}`} text={g.label} className="title-font block text-3xl lg:text-4xl leading-tight" />
                {g.caption && <Reveal as="p" className="mt-2 text-base!">{g.caption}</Reveal>}
              </div>
              <ul>
                {items
                  .filter((i) => i.subCategory === g.sub)
                  .map((it) => (
                    <Reveal as="li" key={it.id} className="border-t border-text-primary/30 py-6 md:py-7">
                      <div className="flex items-baseline justify-between gap-6">
                        <h3 className="dish-font text-2xl md:text-[2.1rem] leading-[1.4]">{it.name}</h3>
                        <span className="shrink-0 text-lg">${it.price.toFixed(2)}</span>
                      </div>
                      <p className="mt-3 text-base! leading-snug">{it.description}</p>
                      {it.tags.length > 0 && <p className="mt-2 text-xs! uppercase tracking-[0.12em]">{it.tags.join(" · ")}</p>}
                    </Reveal>
                  ))}
              </ul>
            </section>
          ))}

          {menu.id === "brunch" && (
            <section aria-labelledby="g-addons">
              <div className="mb-2">
                <RiseTitle as="h2" id="g-addons" text="Add-ons" className="title-font block text-3xl lg:text-4xl leading-tight" />
                <Reveal as="p" className="mt-2 text-base!">Only available to order with meals</Reveal>
              </div>
              <ul>
                {ADD_ONS.map((a) => (
                  <Reveal as="li" key={a.name} className="flex items-baseline justify-between gap-6 border-t border-text-primary/30 py-4">
                    <span className="dish-font text-xl md:text-2xl">{a.name}</span>
                    <span className="text-lg">${a.price.toFixed(2)}</span>
                  </Reveal>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* next menu */}
      <nav aria-label="Next menu" className="mt-24 border-t border-text-primary/40">
        <RiseTitle as="p" text={`${menu.number} \u2014 ${total}`} className="block py-10 text-center text-6xl! md:text-8xl! leading-none" />
        <Link
          href={next.href}
          className="group mx-auto flex max-w-6xl items-center justify-between border-t border-text-primary/40 px-5 py-8 md:py-12"
        >
          <span>
            <Reveal as="span" className="block text-sm uppercase tracking-[0.2em]">Next menu</Reveal>
            <RiseTitle text={next.label} className="title-font mt-2 block text-4xl md:text-7xl leading-none" />
          </span>
          <span aria-hidden="true" className="text-5xl md:text-7xl transition-transform duration-500 group-hover:translate-x-3">&rarr;</span>
        </Link>
      </nav>
    </div>
  );
}
