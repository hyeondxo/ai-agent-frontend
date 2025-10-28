/**
 * Chart configuration and styling constants
 *
 * This file centralizes all chart-related configurations including
 * colors, gradients, and default Recharts options.
 */

/**
 * Chart color palette
 */
export const CHART_COLORS = {
  /** Primary colors for main metrics */
  primary: {
    quality: '#10b981',    // green
    speed: '#3b82f6',      // blue
    cost: '#f59e0b',       // amber
    satisfaction: '#8b5cf6', // purple
  },

  /** Model-specific colors (matches AI_MODELS) */
  models: {
    'gpt-4': '#8b5cf6',      // purple
    'claude-3': '#3b82f6',    // blue
    'gemini-pro': '#06b6d4',  // cyan
    'llama-2': '#10b981',     // green
  },

  /** Gradient colors for area charts */
  gradients: {
    quality: {
      start: '#10b981',
      end: '#10b981',
      startOpacity: 0.3,
      endOpacity: 0,
    },
    speed: {
      start: '#3b82f6',
      end: '#3b82f6',
      startOpacity: 0.3,
      endOpacity: 0,
    },
    cost: {
      start: '#f59e0b',
      end: '#f59e0b',
      startOpacity: 0.3,
      endOpacity: 0,
    },
  },

  /** Metric badge colors */
  badges: {
    green: '#10b981',
    blue: '#3b82f6',
    amber: '#f59e0b',
    purple: '#8b5cf6',
    cyan: '#06b6d4',
    pink: '#ec4899',
    orange: '#f97316',
    emerald: '#059669',
  },

  /** Status colors */
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
} as const;

/**
 * Chart grid configuration
 */
export const CHART_GRID = {
  /** Grid line dash pattern */
  strokeDasharray: '3 3',
  /** Grid line color (white with 10% opacity) */
  stroke: 'rgba(255, 255, 255, 0.1)',
} as const;

/**
 * Chart axis configuration
 */
export const CHART_AXIS = {
  /** Axis line color (white with 50% opacity) */
  stroke: 'rgba(255, 255, 255, 0.5)',
  /** Axis label style */
  style: {
    fontSize: 12,
    fill: 'rgba(255, 255, 255, 0.6)',
  },
} as const;

/**
 * Chart tooltip configuration
 */
export const CHART_TOOLTIP = {
  /** Tooltip background color */
  backgroundColor: '#1a1a2e',
  /** Tooltip border */
  border: '1px solid rgba(255, 255, 255, 0.2)',
  /** Tooltip border radius */
  borderRadius: '8px',
  /** Tooltip padding */
  padding: '12px',
} as const;

/**
 * Chart legend configuration
 */
export const CHART_LEGEND = {
  /** Legend text color */
  color: 'rgba(255, 255, 255, 0.8)',
  /** Legend item style */
  iconType: 'circle' as const,
  /** Legend font size */
  fontSize: 12,
} as const;

/**
 * Recharts CartesianGrid default props
 */
export const DEFAULT_CARTESIAN_GRID_PROPS = {
  strokeDasharray: CHART_GRID.strokeDasharray,
  stroke: CHART_GRID.stroke,
} as const;

/**
 * Recharts XAxis default props
 */
export const DEFAULT_X_AXIS_PROPS = {
  stroke: CHART_AXIS.stroke,
  style: CHART_AXIS.style,
} as const;

/**
 * Recharts YAxis default props
 */
export const DEFAULT_Y_AXIS_PROPS = {
  stroke: CHART_AXIS.stroke,
  style: CHART_AXIS.style,
} as const;

/**
 * Recharts Tooltip default props
 */
export const DEFAULT_TOOLTIP_PROPS = {
  contentStyle: {
    backgroundColor: CHART_TOOLTIP.backgroundColor,
    border: CHART_TOOLTIP.border,
    borderRadius: CHART_TOOLTIP.borderRadius,
    padding: CHART_TOOLTIP.padding,
  },
} as const;

/**
 * Default chart dimensions
 */
export const CHART_DIMENSIONS = {
  /** Default chart height in pixels */
  defaultHeight: 250,
  /** Small chart height */
  smallHeight: 200,
  /** Large chart height */
  largeHeight: 350,
  /** Radar chart size */
  radarSize: 300,
} as const;

/**
 * Chart animation configuration
 */
export const CHART_ANIMATION = {
  /** Animation duration in milliseconds */
  duration: 800,
  /** Animation easing function */
  easing: 'ease-in-out' as const,
} as const;

/**
 * Helper function to create gradient definitions for area charts
 */
export function createGradientDefs(id: string, color: string, opacity = 0.3) {
  return {
    id,
    x1: '0',
    y1: '0',
    x2: '0',
    y2: '1',
    stops: [
      { offset: '5%', stopColor: color, stopOpacity: opacity },
      { offset: '95%', stopColor: color, stopOpacity: 0 },
    ],
  };
}

/**
 * Chart data key labels (Korean)
 */
export const CHART_DATA_LABELS = {
  quality: '품질',
  speed: '속도',
  cost: '비용효율',
  costValue: '비용',
  accuracy: '정확도',
  consistency: '일관성',
  relevance: '관련성',
  current: '현재',
  baseline: '기준선',
  time: '시간',
  model: '모델',
} as const;

/**
 * Chart type definitions for type safety
 */
export type ChartType = 'area' | 'bar' | 'line' | 'pie' | 'radar';
export type ChartColorKey = keyof typeof CHART_COLORS.primary;
export type ModelColorKey = keyof typeof CHART_COLORS.models;
export type StatusColorKey = keyof typeof CHART_COLORS.status;
