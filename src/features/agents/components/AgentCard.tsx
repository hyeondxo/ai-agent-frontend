import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AgentStatusBadge } from './AgentStatusBadge';
import {
  MoreVertical,
  Activity,
  DollarSign,
  Target,
  TrendingUp,
  Edit,
  Trash2,
  Copy,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Agent } from '@/types/agent';
import { formatCurrency, formatPercentage } from '@/utils';

/**
 * Agent card props
 */
interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
  onEdit?: (agent: Agent) => void;
  onDelete?: (agentId: string) => void;
  onDuplicate?: (agent: Agent) => void;
}

/**
 * Agent card component
 */
export function AgentCard({ agent, onClick, onEdit, onDelete, onDuplicate }: AgentCardProps) {
  const handleActionClick = <T extends HTMLElement>(
    e: React.MouseEvent<T>,
    action: () => void
  ) => {
    e.stopPropagation();
    action();
  };

  return (
    <Card
      className="
        bg-black/30 backdrop-blur-xl border-white/10
        p-6 space-y-4
        hover:scale-105 hover:shadow-2xl hover:border-purple-500/30
        transition-all duration-300 cursor-pointer
        relative group
      "
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">{agent.name}</h3>
          {agent.description && (
            <p className="text-sm text-white/60 line-clamp-2 mt-1">{agent.description}</p>
          )}
        </div>

        {/* Action Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-white/10">
            {onEdit && (
              <DropdownMenuItem
                onClick={(e) => handleActionClick(e, () => onEdit(agent))}
                className="text-white hover:bg-white/10"
              >
                <Edit className="w-4 h-4 mr-2" />
                수정
              </DropdownMenuItem>
            )}
            {onDuplicate && (
              <DropdownMenuItem
                onClick={(e) => handleActionClick(e, () => onDuplicate(agent))}
                className="text-white hover:bg-white/10"
              >
                <Copy className="w-4 h-4 mr-2" />
                복제
              </DropdownMenuItem>
            )}
            {(onEdit || onDuplicate) && onDelete && <DropdownMenuSeparator />}
            {onDelete && (
              <DropdownMenuItem
                onClick={(e) => handleActionClick(e, () => onDelete(agent.id))}
                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                삭제
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2">
        <AgentStatusBadge status={agent.status} />
        <span className="text-xs text-white/40">{agent.config.model}</span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-2 text-white/60">
            <Activity className="w-4 h-4" />
            <span className="text-xs">요청 수</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {agent.metrics.totalRequests.toLocaleString()}
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-2 text-white/60">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs">총 비용</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {formatCurrency(agent.metrics.totalCost)}
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-2 text-white/60">
            <Target className="w-4 h-4" />
            <span className="text-xs">품질 점수</span>
          </div>
          <p className="text-lg font-semibold text-white">{agent.metrics.qualityScore}/100</p>
        </div>

        <div className="bg-white/5 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-2 text-white/60">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs">성공률</span>
          </div>
          <p className="text-lg font-semibold text-white">
            {formatPercentage(agent.metrics.successRate)}
          </p>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-purple-400">자세히 보기 →</span>
      </div>
    </Card>
  );
}
