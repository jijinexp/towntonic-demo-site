export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "brunch" | "dinner" | "drinks" | "dessert";
  subCategory?: string;
  tags: ("Vegan" | "Vegetarian" | "Gluten-Free" | "Dairy-Free")[];
  sourceTags?: ("local" | "seasonal")[];
  image: string;
}

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <article className="py-6 border-b border-neutral-300/70">
      <div className="flex items-baseline gap-3">
        <h4 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
          {item.name}
        </h4>
        <span
          aria-hidden="true"
          className="flex-1 border-b border-dotted border-neutral-500 translate-y-[-6px]"
        />
        <span className="font-sans font-semibold text-gold text-xl md:text-2xl shrink-0">
          ${item.price.toFixed(2)}
        </span>
      </div>
      <p className="mt-2 text-neutral-700 text-base md:text-lg leading-relaxed">
        {item.description}
      </p>
      {(item.tags.length > 0 || (item.sourceTags && item.sourceTags.length > 0)) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.sourceTags?.map((t) => (
            <span
              key={t}
              className="bg-sage-soft text-sage text-xs font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wide"
            >
              {t === "local" ? "Local" : "Seasonal"}
            </span>
          ))}
          {item.tags.map((t, idx) => (
            <span
              key={idx}
              className="bg-neutral-900/85 text-neutral-100 text-xs font-semibold px-2.5 py-1 rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
