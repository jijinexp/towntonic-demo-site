import { Metadata } from "next";
import MenuSection from "@/components/menu-section";

export const metadata: Metadata = {
  title: "Our Menu - Seasonal Brunch & Dinner | Town Tonic Christchurch",
  description: "Browse the Town Tonic digital menu. Sourced from organic Canterbury farms, we serve fresh brunch, dinner mains, and local craft drinks in Addington.",
};

export default function MenuPage() {
  return <MenuSection headingLevel="h1" />;
}
