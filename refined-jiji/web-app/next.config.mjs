/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.refined-jiji.com', 'localhost'],
    },
    env: {
        API_URL: process.env.API_URL || 'http://localhost:5000/api',
    },
}

export default nextConfig
