import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';
import type { AgentStatus } from '@/types/agent';

/**
 * Agent status badge props
 */
interface AgentStatusBadgeProps {
  status: AgentStatus;
  showDot?: boolean;
}

/**
 * Status configuration
 */
const statusConfig: Record<
  AgentStatus,
  {
    label: string;
    className: string;
  }
> = {
  active: {
    label: '활성',
    className: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  inactive: {
    label: '비활성',
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  archived: {
    label: '보관됨',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
};

/**
 * Agent status badge component
 */
export function AgentStatusBadge({ status, showDot = true }: AgentStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={config.className}>
      {showDot && <Circle className="w-2 h-2 mr-1 fill-current" />}
      {config.label}
    </Badge>
  );
}
