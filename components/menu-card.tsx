"use client";
import Image from "next/image";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "brunch" | "dinner" | "drinks";
  tags: ("Vegan" | "Vegetarian" | "Gluten-Free" | "Dairy-Free")[];
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
      className="text-left w-full flex flex-col border border-stone-200 rounded-sm bg-white overflow-hidden cursor-pointer hover:border-gold hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-all duration-200"
    >
      <div className="relative h-[200px] w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col justify-between w-full">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <h4 className="font-serif text-lg font-bold text-primary">{item.name}</h4>
            <span className="font-sans font-medium text-gold">${item.price.toFixed(2)}</span>
          </div>
          <p className="text-stone-600 text-xs leading-relaxed mb-4">{item.description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((t, idx) => (
            <span key={idx} className="bg-stone-100 text-stone-600 text-[10px] font-semibold px-2 py-0.5 rounded-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
