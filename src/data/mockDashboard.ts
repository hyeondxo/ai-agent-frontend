import type {
  PerformanceDataPoint,
  ModelComparison,
  CostBreakdown,
  RadarDataPoint,
} from '@/types/dashboard';
import { AI_MODELS } from '@/constants';

/**
 * Mock performance trend data for 24-hour monitoring
 */
export const mockPerformanceData: PerformanceDataPoint[] = [
  { time: '00:00', quality: 85, speed: 92, cost: 78 },
  { time: '04:00', quality: 88, speed: 89, cost: 82 },
  { time: '08:00', quality: 92, speed: 94, cost: 85 },
  { time: '12:00', quality: 90, speed: 91, cost: 88 },
  { time: '16:00', quality: 94, speed: 96, cost: 90 },
  { time: '20:00', quality: 96, speed: 95, cost: 92 },
];

/**
 * Mock model comparison benchmark data
 * Uses AI_MODELS constants for consistency
 */
export const mockModelComparison: ModelComparison[] = [
  {
    model: AI_MODELS['gpt-4'].name,
    quality: AI_MODELS['gpt-4'].performance.quality,
    speed: AI_MODELS['gpt-4'].performance.speed,
    cost: AI_MODELS['gpt-4'].performance.costEfficiency,
  },
  {
    model: AI_MODELS['claude-3'].name,
    quality: AI_MODELS['claude-3'].performance.quality,
    speed: AI_MODELS['claude-3'].performance.speed,
    cost: AI_MODELS['claude-3'].performance.costEfficiency,
  },
  {
    model: AI_MODELS['gemini-pro'].name,
    quality: AI_MODELS['gemini-pro'].performance.quality,
    speed: AI_MODELS['gemini-pro'].performance.speed,
    cost: AI_MODELS['gemini-pro'].performance.costEfficiency,
  },
  {
    model: AI_MODELS['llama-2'].name,
    quality: AI_MODELS['llama-2'].performance.quality,
    speed: AI_MODELS['llama-2'].performance.speed,
    cost: AI_MODELS['llama-2'].performance.costEfficiency,
  },
];

/**
 * Mock cost breakdown data by model
 * Uses AI_MODELS constants for colors and names
 */
export const mockCostBreakdown: CostBreakdown[] = [
  { name: AI_MODELS['gpt-4'].name, value: 450, color: AI_MODELS['gpt-4'].color },
  { name: AI_MODELS['claude-3'].name, value: 320, color: AI_MODELS['claude-3'].color },
  { name: AI_MODELS['gemini-pro'].name, value: 180, color: AI_MODELS['gemini-pro'].color },
  { name: AI_MODELS['llama-2'].name, value: 50, color: AI_MODELS['llama-2'].color },
];

/**
 * Mock radar chart data for performance metrics
 */
export const mockRadarData: RadarDataPoint[] = [
  { metric: '정확도', current: 95, baseline: 80 },
  { metric: '속도', current: 88, baseline: 75 },
  { metric: '비용효율', current: 82, baseline: 70 },
  { metric: '일관성', current: 90, baseline: 78 },
  { metric: '관련성', current: 93, baseline: 82 },
];

/**
 * Mock key metrics data
 */
export const mockKeyMetrics = {
  qualityScore: 94,
  avgResponseTime: 1.2,
  monthlyCost: 1200,
  userSatisfaction: 4.8,
  uptime: 99.9,
} as const;
