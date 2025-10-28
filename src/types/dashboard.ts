/**
 * Dashboard page type definitions
 */

/**
 * Performance data point over time
 */
export interface PerformanceDataPoint {
  /** Agent ID (for multi-agent support) */
  agentId?: string;
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

/**
 * Aggregated metrics across all agents
 */
export interface AggregatedMetrics {
  /** Total number of agents */
  totalAgents: number;
  /** Total requests across all agents */
  totalRequests: number;
  /** Total cost across all agents */
  totalCost: number;
  /** Average quality score */
  avgQualityScore: number;
  /** Average response time */
  avgResponseTime: number;
  /** Average success rate */
  avgSuccessRate: number;
}
