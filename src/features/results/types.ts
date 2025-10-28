/**
 * Results Feature Types
 * 결과 및 검증 기능의 타입 정의
 */

/**
 * 테스트 결과
 */
export interface TestResult {
  id: string;
  prompt: string;
  model: string;
  qualityScore: number;
  speedScore: number;
  costScore: number;
  avgResponseTime: number;
  totalCost: string;
  userSatisfaction: number;
}

/**
 * 비교 데이터
 */
export interface ComparisonData {
  metric: string;
  v1: number;
  v2: number;
  claude?: number;
}

/**
 * 응답 예시
 */
export interface ResponseExample {
  question: string;
  responseV1: string;
  responseV2: string;
  votes: {
    v1: number;
    v2: number;
  };
}

/**
 * 평가 지표
 */
export interface EvaluationMetric {
  name: string;
  score: number;
  status: 'excellent' | 'good' | 'warning';
  color: string;
}

/**
 * WinnerCard Props
 */
export interface WinnerCardProps {
  winner: {
    name: string;
    qualityScore: number;
    responseTime: number;
    cost: string;
  };
  onShare?: () => void;
  onUse?: () => void;
}

/**
 * TestResultCards Props
 */
export interface TestResultCardsProps {
  testResults: TestResult[];
  isExpertMode: boolean;
  winnerIndex?: number;
}

/**
 * DetailedAnalysisTabs Props
 */
export interface DetailedAnalysisTabsProps {
  isExpertMode: boolean;
  comparisonData: ComparisonData[];
  responseExamples: ResponseExample[];
  evaluationMetrics: EvaluationMetric[];
}
