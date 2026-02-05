import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx}" // Scan shared UI components
    ],
    theme: {
        extend: {
            colors: {
                // BookNGN "Lagos Noir" Theme
                background: '#0A0A0A', // Warm Black
                foreground: '#F5F5F3', // Off-white text

                primary: {
                    DEFAULT: '#10B981', // Emerald 500
                    foreground: '#FFFFFF',
                    dark: '#059669', // Emerald 600
                },

                accent: {
                    DEFAULT: '#D4AF37', // Gold (from Philosophy)
                    foreground: '#000000',
                },

                muted: {
                    DEFAULT: '#18181B', // Zinc 900
                    foreground: '#A1A1AA', // Zinc 400
                },

                surface: {
                    base: '#0A0A0A',
                    card: '#18181B', // Zinc 900
                    glass: 'rgba(255, 255, 255, 0.03)',
                    border: 'rgba(255, 255, 255, 0.08)',
                },
            },
            borderRadius: {
                'warm': '2rem', // Signature soft corners
            },
            transitionDuration: {
                'fast': '150ms',
                'standard': '300ms',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
};
export default config;
