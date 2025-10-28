/**
 * Results Feature Types
 * 결과 및 검증 기능의 타입 정의
 */

/**
 * 테스트 질문과 답변
 */
export interface TestQuestion {
  id: string;
  question: string;
  answer: string;
  rating?: number;
}

/**
 * 테스트 결과
 */
export interface TestResult {
  id: string;
  prompt: string;
  model: string;
  testSetId?: string;
  promptTemplate?: string;
  qualityScore: number;
  speedScore: number;
  costScore: number;
  avgResponseTime: number;
  totalCost: number;
  userSatisfaction: number;
  overallScore: number;
  questions?: TestQuestion[];
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
    overallScore: number; // Changed from qualityScore to overallScore
    responseTime: number;
    cost: string;
    promptTemplate?: string; // Full prompt template (for Collapsible display)
  };
  onShare?: () => void;
  onUse?: () => void;
}

/**
 * TestResultCards Props
 */
export interface TestResultCardsProps {
  testResults: TestResult[];
  selectedTestId?: string;
  onSelectTest?: (testId: string) => void;
}

/**
 * DetailedAnalysisTabs Props
 */
export interface DetailedAnalysisTabsProps {
  comparisonData: ComparisonData[];
  responseExamples: ResponseExample[];
  evaluationMetrics: EvaluationMetric[];
  selectedTest?: TestResult; // Selected test for showing Q&A
  topThreeTests?: TestResult[]; // Top 3 tests for comparison
}
