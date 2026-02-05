/** @type {import('next').NextConfig} */
const nextConfig = {
    // Use 'export' for static drag-and-drop or leave it out for Git-based deployment
    output: 'export',
    images: {
        unoptimized: true, // Required for static export
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
};

export default nextConfig;
