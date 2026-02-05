
export interface Project {
    id: string;
    title: string;
    year: string;
    category: 'photography' | 'painting' | 'design';
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
        title: 'Floral Synthesis',
        year: '2024',
        category: 'photography',
        medium: 'Digital Composite',
        dimensions: '100 x 100 cm',
        description: 'An ethereal exploration of the human form merged with botanical elements, challenging the boundaries between the organic and the constructed.',
        image: '/works/uploaded_image_0_1768921094747.png',
        aspectRatio: 'square'
    },
    {
        id: 'photo-2',
        title: 'Desert Solitude',
        year: '2023',
        category: 'photography',
        medium: 'Digital Photography',
        dimensions: '120 x 120 cm',
        description: 'A study of isolation and vibrant contrast against the muted tones of the Sahelian landscape.',
        image: '/works/uploaded_image_1_1768921094747.png',
        aspectRatio: 'square'
    },
    {
        id: 'photo-3',
        title: 'Veiled Silhouette',
        year: '2024',
        category: 'photography',
        medium: 'Fine Art Photography',
        dimensions: '100 x 100 cm',
        description: 'Capturing transience and mystery through layered transparencies and soft light.',
        image: '/works/uploaded_image_2_1768921094747.png',
        aspectRatio: 'square'
    },
    {
        id: 'photo-4',
        title: 'Static Speed',
        year: '2024',
        category: 'photography',
        medium: 'Long Exposure',
        dimensions: '200 x 80 cm',
        description: 'Capturing the rhythmic flow of urban transit.',
        image: '/works/uploaded_image_1_1768921094747.png',
        aspectRatio: 'square'
    },
    {
        id: 'photo-5',
        title: 'Earthen Form',
        year: '2023',
        category: 'photography',
        medium: 'Still Life',
        dimensions: '40 x 40 cm',
        description: 'Tactile quality of handmade ceramics.',
        image: '/works/uploaded_image_2_1768921094747.png',
        aspectRatio: 'square'
    },
    {
        id: 'photo-6',
        title: 'Shadow play',
        year: '2024',
        category: 'photography',
        medium: 'Abstract Photography',
        dimensions: '80 x 120 cm',
        description: 'Interplay between light and architectural curves.',
        image: '/works/uploaded_image_0_1768921094747.png',
        aspectRatio: 'square'
    },
    {
        id: 'photo-7',
        title: 'The Lone Watcher',
        year: '2023',
        category: 'photography',
        medium: 'Digital Photography',
        dimensions: '180 x 60 cm',
        description: 'Minimalist landscape in morning mist.',
        image: '/works/uploaded_image_1_1768921094747.png',
        aspectRatio: 'square'
    },

    // PAINTING
    {
        id: 'paint-1',
        title: 'Sanguine Horizon',
        year: '2024',
        category: 'painting',
        medium: 'Oil on Canvas',
        dimensions: '120 x 120 cm',
        description: 'A vibrant, impasto exploration of light and dwelling, where the sky as much as the earth defines the structure of the home.',
        image: '/works/uploaded_image_3_1768921094747.jpg',
        aspectRatio: 'square'
    },
    {
        id: 'paint-2',
        title: 'Textural Dialogue',
        year: '2023',
        category: 'painting',
        medium: 'Mixed Media on Canvas',
        dimensions: '100 x 100 cm',
        description: 'An abstract depiction of human connection, utilizing heavy textures and primal symbols to evoke a sense of shared history.',
        image: '/works/uploaded_image_4_1768921094747.jpg',
        aspectRatio: 'square'
    },
    {
        id: 'paint-3',
        title: 'Minimal Horizon',
        year: '2024',
        category: 'painting',
        medium: 'Mixed Media',
        dimensions: '200 x 120 cm',
        description: 'The boundary between seeing and feeling.',
        image: '/works/uploaded_image_3_1768921094747.jpg',
        aspectRatio: 'square'
    },
    {
        id: 'paint-4',
        title: 'Internal Landscapes',
        year: '2024',
        category: 'painting',
        medium: 'Acrylic on Canvas',
        dimensions: '90 x 140 cm',
        description: 'Abstracting the memory of place.',
        image: '/works/uploaded_image_4_1768921094747.jpg',
        aspectRatio: 'square'
    },
    {
        id: 'paint-5',
        title: 'Structure & Void',
        year: '2023',
        category: 'painting',
        medium: 'Oil & Charcoal',
        dimensions: '110 x 110 cm',
        description: 'The tension of negative space.',
        image: '/works/uploaded_image_3_1768921094747.jpg',
        aspectRatio: 'square'
    },
    {
        id: 'paint-6',
        title: 'The Silent Room',
        year: '2024',
        category: 'painting',
        medium: 'Oil on Canvas',
        dimensions: '180 x 110 cm',
        description: 'Architectural abstraction.',
        image: '/works/uploaded_image_4_1768921094747.jpg',
        aspectRatio: 'square'
    },
    {
        id: 'paint-7',
        title: 'Unfolding Light',
        year: '2024',
        category: 'painting',
        medium: 'Oil on Wood',
        dimensions: '70 x 120 cm',
        description: 'Layered transparencies.',
        image: '/works/uploaded_image_3_1768921094747.jpg',
        aspectRatio: 'square'
    },

    // DESIGN
    {
        id: 'design-1',
        title: 'Structural Systems',
        year: '2024',
        category: 'design',
        medium: 'Digital Architecture',
        dimensions: 'Modular',
        description: 'Visual systems for contemporary cultural brands.',
        image: '/works/uploaded_image_0_1768921094747.png',
        aspectRatio: 'square'
    },
    {
        id: 'design-2',
        title: 'The Grid Monograph',
        year: '2023',
        category: 'design',
        medium: 'Editorial Design',
        dimensions: '240 x 320 mm',
        description: 'A book on Swiss typography.',
        image: '/works/uploaded_image_2_1768921094747.png',
        aspectRatio: 'square'
    },
    {
        id: 'design-3',
        title: 'Kinetic Systems',
        year: '2024',
        category: 'design',
        medium: 'Digital Product',
        dimensions: 'Responsive',
        description: 'Motion-first interface design.',
        image: '/works/uploaded_image_1_1768921094747.png',
        aspectRatio: 'square'
    },
    {
        id: 'design-4',
        title: 'Gallery E Identity',
        year: '2023',
        category: 'design',
        medium: 'Branding',
        dimensions: 'Global System',
        description: 'Minimal identity for a contemporary gallery.',
        image: '/works/uploaded_image_4_1768921094747.jpg',
        aspectRatio: 'square'
    },
    {
        id: 'design-5',
        title: 'Object Series',
        year: '2024',
        category: 'design',
        medium: 'Product Design',
        dimensions: 'Varied',
        description: 'A study in essential geometry.',
        image: '/works/uploaded_image_3_1768921094747.jpg',
        aspectRatio: 'square'
    },
    {
        id: 'design-6',
        title: 'Archive 01',
        year: '2024',
        category: 'design',
        medium: 'Web Design',
        dimensions: 'Digital Platform',
        description: 'Digital archive for a photographic collection.',
        image: '/works/uploaded_image_0_1768921094747.png',
        aspectRatio: 'square'
    },
    {
        id: 'design-7',
        title: 'The Sound of Type',
        year: '2023',
        category: 'design',
        medium: 'Poster Series',
        dimensions: '70 x 100 cm',
        description: 'Visualizing rhythmic intervals.',
        image: '/works/uploaded_image_2_1768921094747.png',
        aspectRatio: 'square'
    }
];
