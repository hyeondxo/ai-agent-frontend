/**
 * Theme constants and styling variables
 *
 * This file centralizes all theme-related constants including
 * colors, backgrounds, borders, and common style patterns.
 */

/**
 * Color palette
 */
export const COLORS = {
  /** Text colors */
  text: {
    primary: 'text-white',
    secondary: 'text-white/60',
    muted: 'text-white/40',
    accent: 'text-purple-400',
  },

  /** Background colors */
  background: {
    /** Main gradient background */
    main: 'bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950',
    /** Card background with blur */
    card: 'bg-white/5 backdrop-blur-xl',
    /** Alternative card background (darker) */
    cardDark: 'bg-black/30 backdrop-blur-xl',
    /** Hover background */
    hover: 'hover:bg-white/5',
  },

  /** Border colors */
  border: {
    primary: 'border-white/10',
    secondary: 'border-white/20',
    accent: 'border-purple-500/30',
  },

  /** Brand gradient colors */
  gradient: {
    /** Purple to blue gradient */
    purpleBlue: 'bg-gradient-to-br from-purple-500 to-blue-500',
    /** Purple to blue with transparency */
    purpleBlueSubtle: 'bg-gradient-to-r from-purple-500/20 to-blue-500/20',
    /** Green gradient */
    green: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
    /** Blue gradient */
    blue: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    /** Amber gradient */
    amber: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
    /** Purple gradient */
    purple: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
  },

  /** Status colors */
  status: {
    success: {
      bg: 'bg-green-500/20',
      text: 'text-green-400',
      border: 'border-green-500/30',
    },
    warning: {
      bg: 'bg-amber-500/20',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
    },
    error: {
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      border: 'border-red-500/30',
    },
    info: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
  },
} as const;

/**
 * Common style patterns
 */
export const STYLES = {
  /** Card base style */
  card: `${COLORS.background.card} ${COLORS.border.primary}`,

  /** Card with dark background */
  cardDark: `${COLORS.background.cardDark} ${COLORS.border.primary}`,

  /** Interactive element (clickable) */
  interactive: 'transition-all cursor-pointer',

  /** Focus ring */
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-purple-500/50',

  /** Disabled state */
  disabled: 'opacity-50 cursor-not-allowed',
} as const;

/**
 * Spacing constants (following Tailwind spacing scale)
 */
export const SPACING = {
  /** Component padding */
  padding: {
    page: 'p-8',
    card: 'p-6',
    cardSmall: 'p-4',
    cardLarge: 'p-8',
  },

  /** Margin */
  margin: {
    section: 'mb-6',
    element: 'mb-4',
    small: 'mb-2',
  },

  /** Gap between flex/grid items */
  gap: {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6',
  },

  /** Space between sections */
  space: {
    small: 'space-y-2',
    medium: 'space-y-4',
    large: 'space-y-6',
  },
} as const;

/**
 * Border radius constants
 */
export const RADIUS = {
  small: 'rounded-md',
  medium: 'rounded-lg',
  large: 'rounded-xl',
  full: 'rounded-full',
} as const;

/**
 * Shadow configurations
 */
export const SHADOW = {
  small: 'shadow-sm',
  medium: 'shadow-md',
  large: 'shadow-lg',
  glow: 'shadow-lg shadow-purple-500/20',
} as const;

/**
 * Typography scale
 */
export const TYPOGRAPHY = {
  /** Heading sizes */
  heading: {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
  },

  /** Body text */
  body: {
    large: 'text-base',
    medium: 'text-sm',
    small: 'text-xs',
  },

  /** Font weights */
  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
} as const;

/**
 * Layout dimensions
 */
export const LAYOUT = {
  /** Sidebar width */
  sidebarWidth: 'w-72',

  /** Icon sizes */
  icon: {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
    xlarge: 'w-8 h-8',
  },

  /** Logo size */
  logo: 'w-10 h-10',

  /** Container max width */
  containerMaxWidth: 'max-w-7xl',
} as const;

/**
 * Transition configurations
 */
export const TRANSITION = {
  fast: 'transition-all duration-150',
  normal: 'transition-all duration-300',
  slow: 'transition-all duration-500',
} as const;

/**
 * Z-index layers
 */
export const Z_INDEX = {
  dropdown: 'z-10',
  sticky: 'z-20',
  modal: 'z-30',
  popover: 'z-40',
  tooltip: 'z-50',
} as const;

/**
 * Common component class combinations
 */
export const COMPONENT_STYLES = {
  /** Sidebar navigation item (inactive) */
  navItemInactive: `w-full flex items-center gap-3 px-4 py-3 rounded-lg ${TRANSITION.normal} ${COLORS.text.secondary} ${COLORS.background.hover}`,

  /** Sidebar navigation item (active) */
  navItemActive: `w-full flex items-center gap-3 px-4 py-3 rounded-lg ${TRANSITION.normal} ${COLORS.text.primary} ${COLORS.gradient.purpleBlueSubtle} border ${COLORS.border.accent}`,

  /** Logo container */
  logo: `${LAYOUT.logo} ${COLORS.gradient.purpleBlue} ${RADIUS.large} flex items-center justify-center`,

  /** Page header */
  pageHeader: `flex items-center justify-between ${SPACING.margin.section}`,

  /** Chart card */
  chartCard: `${STYLES.card} ${SPACING.padding.card} ${RADIUS.medium}`,

  /** Metric card */
  metricCard: `${STYLES.card} ${SPACING.padding.card} ${RADIUS.medium} ${TRANSITION.normal} hover:border-white/20`,

  /** Badge */
  badge: `text-xs px-2 py-1 ${RADIUS.medium} border`,

  /** Button ghost variant */
  buttonGhost: `${COLORS.text.secondary} ${COLORS.background.hover} ${TRANSITION.normal}`,
} as const;

/**
 * Helper function to combine class names
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Helper to get status color classes
 */
export function getStatusColors(status: 'success' | 'warning' | 'error' | 'info') {
  return COLORS.status[status];
}

/**
 * Helper to get gradient classes by type
 */
export function getGradientClass(type: keyof typeof COLORS.gradient): string {
  return COLORS.gradient[type];
}
