/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f5e8',
          100: '#d1ebd1',
          500: '#00b53f',
          600: '#009a35',
          700: '#007a2a',
          900: '#004d1a',
        },
        secondary: {
          50: '#fff3e0',
          100: '#ffe0b2',
          500: '#ff9800',
          600: '#fb8c00',
          700: '#f57c00',
        },
        accent: {
          50: '#e3f2fd',
          100: '#bbdefb',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}