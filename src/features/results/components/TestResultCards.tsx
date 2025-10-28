/**
 * TestResultCards Component
 * 테스트 결과 카드 - 좌우 스크롤, 종합점수 표시
 */

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award } from 'lucide-react';
import { formatTestResultTitle } from '@/utils';
import { sortTestsByOverallScore } from '@/utils';
import { TestResultCardsProps } from '../types';

export function TestResultCards({
  testResults,
  selectedTestId,
  onSelectTest,
}: TestResultCardsProps) {
  // Sort tests by overall score (highest first)
  const sortedTests = sortTestsByOverallScore(testResults);

  return (
    <div className="relative">
      {/* Grid container for top 3, then horizontal scroll for rest */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTests.slice(0, 3).map((result, index) => {
          const isSelected = selectedTestId === result.id;
          const isWinner = index === 0; // First item is the winner

          return (
            <Card
              key={result.id}
              onClick={() => onSelectTest?.(result.id)}
              className={`
                bg-white/5 backdrop-blur-xl border-white/10 p-6
                cursor-pointer transition-all hover:bg-white/10
                ${isSelected ? 'ring-2 ring-purple-500/50 bg-purple-500/10' : ''}
                ${isWinner ? 'ring-2 ring-amber-500/50' : ''}
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-white mb-1">
                    {result.testSetId
                      ? formatTestResultTitle(result.testSetId, result.model)
                      : result.prompt}
                  </h4>
                  <Badge variant="secondary" className="text-xs">
                    {result.model}
                  </Badge>
                </div>
                {isWinner && <Award className="w-5 h-5 text-amber-400" />}
              </div>

              <div className="space-y-3">
                {/* Overall Score - Yellow bar at the top */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/60">종합 점수</span>
                    <span className="text-sm text-amber-400 font-semibold">
                      {result.overallScore}/100
                    </span>
                  </div>
                  <Progress
                    value={result.overallScore}
                    className="h-2.5 bg-white/10"
                    indicatorClassName="bg-gradient-to-r from-amber-500 to-yellow-400"
                  />
                </div>

                {/* Quality */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/60">품질 점수</span>
                    <span className="text-sm text-white">{result.qualityScore}/100</span>
                  </div>
                  <Progress value={result.qualityScore} className="h-2" />
                </div>

                {/* Speed */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/60">속도 점수</span>
                    <span className="text-sm text-white">{result.speedScore}/100</span>
                  </div>
                  <Progress value={result.speedScore} className="h-2" />
                </div>

                {/* Cost Efficiency */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/60">비용 효율</span>
                    <span className="text-sm text-white">{result.costScore}/100</span>
                  </div>
                  <Progress value={result.costScore} className="h-2" />
                </div>

                {/* Metrics */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">평균 응답 시간</span>
                    <span className="text-sm text-white">{result.avgResponseTime}초</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">요청당 비용</span>
                    <span className="text-sm text-white">${result.totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">사용자 만족도</span>
                    <span className="text-sm text-white">
                      {result.userSatisfaction}/5.0
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
