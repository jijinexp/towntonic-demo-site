// Common types for the Town Tonic Redesign project

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  popular?: boolean;
}

export interface OpeningHours {
  day: string;
  hours: string;
  closed: boolean;
}
