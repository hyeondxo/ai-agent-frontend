/**
 * WinnerCard Component
 * 최고 성능 조합 표시 카드
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Award,
  Target,
  Zap,
  DollarSign,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { WinnerCardProps } from '../types';

export function WinnerCard({ winner, onShare, onUse }: WinnerCardProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-xl border-purple-500/30 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-white text-xl">최고 성능 조합</h3>
              <Badge className="bg-amber-500/30 text-amber-200">추천</Badge>
            </div>
            <p className="text-white/80 mb-3">{winner.name}</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-white/80 text-sm">
                  품질 점수: {winner.qualityScore}/100
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-white/80 text-sm">
                  응답 시간: {winner.responseTime}초
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span className="text-white/80 text-sm">비용: {winner.cost}/요청</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-white/20 !text-white hover:!text-white"
            onClick={onShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            공유
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
            onClick={onUse}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            이 조합 사용
          </Button>
        </div>
      </div>
    </Card>
  );
}
