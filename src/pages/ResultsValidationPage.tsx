/**
 * Results Validation Page
 * 결과 & 검증 - 리팩토링 완료
 */

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Copy, TrendingUp } from 'lucide-react';
import { useUserMode } from '@/contexts/UserModeContext';
import { useTestResults } from '@/features/results/hooks/useTestResults';
import {
  WinnerCard,
  TestResultCards,
  DetailedAnalysisTabs,
} from '@/features/results/components';

export function ResultsValidationPage() {
  const { userMode } = useUserMode();
  const isExpertMode = userMode === 'expert';

  // Use custom hook for data
  const {
    testResults,
    comparisonData,
    responseExamples,
    evaluationMetrics,
    winner,
  } = useTestResults();

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">결과 & 검증</h1>
          <p className="text-white/60">A/B 테스트 결과 분석 및 품질 평가</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            단계 3/3
          </Badge>
        </div>
      </div>

      {/* Winner Card */}
      <WinnerCard winner={winner} />

      {/* Test Results Comparison */}
      <TestResultCards
        testResults={testResults}
        isExpertMode={isExpertMode}
        winnerIndex={1}
      />

      {/* Detailed Analysis */}
      <DetailedAnalysisTabs
        isExpertMode={isExpertMode}
        comparisonData={comparisonData}
        responseExamples={responseExamples}
        evaluationMetrics={evaluationMetrics}
      />

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" className="border-white/10">
          <Download className="w-4 h-4 mr-2" />
          결과 다운로드
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10">
            <Copy className="w-4 h-4 mr-2" />
            결과 복사
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            배포하기
            <TrendingUp className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
