import { Artwork, Artist, Exhibition } from './types';

export const RATES = {
  PKR: 1,
  USD: 0.0036, // 1 PKR = 0.0036 USD (Approx)
  GBP: 0.0028
};

export const MOCK_ARTISTS: Artist[] = [
  { id: 'a1', name: 'Sadequain (Tribute)', specialty: 'Abstract Calligraphy', bio: 'Exploring the mystic soul of the walled city.', imageUrl: 'https://picsum.photos/200/200?random=10' },
  { id: 'a2', name: 'Ahmed Khan', specialty: 'Islamic Calligraphy', bio: 'Master of silver leaf and oil overlays.', imageUrl: 'https://picsum.photos/200/200?random=11' },
  { id: 'a3', name: 'Alia Syed', specialty: 'Contemporary Miniature', bio: 'Reviving ancient techniques for modern narratives.', imageUrl: 'https://picsum.photos/200/200?random=12' }
];

export const MOCK_EXHIBITIONS: Exhibition[] = [
  { id: 'e1', title: 'Voices of the Indus', date: 'Oct 15 - Nov 30, 2024', location: 'Lahore Gallery', isVirtual: true, imageUrl: 'https://picsum.photos/800/400?random=20', description: 'A journey through the river\'s history.' },
  { id: 'e2', title: 'Urban Chaos', date: 'Dec 01 - Dec 20, 2024', location: 'Karachi Arts Council', isVirtual: false, imageUrl: 'https://picsum.photos/800/400?random=21', description: 'The raw energy of Karachi captured in oil.' }
];

export const MOCK_ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Echoes of Lahore Fort',
    artistName: 'Sadequain (Tribute)',
    artistId: 'a1',
    price: 450000,
    imageUrl: 'https://picsum.photos/800/1200?random=1',
    medium: 'Oil on Canvas',
    dimensions: '48x60',
    year: 2023,
    description: 'A vivid abstraction capturing the mystic soul of the walled city.',
    category: 'Abstract',
    inStock: true,
    provenanceId: 'BLK-001-2023',
    reviews: [{ id: 'r1', userName: 'Ali K.', rating: 5, comment: 'Breathtaking texture.', date: '2023-11-12' }],
    isAuction: true,
    auctionEndTime: new Date(Date.now() + 86400000 * 2) // 2 days from now
  },
  {
    id: '2',
    title: 'Hunza Valley Autumn',
    artistName: 'Ghulam Rasul Style',
    artistId: 'unknown',
    price: 120000,
    imageUrl: 'https://picsum.photos/1200/800?random=2',
    medium: 'Acrylic on Canvas',
    dimensions: '36x24',
    year: 2024,
    description: 'The golden hues of Northern Pakistan captured in flat, vibrant planes.',
    category: 'Landscape',
    inStock: true,
    provenanceId: 'BLK-002-2024',
    reviews: []
  },
  {
    id: '3',
    title: 'Surah Rahman',
    artistName: 'Ahmed Khan',
    artistId: 'a2',
    price: 850000,
    imageUrl: 'https://picsum.photos/800/800?random=3',
    medium: 'Silver Leaf and Oil',
    dimensions: '40x40',
    year: 2022,
    description: 'Intricate Islamic calligraphy layered over oxidized silver leaf.',
    category: 'Calligraphy',
    inStock: true,
    provenanceId: 'BLK-003-2022',
    reviews: [{ id: 'r2', userName: 'Sarah M.', rating: 5, comment: 'Divine work.', date: '2024-01-05' }]
  },
  {
    id: '4',
    title: 'Modern Miniature',
    artistName: 'Alia Syed',
    artistId: 'a3',
    price: 950000, // Converted roughly to PKR base for consistency
    imageUrl: 'https://picsum.photos/600/900?random=4',
    medium: 'Gouache on Wasli',
    dimensions: '12x18',
    year: 2023,
    description: 'Traditional Mughal techniques applied to contemporary themes.',
    category: 'Miniature',
    inStock: true,
    provenanceId: 'BLK-004-2023',
    reviews: []
  },
  {
    id: '5',
    title: 'Karachi Street Life',
    artistName: 'Unknown Street Artist',
    artistId: 'unknown',
    price: 75000,
    imageUrl: 'https://picsum.photos/900/600?random=5',
    medium: 'Mixed Media',
    dimensions: '30x30',
    year: 2024,
    description: 'Raw energy of the metropolis.',
    category: 'Abstract',
    inStock: true,
    provenanceId: 'BLK-005-2024',
    reviews: []
  }
];

export const UI_TEXT = {
  EN: {
    nav: { gallery: 'Gallery', artists: 'Artists', exhibitions: 'Exhibitions', about: 'About', login: 'Login' },
    hero: { title: 'The Soul of Pakistani Art', subtitle: 'Curated. Authentic. Timeless.' },
    cart: { title: 'Your Collection' }
  },
  UR: {
    nav: { gallery: 'گیلری', artists: 'فنکار', exhibitions: 'نمائش', about: 'ہمارے بارے میں', login: 'لاگ ان' },
    hero: { title: 'پاکستانی فن کی روح', subtitle: 'منتخب۔ مستند۔ لازوال۔' },
    cart: { title: 'آپ کا مجموعہ' }
  }
};
