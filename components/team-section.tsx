import Image from "next/image";

/**
 * The chef who leads Town Tonic's kitchen. Facts are from towntonic.com/new-page
 * ("Our Team"), rewritten to put Kanav at the centre of the restaurant.
 */
export default function TeamSection() {
  return (
    <div className="menu-serif px-5 py-16 md:py-24">
      <div className="text-center max-w-xl mx-auto mb-10 md:mb-16">
        <h2 className="title-font text-4xl md:text-6xl text-text-primary mb-3">
          Behind the Pass
        </h2>
        <p className="text-text-secondary text-sm">Every plate at Town Tonic starts with one chef.</p>
      </div>

      <article className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl bg-bg-card">
          <Image
            src="/images/team-kanav.webp"
            alt="Kanav Khajuria, Head Chef at Town Tonic"
            fill
            sizes="(min-width: 768px) 448px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-xl">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.24em]">Head Chef</p>
          <h3 className="mt-2 mb-6 font-normal text-4xl md:text-5xl text-text-primary">Kanav Khajuria</h3>
          <div className="flex flex-col gap-4 text-text-secondary leading-relaxed">
            <p className="text-text-primary text-lg">
              Town Tonic is Kanav&rsquo;s kitchen. He leads the team and shapes every menu around one idea: simple,
              well-executed dishes that are textural and bold, with a European accent and iconic New Zealand flavours.
            </p>
            <p>
              His path here began in India, where he earned his Bachelor in Hotel Management and cooked in
              international hotels such as Sheraton and Marriott. Wanting to see more of the world, he moved to New
              Zealand and spent years in restaurants, resorts and hotels across New Plymouth, Martinborough, Abel Tasman
              and Lake Tekapo before settling in Christchurch.
            </p>
            <p>
              Since joining Town Tonic in 2021, he has built its food around the abundance of fresh, seasonal produce
              the Canterbury region has to offer.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
