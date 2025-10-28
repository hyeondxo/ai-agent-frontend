import { memo } from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { RadarDataPoint } from '../types';
import { CHART_COLORS, CHART_DIMENSIONS, CHART_DATA_LABELS } from '@/constants';

interface PerformanceRadarChartProps {
  data: RadarDataPoint[];
}

/**
 * PerformanceRadarChart displays comprehensive performance profile
 * comparing current metrics against baseline
 * Memoized to prevent unnecessary re-renders when props don't change
 */
export const PerformanceRadarChart = memo(function PerformanceRadarChart({ data }: PerformanceRadarChartProps) {
  const { primary } = CHART_COLORS;

  return (
    <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.smallHeight}>
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
        <PolarAngleAxis dataKey="metric" stroke="rgba(255, 255, 255, 0.6)" />
        <PolarRadiusAxis stroke="rgba(255, 255, 255, 0.4)" />
        <Radar
          name={CHART_DATA_LABELS.current}
          dataKey="current"
          stroke={primary.satisfaction}
          fill={primary.satisfaction}
          fillOpacity={0.3}
        />
        <Radar
          name={CHART_DATA_LABELS.baseline}
          dataKey="baseline"
          stroke={primary.speed}
          fill={primary.speed}
          fillOpacity={0.1}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
});
