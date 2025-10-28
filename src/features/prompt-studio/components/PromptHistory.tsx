/**
 * PromptHistory Component
 * 프롬프트 히스토리 표시
 */

import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History } from 'lucide-react';
import type { PromptHistory as PromptHistoryType } from '@/types/prompt';

interface PromptHistoryProps {
  history: PromptHistoryType[];
}

export function PromptHistory({ history }: PromptHistoryProps) {
  const navigate = useNavigate();
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-blue-400" />
        <h3 className="text-white">프롬프트 히스토리</h3>
      </div>
      <div className="space-y-2">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/prompt-studio/history/${item.id}`)}
            className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm">{item.name}</span>
              <Badge variant="secondary" className="text-xs">
                {item.quality}점
              </Badge>
            </div>
            <p className="text-xs text-white/60">{item.date}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
