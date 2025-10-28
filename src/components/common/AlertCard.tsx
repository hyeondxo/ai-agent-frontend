import { LucideIcon } from 'lucide-react';

interface AlertCardProps {
  type: 'success' | 'warning' | 'info';
  icon: LucideIcon;
  title: string;
  description: string;
  timestamp: string;
}

/**
 * AlertCard component displays system alerts and notifications
 */
export function AlertCard({ type, icon: Icon, title, description, timestamp }: AlertCardProps) {
  const colorMap = {
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      icon: 'text-green-400',
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      icon: 'text-amber-400',
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      icon: 'text-blue-400',
    },
  };

  const colors = colorMap[type];

  return (
    <div className={`flex items-start gap-3 p-4 ${colors.bg} border ${colors.border} rounded-lg`}>
      <Icon className={`w-5 h-5 ${colors.icon} mt-0.5`} />
      <div className="flex-1">
        <p className="text-white mb-1">{title}</p>
        <p className="text-sm text-white/60">{description}</p>
      </div>
      <span className="text-xs text-white/40">{timestamp}</span>
    </div>
  );
}
