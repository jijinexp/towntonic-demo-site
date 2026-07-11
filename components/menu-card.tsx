"use client";
import Image from "next/image";

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
  onSelect: (item: MenuItem) => void;
}

export default function MenuCard({ item, onSelect }: MenuCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="text-left w-full flex flex-col border border-border rounded-sm bg-bg-card overflow-hidden cursor-pointer hover:border-border-strong hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-all duration-200"
    >
      <span className="relative h-[200px] w-full block">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </span>
      <span className="p-5 flex-grow flex flex-col justify-between w-full block">
        {item.sourceTags && item.sourceTags.length > 0 && (
          <span className="flex gap-1.5 mb-2 block">
            {item.sourceTags.map((t) => (
              <span
                key={t}
                className="bg-sage-soft text-sage text-[11px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wide"
              >
                {t === "local" ? "Local" : "Seasonal"}
              </span>
            ))}
          </span>
        )}
        <span className="block">
          <span className="flex justify-between items-baseline mb-2 block">
            <span className="font-serif text-lg font-bold text-primary block">{item.name}</span>
            <span className="font-sans font-medium text-gold">${item.price.toFixed(2)}</span>
          </span>
          <span className="text-text-secondary text-xs leading-relaxed mb-4 block">{item.description}</span>
        </span>
        <span className="flex flex-wrap gap-1.5 block">
          {item.tags.map((t, idx) => (
            <span key={idx} className="bg-bg-page text-text-secondary text-[10px] font-semibold px-2 py-0.5 rounded-sm">
              {t}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}
