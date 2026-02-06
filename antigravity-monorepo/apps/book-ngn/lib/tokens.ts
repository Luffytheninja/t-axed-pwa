/**
 * book-ngn Design Tokens
 *
 * Local copy of the Antigravity design system tokens.
 * Monochrome-first, high contrast, and performant defaults.
 */

export const tokens = {
  colors: {
    // Primary: Trust & Authority (Navy)
    primary: {
      DEFAULT: '#0F2940',
      light: '#1E4A6D',
    },
    // Accent: Warmth & Hope (Coral)
    accent: {
      DEFAULT: '#D45D4C',
      light: '#E8887B',
    },
    // Neutrals
    background: '#FAFAF8',
    foreground: '#0F2940',
    muted: {
      DEFAULT: '#F5F3F0',
      foreground: '#5C6B7A',
    },
    // Surface
    surface: {
      card: '#FFFFFF',
      glass: 'rgba(255, 255, 255, 0.1)',
    },
  },

  // Warm Tech Geometry
  radii: {
    none: '0',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    full: '9999px',
    warm: '2rem', // Signature soft corners
  },

  // Purposeful Motion
  durations: {
    fast: '150ms',
    standard: '300ms',
    slow: '500ms',
  },

  easings: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    warm: 'cubic-bezier(0.23, 1, 0.32, 1)', // Smooth deceleration
  },

  // WCAG 2.2 Compliant Spacing
  spacing: {
    touch: '44px', // Minimum touch target size
    gutter: '1.5rem',
  },
} as const;

export type Tokens = typeof tokens;
