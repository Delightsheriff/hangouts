import { Hangout } from '@/types/hangout';

export const USER_PROFILE = {
  name: 'Alex',
  greeting: 'Goodafternoon Alex',
  subtitle: 'Welcome back',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
};

export const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'sparkles' },
  { id: 'music', label: 'Music', icon: 'musical-notes' },
  { id: 'food', label: 'Food & Cafe', icon: 'cafe' },
  { id: 'creative', label: 'Creative', icon: 'color-palette' },
  { id: 'outdoors', label: 'Outdoors', icon: 'leaf' },
] as const;

export const HANGOUTS: Hangout[] = [
  {
    id: 'golden-hour',
    title: 'Golden Hour Acoustic Session',
    subtitle: 'Rooftop live acoustic covers & sunset drinks',
    category: 'Music',
    time: 'Tonight, 7:00 PM',
    timeDetail: 'Tonight, 7:00 PM - 9:30 PM',
    timeSubtext: 'Doors open at 6:45 PM for drinks & seating',
    location: 'The Broadview Canopy, NY',
    locationDetail: 'Brooklyn, NY • Exact coordinates sent after booking',
    slotsLeft: 0,
    attendeesCount: 64,
    price: 'Free',
    isTrending: true,
    heroImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    ],
    description: [
      "Join us for an intimate unplugged music session as the sun sets over Brooklyn. We've curated a cozy rooftop space featuring live acoustic covers and original songs from local singer-songwriters.",
      "Bring a blanket, grab your favorite drink, and settle in for a relaxed evening of good tunes, gorgeous skyline views, and warm conversation.",
    ],
    tags: [
      { label: 'Upcoming', bg: '#F1F5E9', text: '#2D5A27' },
      { label: 'Music', bg: '#F3E8FF', text: '#7E22CE' },
    ],
    coordinates: {
      x: 52,
      y: 48,
      latitude: 37.7749,
      longitude: -122.4194,
    },
  },
  {
    id: 'neon-beer',
    title: 'Neon & Craft Beer Night',
    subtitle: 'Curated craft brews and retro arcade fun',
    category: 'Food & Cafe',
    time: 'Sat, 8:00 PM',
    timeDetail: 'Sat, 8:00 PM - 11:30 PM',
    timeSubtext: 'Tasting flights start promptly at 8:30 PM',
    location: 'Studio 404 Workshop',
    locationDetail: 'Lower East Side, NY • Private venue',
    slotsLeft: 3,
    attendeesCount: 28,
    price: '$15',
    isTrending: false,
    heroImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    ],
    description: [
      "Gather with fellow craft beer enthusiasts and casual sippers inside Studio 404's ambient neon workshop space.",
      "Sample locally brewed IPAs, sours, and seasonal porters alongside vintage tabletop games.",
    ],
    tags: [
      { label: 'Craft Brews', bg: '#FEF3C7', text: '#92400E' },
      { label: 'Social', bg: '#E0E7FF', text: '#3730A3' },
    ],
    coordinates: {
      x: 70,
      y: 62,
      latitude: 37.7612,
      longitude: -122.4012,
    },
  },
  {
    id: 'parkside-yoga',
    title: 'Parkside Sunrise Yoga',
    subtitle: 'Energizing vinyasa flow with morning sunlight',
    category: 'Wellness',
    time: 'Sat, 7:00 AM',
    timeDetail: 'Sat, 7:00 AM - 8:15 AM',
    timeSubtext: 'Bring your own mat, herbal tea provided afterwards',
    location: 'McCarren Great Lawn',
    locationDetail: 'Brooklyn, NY • North entrance',
    slotsLeft: 5,
    attendeesCount: 42,
    price: 'Free',
    isTrending: false,
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    ],
    description: [
      "Wake up with the city and start your weekend refreshed with a gentle, energizing open-air vinyasa practice.",
      "All levels welcome. Mats will be spaced thoughtfully on the lush grass of McCarren Great Lawn.",
    ],
    tags: [
      { label: 'Wellness', bg: '#DCFCE7', text: '#166534' },
      { label: 'Outdoor', bg: '#E0F2FE', text: '#0369A1' },
    ],
    coordinates: {
      x: 35,
      y: 35,
      latitude: 37.8044,
      longitude: -122.4664,
    },
  },
];
