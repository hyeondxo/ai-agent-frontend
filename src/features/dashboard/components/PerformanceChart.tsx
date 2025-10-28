import { memo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { PerformanceDataPoint } from '../types';
import {
  CHART_COLORS,
  CHART_DIMENSIONS,
  DEFAULT_CARTESIAN_GRID_PROPS,
  DEFAULT_X_AXIS_PROPS,
  DEFAULT_Y_AXIS_PROPS,
  DEFAULT_TOOLTIP_PROPS,
  CHART_DATA_LABELS,
} from '@/constants';

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  showCost?: boolean;
}

/**
 * PerformanceChart displays real-time performance trends using an area chart
 * Memoized to prevent unnecessary re-renders when props don't change
 */
export const PerformanceChart = memo(function PerformanceChart({ data, showCost = false }: PerformanceChartProps) {
  const { primary, gradients } = CHART_COLORS;

  return (
    <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.defaultHeight}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={primary.quality} stopOpacity={gradients.quality.startOpacity}/>
            <stop offset="95%" stopColor={primary.quality} stopOpacity={gradients.quality.endOpacity}/>
          </linearGradient>
          <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={primary.speed} stopOpacity={gradients.speed.startOpacity}/>
            <stop offset="95%" stopColor={primary.speed} stopOpacity={gradients.speed.endOpacity}/>
          </linearGradient>
          <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={primary.cost} stopOpacity={gradients.cost.startOpacity}/>
            <stop offset="95%" stopColor={primary.cost} stopOpacity={gradients.cost.endOpacity}/>
          </linearGradient>
        </defs>
        <CartesianGrid {...DEFAULT_CARTESIAN_GRID_PROPS} />
        <XAxis dataKey="time" {...DEFAULT_X_AXIS_PROPS} />
        <YAxis {...DEFAULT_Y_AXIS_PROPS} />
        <Tooltip {...DEFAULT_TOOLTIP_PROPS} />
        <Legend />
        <Area
          type="monotone"
          dataKey="quality"
          stroke={primary.quality}
          fillOpacity={1}
          fill="url(#colorQuality)"
          name={CHART_DATA_LABELS.quality}
        />
        <Area
          type="monotone"
          dataKey="speed"
          stroke={primary.speed}
          fillOpacity={1}
          fill="url(#colorSpeed)"
          name={CHART_DATA_LABELS.speed}
        />
        {showCost && (
          <Area
            type="monotone"
            dataKey="cost"
            stroke={primary.cost}
            fillOpacity={1}
            fill="url(#colorCost)"
            name={CHART_DATA_LABELS.cost}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
});
