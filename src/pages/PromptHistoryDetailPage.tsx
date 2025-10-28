/**
 * Prompt History Detail Page
 * 프롬프트 히스토리 상세 정보 페이지
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Clock,
  Coins,
  MessageSquare,
  Zap,
  Calendar,
  Code2,
  ArrowLeft,
  Copy,
  Check,
} from 'lucide-react';
import { mockPromptHistory } from '@/data/mockPrompts';

export function PromptHistoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  // Find the history item by ID
  const history = mockPromptHistory.find((h) => h.id === Number(id));

  // If history not found, show error
  if (!history) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/prompt-studio')}
            className="border-white/10 !text-white hover:!text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
        </div>
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 text-center">
          <p className="text-white/60">히스토리를 찾을 수 없습니다.</p>
        </Card>
      </div>
    );
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatResponseTime = (ms: number) => {
    return `${(ms / 1000).toFixed(2)}초`;
  };

  const formatCost = (cost: number) => {
    return `$${cost.toFixed(4)}`;
  };

  const handleCopyPrompt = async () => {
    if (history?.fullPrompt) {
      try {
        await navigator.clipboard.writeText(history.fullPrompt);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy prompt:', err);
      }
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/prompt-studio')}
          className="border-white/10 !text-white hover:!text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>
      </div>

      {/* Page Title */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Code2 className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl text-white">{history.name}</h1>
        </div>
        <p className="text-white/60 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {formatTimestamp(history.timestamp)}
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="space-y-6 pr-4">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-white/60">모델</span>
              </div>
              <p className="text-lg font-semibold text-white">
                {history.modelName}
              </p>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-xs text-white/60">응답 시간</span>
              </div>
              <p className="text-lg font-semibold text-white">
                {formatResponseTime(history.responseTime)}
              </p>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-white/60">토큰 사용량</span>
              </div>
              <p className="text-lg font-semibold text-white">
                {history.tokensUsed.total.toLocaleString()}
              </p>
              <p className="text-xs text-white/40">
                P: {history.tokensUsed.prompt} / C: {history.tokensUsed.completion}
              </p>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-white/60">비용</span>
              </div>
              <p className="text-lg font-semibold text-white">
                {formatCost(history.cost)}
              </p>
            </Card>
          </div>

          {/* Quality Score */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60">품질 점수</span>
              <Badge
                variant="secondary"
                className={`${
                  history.quality >= 90
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : history.quality >= 80
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}
              >
                {history.quality}점
              </Badge>
            </div>
          </Card>

          <Separator className="bg-white/10" />

          {/* Full Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                프롬프트 템플릿
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyPrompt}
                className="border-white/10 !text-white hover:!text-white"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-green-400" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    복사
                  </>
                )}
              </Button>
            </div>
            <Card className="bg-black/30 backdrop-blur-xl border-white/10 p-4">
              <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono">
                {history.fullPrompt}
              </pre>
            </Card>
          </div>

          <Separator className="bg-white/10" />

          {/* Output */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              모델 출력
            </h3>
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
              <div className="text-sm text-white/80 whitespace-pre-wrap">
                {history.output}
              </div>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
