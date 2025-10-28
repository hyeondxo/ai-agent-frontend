import { ReactNode } from 'react';

/**
 * Metric card props for displaying key performance indicators
 */
export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
  progress?: number;
  progressLabel?: string;
  bgGradient: string;
  iconColor: string;
  trendColor: string;
  extra?: ReactNode;
}

/**
 * Performance chart data point
 */
export interface PerformanceDataPoint {
  time: string;
  quality: number;
  speed: number;
  cost?: number;
}

/**
 * Model comparison data point
 */
export interface ModelComparisonData {
  model: string;
  quality: number;
  speed: number;
  cost?: number;
}

/**
 * Cost breakdown item
 */
export interface CostBreakdownItem {
  name: string;
  value: number;
  color: string;
}

/**
 * Radar chart data point
 */
export interface RadarDataPoint {
  metric: string;
  current: number;
  baseline: number;
}

/**
 * Chart container props
 */
export interface ChartCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}
