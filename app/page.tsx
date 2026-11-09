import { Metadata } from "next";
import HeroSlider, { type HeroSlide } from "@/components/hero-slider";
import MenuIndex from "@/components/menu-index";
import Reveal from "@/components/scroll-reveal";
import TeamSection from "@/components/team-section";

export const metadata: Metadata = {
  title: "Town Tonic - Modern Bistro & Eating House in Addington",
  description: "Experience seasonal, locally sourced dining at Town Tonic, located in the heart of Addington, Christchurch. Reserve your table or explore our menu today.",
};

// Hero slider: full-bleed photos from the kitchen and the dining room, in order.
const heroSlides: HeroSlide[] = [
  { src: "/images/dishes/dish5.jpeg", alt: "Sous vide beef fillet with carrot velouté" },
  { src: "/images/dishes/DSC05288.webp", alt: "A plate on its way out to the dining room", objectPosition: "50% 60%" },
  { src: "/images/floorshot.jpeg", alt: "The dining room at Town Tonic in Addington" },
  { src: "/images/dishes/dish8.jpeg", alt: "Sous vide lamb rump with spring peas" },
  { src: "/images/dishes/dessertdish.jpeg", alt: "Dessert", objectPosition: "38% 50%" },
];

// Under the hero photos: what's on offer, where to find us, and other services.
const INTRO_NOTES: { label: string; text?: string; links?: { label: string; href: string }[] }[] = [
  {
    label: "On the menu",
    text: "Breakfast, lunch and dinner, a trust-the-chef tasting menu and daily blackboard deals. Let us know about any allergies or dietary needs.",
  },
  {
    label: "Find us",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/Towntonicaddington/" },
      { label: "Instagram", href: "https://www.instagram.com/towntonic_/" },
      { label: "info@towntonic.co.nz", href: "mailto:info@towntonic.co.nz" },
    ],
  },
  {
    label: "Functions",
    text: "Hire the whole venue for parties and work functions, with no venue fee.",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col font-sans">
      {/* HERO: a full-bleed photo slider with the name over it (pulled up under the
          clear nav), then a short introduction on the page below the photos */}
      <section className="-mt-[81px] md:-mt-[129px]">
        <div className="h-svh min-h-[560px]">
          <HeroSlider slides={heroSlides}>
            <h1 className="font-normal text-[#f7f9fa]!">
              <span className="block font-serif font-medium text-xl md:text-3xl uppercase tracking-[0.3em]">Welcome to</span>
              <span className="title-font mt-2 md:mt-4 block text-[clamp(64px,12vw,168px)] leading-[0.95]">Town Tonic</span>
            </h1>
          </HeroSlider>
        </div>
        <div className="serif-ink mx-auto max-w-6xl px-5 pt-16 md:pt-24">
          <Reveal as="p" className="mx-auto max-w-3xl text-center text-2xl! md:text-4xl! leading-snug">
            A neighbourhood eating house and bar in Addington, cooking seasonal menus from fresh, local produce.
          </Reveal>
          {/* what's on offer, where, and what else: three short notes on a hairline */}
          <dl className="mt-12 md:mt-16 grid grid-cols-1 gap-8 border-t border-text-primary/30 pt-8 md:grid-cols-3 md:gap-12 md:pt-10">
            {INTRO_NOTES.map((n) => (
              <Reveal key={n.label}>
                <dt className="text-sm uppercase tracking-[0.2em]">{n.label}</dt>
                <dd className="mt-3 text-lg! leading-relaxed">
                  {n.text}
                  {n.links && (
                    <ul className="flex flex-col items-start gap-1">
                      {n.links.map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="underline decoration-1 underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary rounded-sm"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* OUR TEAM */}
      <section id="team" className="scroll-mt-24 md:scroll-mt-32">
        <TeamSection />
      </section>

      {/* MENUS: an index linking to a page per menu */}
      <section id="menu" className="scroll-mt-24 md:scroll-mt-32">
        <MenuIndex />
      </section>
    </div>
  );
}
