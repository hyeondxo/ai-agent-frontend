import type {
  TestResult,
  ComparisonData,
  ResponseExample,
  ValidationMetrics,
} from '@/types/results';

/**
 * Mock A/B test results
 */
export const mockTestResults: TestResult[] = [
  {
    id: 'test-1',
    prompt: '고객 지원 v1 (Zero-shot)',
    model: 'GPT-4',
    qualityScore: 85,
    speedScore: 78,
    costScore: 70,
    avgResponseTime: 1.8,
    totalCost: 0.45,
    userSatisfaction: 4.2,
  },
  {
    id: 'test-2',
    prompt: '고객 지원 v2 (Few-shot)',
    model: 'GPT-4',
    qualityScore: 92,
    speedScore: 75,
    costScore: 68,
    avgResponseTime: 2.1,
    totalCost: 0.52,
    userSatisfaction: 4.7,
  },
  {
    id: 'test-3',
    prompt: '고객 지원 v2 (Few-shot)',
    model: 'Claude-3',
    qualityScore: 88,
    speedScore: 82,
    costScore: 75,
    avgResponseTime: 1.6,
    totalCost: 0.38,
    userSatisfaction: 4.5,
  },
];

/**
 * Mock comparison data across multiple metrics
 */
export const mockComparisonData: ComparisonData[] = [
  { metric: '정확도', v1: 85, v2: 92, claude: 88 },
  { metric: '속도', v1: 78, v2: 75, claude: 82 },
  { metric: '비용효율', v1: 70, v2: 68, claude: 75 },
  { metric: '일관성', v1: 82, v2: 90, claude: 86 },
  { metric: '관련성', v1: 88, v2: 94, claude: 90 },
];

/**
 * Mock response examples for A/B comparison
 */
export const mockResponseExamples: ResponseExample[] = [
  {
    question: '제품 배송은 얼마나 걸리나요?',
    responseV1: '일반적으로 배송은 3-5 영업일이 소요됩니다.',
    responseV2:
      '안녕하세요! 주문하신 제품의 배송은 일반 배송 기준 3-5 영업일이 소요되며, 빠른 배송을 선택하시면 1-2 영업일 내에 받아보실 수 있습니다.',
    votes: { v1: 12, v2: 38 },
  },
  {
    question: '환불 정책이 어떻게 되나요?',
    responseV1: '구매 후 30일 이내에 환불 가능합니다.',
    responseV2:
      '고객님의 만족을 최우선으로 생각합니다. 제품 수령 후 30일 이내에 미개봉 상태로 반품하시면 전액 환불해드리며, 개봉하신 경우에도 제품 상태에 따라 부분 환불이 가능합니다.',
    votes: { v1: 8, v2: 42 },
  },
];

/**
 * Mock AI evaluation metrics
 */
export const mockEvaluationMetrics: ValidationMetrics[] = [
  { name: '정확성', score: 92, color: '#10b981', status: 'excellent' },
  { name: '관련성', score: 94, color: '#3b82f6', status: 'excellent' },
  { name: '완전성', score: 88, color: '#8b5cf6', status: 'good' },
  { name: '일관성', score: 90, color: '#06b6d4', status: 'excellent' },
  { name: '톤&스타일', score: 85, color: '#f59e0b', status: 'good' },
];

/**
 * Mock winner configuration (best performing combination)
 */
export const mockWinner = {
  name: '고객 지원 v2 (Few-shot) + GPT-4',
  qualityScore: 92,
  responseTime: 2.1,
  cost: 0.52,
} as const;

/**
 * Mock evaluation insights
 */
export const mockEvaluationInsights = {
  totalVoters: 100,
  preferencePercentage: 76,
  summary:
    '총 100명의 사용자 중 76%가 Few-shot 프롬프트(v2)를 선호했습니다. 더 자세하고 친절한 답변이 높은 평가를 받았습니다.',
  reasons: [
    '✓ 답변이 질문과 높은 관련성을 보임 (94점)',
    '✓ 정확하고 사실에 기반한 정보 제공 (92점)',
    '✓ 일관된 톤과 스타일 유지 (90점)',
    '⚠ 일부 답변에서 완전성 개선 여지 있음 (88점)',
  ],
} as const;
