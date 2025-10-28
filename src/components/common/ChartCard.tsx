import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface ChartCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

/**
 * ChartCard component provides a consistent wrapper for chart visualizations
 */
export function ChartCard({ title, description, icon, children }: ChartCardProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white mb-1">{title}</h3>
          <p className="text-sm text-white/60">{description}</p>
        </div>
        {icon}
      </div>
      {children}
    </Card>
  );
}
