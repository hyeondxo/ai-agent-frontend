import { memo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CostBreakdownItem } from '../types';

interface CostBreakdownChartProps {
  data: CostBreakdownItem[];
}

/**
 * CostBreakdownChart displays cost distribution across different AI models
 * using a donut chart with legend
 * Memoized to prevent unnecessary re-renders when props don't change
 */
export const CostBreakdownChart = memo(function CostBreakdownChart({ data }: CostBreakdownChartProps) {
  return (
    <div className="flex items-center gap-6">
      <ResponsiveContainer width="60%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex-1 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-white/80">{item.name}</span>
            </div>
            <span className="text-white">${item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
