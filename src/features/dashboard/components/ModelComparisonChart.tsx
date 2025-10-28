import { memo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ModelComparisonData } from '../types';
import {
  CHART_COLORS,
  CHART_DIMENSIONS,
  DEFAULT_CARTESIAN_GRID_PROPS,
  DEFAULT_X_AXIS_PROPS,
  DEFAULT_Y_AXIS_PROPS,
  DEFAULT_TOOLTIP_PROPS,
  CHART_DATA_LABELS,
} from '@/constants';

interface ModelComparisonChartProps {
  data: ModelComparisonData[];
  showCost?: boolean;
}

/**
 * ModelComparisonChart displays performance comparison across different AI models
 * Memoized to prevent unnecessary re-renders when props don't change
 */
export const ModelComparisonChart = memo(function ModelComparisonChart({ data, showCost = false }: ModelComparisonChartProps) {
  const { primary } = CHART_COLORS;
  const barRadius: [number, number, number, number] = [8, 8, 0, 0];

  return (
    <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.defaultHeight}>
      <BarChart data={data}>
        <CartesianGrid {...DEFAULT_CARTESIAN_GRID_PROPS} />
        <XAxis dataKey="model" {...DEFAULT_X_AXIS_PROPS} />
        <YAxis {...DEFAULT_Y_AXIS_PROPS} />
        <Tooltip {...DEFAULT_TOOLTIP_PROPS} />
        <Legend />
        <Bar dataKey="quality" fill={primary.satisfaction} name={CHART_DATA_LABELS.quality} radius={barRadius} />
        <Bar dataKey="speed" fill={primary.speed} name={CHART_DATA_LABELS.speed} radius={barRadius} />
        {showCost && (
          <Bar dataKey="cost" fill={primary.quality} name={CHART_DATA_LABELS.cost} radius={barRadius} />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
});
