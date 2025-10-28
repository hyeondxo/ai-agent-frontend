/**
 * Dashboard page type definitions
 */

/**
 * Performance data point over time
 */
export interface PerformanceDataPoint {
  time: string;
  quality: number;
  speed: number;
  cost: number;
}

/**
 * Model comparison metrics
 */
export interface ModelComparison {
  model: string;
  quality: number;
  speed: number;
  cost: number;
}

/**
 * Cost breakdown by model
 */
export interface CostBreakdown {
  name: string;
  value: number;
  color: string;
}

/**
 * Radar chart data for metrics comparison
 */
export interface RadarDataPoint {
  metric: string;
  current: number;
  baseline: number;
}

/**
 * Dashboard metric card data
 */
export interface MetricData {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  icon?: React.ComponentType<{ className?: string }>;
}
