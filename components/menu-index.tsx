// The menus listed as an index: huge names on fine lines, numbered and staggered,
// each linking to its own page (/menu/<slug>). Used on the homepage (h2) and /menu (h1).
// Names rise line by line out of a mask; numbers and lines fade up (scroll-reveal.tsx).
import Link from "next/link";
import { MENU_PAGES } from "@/components/menu-pages";
import Reveal, { RiseTitle } from "@/components/scroll-reveal";

// How much of the free space each row's left line takes, so the names sit off-centre by different amounts.
const LEAD = [1, 2.6, 1.4, 3];

export default function MenuIndex({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <div className="serif-ink pt-12 pb-16">
      <div className="text-center max-w-xl mx-auto mb-10 md:mb-16 px-5">
        <RiseTitle as={headingLevel} text="Our Menus" className="title-font block text-4xl md:text-6xl mb-3" />
        <Reveal as="p" className="text-lg!">
          Four menus, from the first coffee to the last glass.
        </Reveal>
      </div>

      <ul className="mx-auto max-w-6xl px-5 flex flex-col gap-10 md:gap-20">
        {MENU_PAGES.map((m, i) => (
          <li key={m.slug}>
            <Link
              href={m.href}
              aria-label={`${m.label} menu`}
              className="group flex items-end gap-4 md:gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary rounded-sm"
            >
              <Reveal as="span" aria-hidden className="mb-[0.35em] h-px bg-text-primary/60" style={{ flexGrow: LEAD[i % LEAD.length], flexBasis: 0 }} />
              <span className="flex items-end gap-3">
                <Reveal as="span" aria-hidden className="mb-[0.6em] text-sm tracking-wide">
                  / {m.number}
                </Reveal>
                <RiseTitle
                  text={m.label}
                  className="title-font text-5xl md:text-[6.5rem] leading-[0.95] decoration-1 underline-offset-[0.12em] group-hover:underline"
                />
              </span>
              <Reveal as="span" aria-hidden className="mb-[0.35em] h-px bg-text-primary/60" style={{ flexGrow: 2, flexBasis: 0 }} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
