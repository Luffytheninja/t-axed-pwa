export interface Project {
  id: string;
  title: string;
  year: string;
  category: 'photography' | 'painting';
  medium?: string;
  dimensions?: string;
  description: string;
  image: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export const projects: Project[] = [
  // PHOTOGRAPHY
  {
    id: 'photo-1',
    title: 'SUNSET OVER CANOE PARK',
    year: '2024',
    category: 'photography',
    medium: 'Digital Photography',
    description: 'A serene sunset over a canoe park, capturing the tranquil atmosphere and color gradients of the evening sky.',
    image: '/images/photography/SUNSET OVER CANOE  PARK.webp',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-2',
    title: 'THE CONTRAST OF LIFE 1',
    year: '2024',
    category: 'photography',
    medium: 'Digital Photography',
    description: 'First in a series documenting the sharp juxtapositions of modern existence.',
    image: '/images/photography/THE CONTRAST OF LIFE 1.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-3',
    title: 'THE CONTRAST OF LIFE 2',
    year: '2024',
    category: 'photography',
    medium: 'Digital Photography',
    description: 'Visual storytelling through lighting and shadow play.',
    image: '/images/photography/THE CONTRAST OF LIFE 2.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-4',
    title: 'THE CONTRAST OF LIFE 3',
    year: '2024',
    category: 'photography',
    medium: 'Digital Photography',
    description: 'Capturing textures and tonal ranges in portraiture.',
    image: '/images/photography/THE CONTRAST OF LIFE 3.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-5',
    title: 'THE CONTRAST OF LIFE 4',
    year: '2024',
    category: 'photography',
    medium: 'Digital Photography',
    description: 'Concluding the series on the dualities of the human experience.',
    image: '/images/photography/THE CONTRAST OF LIFE 4.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-6',
    title: 'WINDOW TO MY WORLD 1',
    year: '2024',
    category: 'photography',
    medium: 'Digital Photography',
    description: 'A personal perspective on the surrounding environment.',
    image: '/images/photography/WINDOW TO MY WORLD 1.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-7',
    title: 'WINDOW TO MY WORLD 2',
    year: '2024',
    category: 'photography',
    medium: 'Digital Photography',
    description: 'Further reflections on space and personal identity.',
    image: '/images/photography/WINDOW TO MY WORLD 2.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-8',
    title: 'Window to our World',
    year: '2024',
    category: 'photography',
    medium: 'Digital Photography',
    description: 'A collective view of shared spaces and common narratives.',
    image: '/images/photography/Window to our World.webp',
    aspectRatio: 'portrait',
  },


  // PAINTING
  {
    id: 'paint-1',
    title: 'African Street guitarist',
    year: '2024',
    category: 'painting',
    medium: 'Oil on Canvas',
    description: 'A soulful depiction of an African street guitarist, capturing the rhythm and spirit of urban street performance.',
    image: '/images/paintings/African Street guitarist.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'paint-2',
    title: 'children of Makoko-Tales of Sadness',
    year: '2024',
    category: 'painting',
    medium: 'Oil on Canvas',
    description: 'An evocative piece illustrating the poignant stories of the children in Makoko.',
    image: '/images/paintings/children of Makoko-Tales of Sadness.webp',
    aspectRatio: 'landscape',
  },
  {
    id: 'paint-3',
    title: 'DAILY CHORES',
    year: '2024',
    category: 'painting',
    medium: 'Mixed Media',
    description: 'A study of the beauty and repetition found in everyday tasks.',
    image: '/images/paintings/DAILY CHORES.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'paint-4',
    title: 'Daily Hussle copyu',
    year: '2024',
    category: 'painting',
    medium: 'Acrylic on Canvas',
    description: 'Capturing the kinetic energy and determination of daily life.',
    image: '/images/paintings/Daily Hussle copyu.webp',
    aspectRatio: 'square',
  },
  {
    id: 'paint-5',
    title: 'Daily hustle-The story of Iya Bimpe',
    year: '2024',
    category: 'painting',
    medium: 'Oil on Canvas',
    description: 'A narrative portrait reflecting the resilience and daily struggles of market life.',
    image: '/images/paintings/Daily hustle-The story of Iya Bimpe.webp',
    aspectRatio: 'square',
  },
  {
    id: 'paint-6',
    title: 'Good Morning',
    year: '2024',
    category: 'painting',
    medium: 'Oil on Canvas',
    description: 'The quiet optimism and soft light of a new day.',
    image: '/images/paintings/Good Morning.webp',
    aspectRatio: 'landscape',
  },
  {
    id: 'paint-7',
    title: 'My Boat, My livelihood',
    year: '2024',
    category: 'painting',
    medium: 'Oil on Canvas',
    description: 'A tribute to the essential tools of craft and survival on the water.',
    image: '/images/paintings/My Boat, My livelihood.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'paint-8',
    title: 'the drummers 2018 copy',
    year: '2024',
    category: 'painting',
    medium: 'Oil on Canvas',
    description: 'Visualizing the powerful cadence and cultural significance of traditional drumming.',
    image: '/images/paintings/the drummers 2018 copy.webp',
    aspectRatio: 'landscape',
  },
];


