/**
 * Results Validation Page
 * 결과 & 검증 - 리팩토링 완료
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Copy, TrendingUp } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useTestResults } from '@/features/results/hooks/useTestResults';
import {
  WinnerCard,
  TestResultCards,
  DetailedAnalysisTabs,
} from '@/features/results/components';

export function ResultsValidationPage() {
  const navigate = useNavigate();
  // Use custom hook for data
  const {
    testResults,
    topThreeTests,
    comparisonData,
    responseExamples,
    evaluationMetrics,
    winner,
  } = useTestResults();

  // State for selected test (default to winner/first test)
  const [selectedTestId, setSelectedTestId] = useState<string>(
    testResults[0]?.id || ''
  );

  // Find selected test object
  const selectedTest = testResults.find((test) => test.id === selectedTestId);

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
            단계 4/4
          </Badge>
        </div>
      </div>

      {/* Winner Card */}
      <WinnerCard winner={winner} />

      {/* Test Results Comparison */}
      <TestResultCards
        testResults={testResults}
        selectedTestId={selectedTestId}
        onSelectTest={setSelectedTestId}
      />

      {/* Detailed Analysis */}
      <DetailedAnalysisTabs
        comparisonData={comparisonData}
        responseExamples={responseExamples}
        evaluationMetrics={evaluationMetrics}
        selectedTest={selectedTest}
        topThreeTests={topThreeTests}
      />

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" className="border-white/10 !text-black hover:!text-black">
          <Download className="w-4 h-4 mr-2" />
          결과 다운로드
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 !text-black hover:!text-black">
            <Copy className="w-4 h-4 mr-2" />
            결과 복사
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
            onClick={() => navigate(ROUTES.DEPLOYMENT)}
          >
            배포하기
            <TrendingUp className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
