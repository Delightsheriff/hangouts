import { gradients } from '@/theme';

export type CategoryId = 'all' | 'music' | 'food' | 'creative' | 'wellness';
export type When = 'upcoming' | 'today' | 'tomorrow' | 'weekend';

export type Category = {
  id: CategoryId;
  label: string;
  /** SF Symbol (iOS) */
  sf: string;
  /** Ionicons fallback (Android / web) */
  ion: string;
};

export type Hangout = {
  id: string;
  title: string;
  category: Exclude<CategoryId, 'all'>;
  when: Exclude<When, 'upcoming'>;
  /** Short label used on cards, e.g. "Tonight, 7:00 PM" */
  dateShort: string;
  /** Range used on detail + map, e.g. "Tonight, 7:00 PM - 9:30 PM" */
  dateRange: string;
  doorsShort: string;
  doorsLong: string;
  venue: string;
  venueArea: string;
  /** City line under the venue on the detail screen */
  venueNote: string;
  price: string;
  capacity: number;
  attendees: number;
  trending?: boolean;
  gradient: readonly [string, string, string];
  image: string;
  avatars: string[];
  about: string[];
  coordinates: { latitude: number; longitude: number };
};

const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const face = (path: string) => `https://randomuser.me/api/portraits/${path}.jpg`;

export const user = {
  name: 'Alex',
  avatar: require('@/assets/images/avatar.png') as number,
};

export const categories: Category[] = [
  { id: 'all', label: 'All', sf: 'sparkles', ion: 'sparkles-outline' },
  { id: 'music', label: 'Music', sf: 'music.note', ion: 'musical-notes-outline' },
  { id: 'food', label: 'Food & Cafe', sf: 'cup.and.saucer', ion: 'cafe-outline' },
  { id: 'creative', label: 'Creative', sf: 'paintpalette', ion: 'color-palette-outline' },
  { id: 'wellness', label: 'Wellness', sf: 'leaf', ion: 'leaf-outline' },
];

export const categoryLabel: Record<Hangout['category'], string> = {
  music: 'Music',
  food: 'Food & Cafe',
  creative: 'Creative',
  wellness: 'Wellness',
};

const crowd = [face('women/44'), face('men/32'), face('men/75')];

export const hangouts: Hangout[] = [
  {
    id: 'golden-hour',
    title: 'Golden Hour Acoustic Session',
    category: 'music',
    when: 'today',
    dateShort: 'Tonight, 7:00 PM',
    dateRange: 'Tonight, 7:00 PM - 9:30 PM',
    doorsShort: 'Doors open at 6:45 PM',
    doorsLong: 'Doors open at 6:45 PM for drinks & seating',
    venue: 'The Broadview Canopy, NY',
    venueArea: 'The Broadview Canopy',
    venueNote: 'Brooklyn, NY • Exact coordinates sent after booking',
    price: 'Free',
    capacity: 14,
    attendees: 64,
    trending: true,
    gradient: gradients.sunset,
    image: unsplash('1511632765486-a01980e01a18', 1200),
    avatars: crowd,
    about: [
      'Join us for an intimate unplugged music session as the sun sets over Brooklyn. We’ve curated a cozy rooftop space featuring live acoustic covers and original songs from local singer-songwriters.',
      'Bring a blanket, grab your favorite drink, and settle in for a relaxed evening of good tunes, gorgeous skyline views, and warm conversation.',
    ],
    coordinates: { latitude: 37.7946, longitude: -122.3999 },
  },
  {
    id: 'neon-craft',
    title: 'Neon & Craft Beer Night',
    category: 'food',
    when: 'weekend',
    dateShort: 'Sat, 8:00 PM',
    dateRange: 'Saturday, 8:00 PM - 11:30 PM',
    doorsShort: 'Doors open at 7:30 PM',
    doorsLong: 'Doors open at 7:30 PM, first pour is on the house',
    venue: 'Studio 404 Workshop',
    venueArea: 'Studio 404 Workshop',
    venueNote: 'Bushwick, NY • Look for the pink neon door',
    price: '$18',
    capacity: 24,
    attendees: 21,
    gradient: gradients.aurora,
    image: unsplash('1514933651103-005eec06c04b', 1200),
    avatars: [face('women/68'), face('men/46'), face('women/12')],
    about: [
      'Six rotating taps from independent Brooklyn breweries, retro arcade cabinets and a neon-soaked playlist. Tasting flights are included with every ticket.',
      'Come solo or bring your crew — we pair newcomers into teams for the arcade tournament at 9:30.',
    ],
    coordinates: { latitude: 37.7599, longitude: -122.4148 },
  },
  {
    id: 'sunrise-yoga',
    title: 'Parkside Sunrise Yoga',
    category: 'wellness',
    when: 'weekend',
    dateShort: 'Sat, 7:00 AM',
    dateRange: 'Saturday, 7:00 AM - 8:15 AM',
    doorsShort: 'Check-in from 6:45 AM',
    doorsLong: 'Check-in from 6:45 AM, mats provided',
    venue: 'McCarren Great Lawn',
    venueArea: 'McCarren Great Lawn',
    venueNote: 'Williamsburg, NY • Meet by the north gate',
    price: 'Free',
    capacity: 30,
    attendees: 25,
    gradient: gradients.lagoon,
    image: unsplash('1506126613408-eca07ce68773', 1200),
    avatars: [face('women/21'), face('men/11'), face('women/57')],
    about: [
      'An energizing vinyasa flow led by certified instructors as the morning light hits the lawn. All levels welcome.',
      'Stick around after class for cold brew and fresh fruit from our neighbors at Sunday Market.',
    ],
    coordinates: { latitude: 37.7694, longitude: -122.4862 },
  },
  {
    id: 'supper-club',
    title: 'Candlelit Supper Club',
    category: 'food',
    when: 'tomorrow',
    dateShort: 'Tomorrow, 7:30 PM',
    dateRange: 'Tomorrow, 7:30 PM - 10:00 PM',
    doorsShort: 'Seating at 7:15 PM',
    doorsLong: 'Seating at 7:15 PM, five courses to share',
    venue: 'Fern & Fig Loft',
    venueArea: 'Fern & Fig Loft',
    venueNote: 'Greenpoint, NY • Address sent after booking',
    price: '$45',
    capacity: 16,
    attendees: 13,
    trending: true,
    gradient: gradients.aurora,
    image: unsplash('1527529482837-4698179dc6ce', 1200),
    avatars: [face('women/90'), face('men/52'), face('women/33')],
    about: [
      'A long table, string lights and a seasonal five-course menu served family style. Strangers in, friends out.',
    ],
    coordinates: { latitude: 37.8024, longitude: -122.4382 },
  },
  {
    id: 'warehouse-live',
    title: 'Warehouse Live: Indie Night',
    category: 'music',
    when: 'today',
    dateShort: 'Tonight, 10:00 PM',
    dateRange: 'Tonight, 10:00 PM - 2:00 AM',
    doorsShort: 'Doors open at 9:30 PM',
    doorsLong: 'Doors open at 9:30 PM, ID required',
    venue: 'Pier 70 Warehouse',
    venueArea: 'Pier 70 Warehouse',
    venueNote: 'Dogpatch • Entrance on Illinois St',
    price: '$25',
    capacity: 200,
    attendees: 182,
    trending: true,
    gradient: gradients.berry,
    image: unsplash('1533174072545-7a4b6ad7a6c3', 1200),
    avatars: [face('men/22'), face('women/26'), face('men/64')],
    about: ['Three local indie bands, one massive warehouse and a light show you will be talking about all week.'],
    coordinates: { latitude: 37.7609, longitude: -122.3871 },
  },
];

export const spotsLeft = (h: Hangout) => Math.max(0, h.capacity - Math.min(h.capacity, h.attendees));

export const getHangout = (id: string) => hangouts.find((h) => h.id === id);
