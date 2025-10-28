import { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MetricCardProps } from '../types';

/**
 * MetricCard component displays a key performance metric with trend indicator
 * and optional progress bar
 * Memoized to prevent unnecessary re-renders when props don't change
 */
export const MetricCard = memo(function MetricCard({
  title,
  value,
  unit,
  icon,
  trend,
  progress,
  progressLabel,
  bgGradient,
  iconColor,
  trendColor,
  extra,
}: MetricCardProps) {
  const TrendIcon = trend?.direction === 'up' ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${bgGradient} rounded-xl`}>
          <div className={iconColor}>{icon}</div>
        </div>
        {trend && (
          <Badge className={`${trendColor}`}>
            <TrendIcon className="w-3 h-3 mr-1" />
            {trend.value}
          </Badge>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-sm text-white/60">{title}</p>
        <div className="flex items-end gap-2">
          <span className="text-3xl text-white">{value}</span>
          {unit && <span className="text-lg text-white/60 mb-1">{unit}</span>}
        </div>
        {progress !== undefined && (
          <div className="flex items-center gap-2">
            <Progress value={progress} className="flex-1" />
            {progressLabel && <span className="text-xs text-white/60">{progressLabel}</span>}
          </div>
        )}
        {extra && <div className="mt-2">{extra}</div>}
      </div>
    </Card>
  );
});
