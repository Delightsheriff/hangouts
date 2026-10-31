export interface Hangout {
  id: string;
  title: string;
  subtitle?: string;
  category: 'All' | 'Music' | 'Food & Cafe' | 'Creative' | 'Outdoors' | 'Wellness';
  time: string;
  timeDetail: string;
  timeSubtext: string;
  location: string;
  locationDetail: string;
  slotsLeft?: number;
  attendeesCount: number;
  price: string;
  isTrending?: boolean;
  heroImage: string;
  thumbnailImage: string;
  attendeeAvatars: string[];
  description: string[];
  tags: { label: string; bg: string; text: string }[];
  coordinates: {
    x: number; // percentage on map for interactive SVG canvas
    y: number;
    latitude?: number;
    longitude?: number;
  };
}
