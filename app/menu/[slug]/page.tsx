// One page per menu: title over a circular photo, a large intro, the dishes in
// rows on hairlines group by group, and a link on to the next menu.
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 text-sm tracking-wide">
        <Link href="/#menu" className="hover:underline underline-offset-4">&larr; All menus</Link>
        <span>
          / {menu.number} of {total}
        </span>
      </div>

      {/* title over the photo */}
      <header className="relative mx-auto max-w-6xl px-5 pt-8 md:pt-10 text-center">
        <RiseTitle as="h1" text={menu.label} className="title-font relative z-10 block text-6xl md:text-[7.5rem] leading-[0.9]" />
        <div className="relative mx-auto -mt-6 md:-mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-6">
          <Reveal className="order-2 md:order-1 md:text-left md:pb-10">
            <p className="text-sm! uppercase tracking-[0.2em]">{menu.hours ?? "Served all day"}</p>
          </Reveal>
          <Reveal kind="fade" className="order-1 md:order-2 relative mx-auto aspect-square w-[78vw] max-w-[560px] overflow-hidden rounded-full">
            <Image src={menu.image} alt={menu.imageAlt} fill loading="eager" sizes="(min-width: 768px) 560px, 78vw" className="object-cover" />
          </Reveal>
          <Reveal className="order-3 md:text-right md:pb-10">
            <p className="text-sm! uppercase tracking-[0.2em]">{menu.count} dishes &amp; drinks</p>
          </Reveal>
        </div>
      </header>

      {/* intro */}
      <div className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <Reveal as="p" className="text-center text-3xl! md:text-5xl! leading-snug">{menu.intro}</Reveal>
      </div>

      {/* the dishes */}
      <div className="mx-auto max-w-5xl px-5 flex flex-col gap-20">
        {groups.map((g) => (
          <section key={g.sub} aria-labelledby={`g-${g.sub}`}>
            <div className="text-center mb-8">
              <RiseTitle as="h2" id={`g-${g.sub}`} text={g.label} className="title-font block text-3xl md:text-6xl leading-tight" />
              {g.caption && <Reveal as="p" className="mt-3 text-lg!">{g.caption}</Reveal>}
            </div>
            <ul className="border-t border-text-primary/40">
              {items
                .filter((i) => i.subCategory === g.sub)
                .map((it) => (
                  <Reveal as="li" key={it.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-text-primary/40 py-5 md:py-6">
                    <div className="md:flex md:items-baseline md:gap-5">
                      <h3 className="font-normal text-2xl md:text-3xl shrink-0">{it.name}</h3>
                      <p className="mt-1 md:mt-0 text-base! md:text-lg! leading-snug">
                        {it.description}
                        {it.tags.length > 0 && <span className="mt-1 block text-xs uppercase tracking-[0.12em]">{it.tags.join(" · ")}</span>}
                      </p>
                    </div>
                    <span className="text-xl md:text-2xl">${it.price.toFixed(2)}</span>
                  </Reveal>
                ))}
            </ul>
          </section>
        ))}

        {menu.id === "brunch" && (
          <section aria-labelledby="g-addons">
            <div className="text-center mb-8">
              <RiseTitle as="h2" id="g-addons" text="Add-ons" className="title-font block text-3xl md:text-6xl leading-tight" />
              <Reveal as="p" className="mt-3 text-lg!">Only available to order with meals</Reveal>
            </div>
            <ul className="border-t border-text-primary/40 md:columns-2 md:gap-12">
              {ADD_ONS.map((a) => (
                <Reveal as="li" key={a.name} className="flex items-baseline justify-between border-b border-text-primary/40 py-4 break-inside-avoid">
                  <span className="text-xl">{a.name}</span>
                  <span className="text-xl">${a.price.toFixed(2)}</span>
                </Reveal>
              ))}
            </ul>
          </section>
        )}
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
