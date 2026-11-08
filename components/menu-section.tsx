import MenuList from "@/components/menu-list";
import { MENU_ITEMS } from "@/components/menu-items";

/** Heading, service-hours intro and the interactive menu. Used on the homepage (h2) and /menu (h1). */
export default function MenuSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <div className="menu-serif pt-12 font-sans">
      <div className="text-center max-w-xl mx-auto mb-8 px-4">
        <Heading className="font-normal text-5xl md:text-7xl text-text-primary mb-3">Our Menu</Heading>
        <p className="text-text-secondary text-sm">
          We serve our All Day Menu from 8:00 am to 2:00 pm daily, refined dinners from 5:30 pm, and selected local drinks.
        </p>
      </div>

      <MenuList items={MENU_ITEMS} />
    </div>
  );
}
