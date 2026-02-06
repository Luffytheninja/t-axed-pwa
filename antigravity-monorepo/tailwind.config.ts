/**
 * Tailwind CSS v4 Configuration
 * iOS + Airbnb Default Theme
 * 
 * Maps CSS variables to Tailwind utilities for seamless integration
 * All values reference CSS custom properties for runtime theming
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  
  // Dark mode via data-theme attribute
  darkMode: ['class', '[data-theme="dark"]'],
  
  theme: {
    extend: {
      // =====================================================================
      // COLORS - Reference CSS variables
      // =====================================================================
      colors: {
        // Brand
        primary: {
          DEFAULT: 'var(--color-brand-primary)',
          light: 'var(--color-brand-primary-light)',
          dark: 'var(--color-brand-primary-dark)',
          subtle: 'var(--color-brand-primary-subtle)',
        },
        
        // Accent
        navy: {
          DEFAULT: 'var(--color-accent-navy)',
          light: 'var(--color-accent-navy-light)',
        },
        
        // Neutral scale
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
        
        // Semantic
        success: {
          DEFAULT: 'var(--color-success)',
          light: 'var(--color-success-light)',
          subtle: 'var(--color-success-subtle)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          light: 'var(--color-warning-light)',
          subtle: 'var(--color-warning-subtle)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          light: 'var(--color-error-light)',
          subtle: 'var(--color-error-subtle)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          light: 'var(--color-info-light)',
          subtle: 'var(--color-info-subtle)',
        },
        
        // Surfaces
        surface: {
          bg: 'var(--color-surface-bg)',
          'bg-subtle': 'var(--color-surface-bg-subtle)',
          1: 'var(--color-surface-1)',
          2: 'var(--color-surface-2)',
          3: 'var(--color-surface-3)',
          elevated: 'var(--color-surface-elevated)',
        },
        
        // Borders
        border: {
          DEFAULT: 'var(--color-border-default)',
          muted: 'var(--color-border-muted)',
          strong: 'var(--color-border-strong)',
          inverse: 'var(--color-border-inverse)',
        },
        
        // Overlays
        overlay: {
          light: 'var(--color-overlay-light)',
          medium: 'var(--color-overlay-medium)',
          heavy: 'var(--color-overlay-heavy)',
        },
      },

      // =====================================================================
      // SPACING - Reference CSS variables
      // =====================================================================
      spacing: {
        0: 'var(--spacing-0)',
        0.5: 'var(--spacing-0-5)',
        1: 'var(--spacing-1)',
        1.5: 'var(--spacing-1-5)',
        2: 'var(--spacing-2)',
        3: 'var(--spacing-3)',
        4: 'var(--spacing-4)',
        5: 'var(--spacing-5)',
        6: 'var(--spacing-6)',
        7: 'var(--spacing-7)',
        8: 'var(--spacing-8)',
        9: 'var(--spacing-9)',
        10: 'var(--spacing-10)',
        12: 'var(--spacing-12)',
        14: 'var(--spacing-14)',
        16: 'var(--spacing-16)',
        20: 'var(--spacing-20)',
        24: 'var(--spacing-24)',
      },

      // =====================================================================
      // BORDER RADIUS
      // =====================================================================
      borderRadius: {
        none: 'var(--radius-none)',
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        warm: 'var(--radius-warm)', // iOS + Airbnb signature
        pill: 'var(--radius-pill)',
        circle: 'var(--radius-circle)',
      },

      // =====================================================================
      // BOX SHADOWS
      // =====================================================================
      boxShadow: {
        none: 'var(--shadow-none)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        'glow-cta': 'var(--shadow-glow-cta)',
        inner: 'var(--shadow-inner)',
      },

      // =====================================================================
      // Z-INDEX
      // =====================================================================
      zIndex: {
        base: 'var(--z-base)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        toast: 'var(--z-toast)',
        tooltip: 'var(--z-tooltip)',
      },

      // =====================================================================
      // FONT FAMILIES
      // =====================================================================
      fontFamily: {
        ui: 'var(--font-ui)',
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
      },

      // =====================================================================
      // FONT WEIGHTS
      // =====================================================================
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
        black: 'var(--font-weight-black)',
      },

      // =====================================================================
      // TRANSITIONS
      // =====================================================================
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        DEFAULT: 'var(--duration-base)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },

      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // =====================================================================
      // CUSTOM UTILITIES
      // =====================================================================
      
      // Minimum touch targets (iOS HIG)
      minHeight: {
        'touch': 'var(--a11y-min-touch-target)',
        'touch-mobile': 'var(--a11y-min-touch-target-mobile)',
      },
      minWidth: {
        'touch': 'var(--a11y-min-touch-target)',
        'touch-mobile': 'var(--a11y-min-touch-target-mobile)',
      },

      // Container max widths
      maxWidth: {
        'container-sm': '640px',
        'container-md': '832px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1536px',
      },

      // Custom backdrop blur (for glass effects)
      backdropBlur: {
        glass: 'var(--glass-light-blur)',
        'glass-heavy': 'var(--glass-heavy-blur)',
      },
    },
  },

  // ===========================================================================
  // PLUGINS
  // ===========================================================================
  plugins: [
    // Custom plugin for glass effects
    function ({ addUtilities }) {
      addUtilities({
        '.glass-light': {
          background: 'var(--glass-light-bg)',
          backdropFilter: 'var(--glass-light-blur)',
          WebkitBackdropFilter: 'var(--glass-light-blur)',
          border: 'var(--glass-light-border)',
          willChange: 'backdrop-filter',
        },
        '.glass-heavy': {
          background: 'var(--glass-heavy-bg)',
          backdropFilter: 'var(--glass-heavy-blur)',
          WebkitBackdropFilter: 'var(--glass-heavy-blur)',
          border: 'var(--glass-heavy-border)',
          willChange: 'backdrop-filter',
        },
      });
    },

    // Custom plugin for focus rings
    function ({ addUtilities }) {
      addUtilities({
        '.focus-ring': {
          outline: 'var(--a11y-focus-ring-width) solid var(--color-focus-ring)',
          outlineOffset: 'var(--a11y-focus-ring-offset)',
        },
      });
    },

    // Custom plugin for iOS-style pressed states
    function ({ addUtilities }) {
      addUtilities({
        '.active-scale': {
          '@media (hover: hover)': {
            '&:active': {
              transform: 'scale(0.97)',
            },
          },
        },
      });
    },
  ],
};

export default config;
