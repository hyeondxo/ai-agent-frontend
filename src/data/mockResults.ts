import type {
  TestResult,
  ComparisonData,
  ResponseExample,
  ValidationMetrics,
  TestQuestion,
} from '@/types/results';
import { calculateOverallScore } from '@/utils';

/**
 * Mock prompt templates for test results
 */
const zeroShotPromptTemplate = `당신은 전문적인 AI 어시스턴트입니다. 주어진 문서를 바탕으로 사용자의 질문에 정확하고 도움이 되는 답변을 제공하세요.

{context}

질문: {question}

답변:`;

const fewShotPromptTemplate = `당신은 전문적인 AI 어시스턴트입니다. 다음 예시를 참고하여 답변하세요.

예시 1:
질문: 제품 A의 가격은?
답변: 제품 A의 가격은 $99입니다.

예시 2:
질문: 배송은 얼마나 걸리나요?
답변: 일반 배송은 3-5 영업일이 소요됩니다.

{context}

질문: {question}

답변:`;

const chainOfThoughtTemplate = `당신은 논리적으로 사고하는 AI 어시스턴트입니다. 단계적으로 생각하며 답변하세요.

먼저 문제를 분석하고, 관련 정보를 파악한 다음, 논리적으로 결론을 도출하세요.

{context}

질문: {question}

단계별 사고:
1. 문제 분석:
2. 관련 정보:
3. 결론:`;

/**
 * Test questions for different test sets
 */
const customerSupportQuestions: TestQuestion[] = [
  {
    id: 'cs-q1',
    question: '제품 배송은 얼마나 걸리나요?',
    answer: '안녕하세요! 주문하신 제품의 배송은 일반 배송 기준 3-5 영업일이 소요되며, 빠른 배송을 선택하시면 1-2 영업일 내에 받아보실 수 있습니다.',
    rating: 4.5,
  },
  {
    id: 'cs-q2',
    question: '환불 정책이 어떻게 되나요?',
    answer: '고객님의 만족을 최우선으로 생각합니다. 제품 수령 후 30일 이내에 미개봉 상태로 반품하시면 전액 환불해드리며, 개봉하신 경우에도 제품 상태에 따라 부분 환불이 가능합니다.',
    rating: 4.8,
  },
  {
    id: 'cs-q3',
    question: '제품 보증 기간은 얼마나 되나요?',
    answer: '모든 제품은 구매일로부터 1년간 무상 보증이 제공됩니다. 보증 기간 내 제조상의 결함이 발견될 경우 무료로 수리 또는 교환해드립니다.',
    rating: 4.3,
  },
  {
    id: 'cs-q4',
    question: '대량 구매 할인이 있나요?',
    answer: '10개 이상 구매 시 10% 할인, 50개 이상 시 20% 할인이 자동 적용됩니다. 100개 이상의 대량 구매는 별도 문의 주시면 맞춤 견적을 제공해드립니다.',
    rating: 4.6,
  },
  {
    id: 'cs-q5',
    question: '해외 배송도 가능한가요?',
    answer: '네, 전 세계 대부분의 국가로 배송 가능합니다. 배송비와 예상 소요 시간은 국가별로 다르며, 결제 단계에서 확인하실 수 있습니다.',
    rating: 4.2,
  },
];

const technicalSupportQuestions: TestQuestion[] = [
  {
    id: 'ts-q1',
    question: 'API 인증은 어떻게 하나요?',
    answer: 'API 키를 발급받으신 후 HTTP 헤더에 "Authorization: Bearer YOUR_API_KEY" 형식으로 포함시켜 주세요. 자세한 내용은 개발자 문서를 참조하시기 바랍니다.',
    rating: 4.7,
  },
  {
    id: 'ts-q2',
    question: '요청 제한(Rate Limit)은 어떻게 되나요?',
    answer: '기본 플랜은 분당 60회, 시간당 1000회 요청이 가능합니다. 프로 플랜은 분당 300회, 엔터프라이즈는 무제한입니다.',
    rating: 4.4,
  },
  {
    id: 'ts-q3',
    question: '에러 코드 429가 발생했어요.',
    answer: '429 에러는 요청 제한을 초과했을 때 발생합니다. 응답 헤더의 "Retry-After"를 확인하여 재시도 시간을 조정하거나, 플랜 업그레이드를 고려해 주세요.',
    rating: 4.9,
  },
  {
    id: 'ts-q4',
    question: 'Webhook 설정 방법을 알려주세요.',
    answer: '대시보드의 설정 페이지에서 Webhook URL을 등록하고 이벤트 타입을 선택하세요. POST 요청으로 이벤트가 전송되며, HMAC 서명으로 검증 가능합니다.',
    rating: 4.5,
  },
  {
    id: 'ts-q5',
    question: 'SDK는 어떤 언어를 지원하나요?',
    answer: 'Python, JavaScript/TypeScript, Java, Go, Ruby를 공식 지원합니다. 각 SDK는 GitHub에서 오픈소스로 제공되며, 커뮤니티 지원 언어도 있습니다.',
    rating: 4.6,
  },
  {
    id: 'ts-q6',
    question: '데이터는 얼마나 보관되나요?',
    answer: '기본적으로 90일간 보관되며, 엔터프라이즈 플랜은 맞춤 보관 기간 설정이 가능합니다. 필요시 데이터 export 기능을 이용하실 수 있습니다.',
    rating: 4.3,
  },
];

const productInfoQuestions: TestQuestion[] = [
  {
    id: 'pi-q1',
    question: '이 제품의 주요 기능은 무엇인가요?',
    answer: 'AI 기반 자동 분석, 실시간 대시보드, 다중 모델 지원, A/B 테스팅, 그리고 원클릭 배포 기능을 제공합니다.',
    rating: 4.5,
  },
  {
    id: 'pi-q2',
    question: '다른 제품과의 차이점은?',
    answer: '업계 최초로 GPT-4와 Claude를 동시에 비교 테스트할 수 있으며, 코드 없이도 프롬프트 엔지니어링이 가능합니다.',
    rating: 4.7,
  },
  {
    id: 'pi-q3',
    question: '시스템 요구사항이 어떻게 되나요?',
    answer: '웹 기반 서비스로 최신 브라우저만 있으면 사용 가능합니다. Chrome, Firefox, Safari, Edge를 지원합니다.',
    rating: 4.2,
  },
  {
    id: 'pi-q4',
    question: '팀 협업 기능이 있나요?',
    answer: '네, 프로젝트 공유, 역할별 권한 관리, 댓글 및 피드백, 버전 히스토리 기능을 제공합니다.',
    rating: 4.8,
  },
  {
    id: 'pi-q5',
    question: '데이터 보안은 어떻게 보장되나요?',
    answer: '모든 데이터는 AES-256으로 암호화되며, SOC 2 Type II 인증을 받았습니다. GDPR 및 CCPA 완전 준수합니다.',
    rating: 4.9,
  },
  {
    id: 'pi-q6',
    question: '무료 플랜으로 할 수 있는 것은?',
    answer: '월 100회 테스트, 2개 프로젝트, 기본 모델(GPT-3.5, Claude Instant) 사용이 가능합니다.',
    rating: 4.4,
  },
  {
    id: 'pi-q7',
    question: '엔터프라이즈 플랜의 장점은?',
    answer: '무제한 테스트, 전용 서버, 24/7 기술 지원, 커스텀 모델 통합, SLA 보장, 전담 매니저가 제공됩니다.',
    rating: 4.6,
  },
];

/**
 * Mock A/B test results (8 tests with different combinations)
 */
const baseTestResults: Omit<TestResult, 'overallScore'>[] = [
  {
    id: 'test-1',
    prompt: 'TEST-01-GPT-4',
    model: 'GPT-4',
    testSetId: 'TEST-01',
    promptTemplate: zeroShotPromptTemplate,
    qualityScore: 85,
    speedScore: 78,
    costScore: 70,
    avgResponseTime: 1.8,
    totalCost: 0.45,
    userSatisfaction: 4.2,
    questions: customerSupportQuestions.slice(0, 5),
  },
  {
    id: 'test-2',
    prompt: 'TEST-02-GPT-4',
    model: 'GPT-4',
    testSetId: 'TEST-02',
    promptTemplate: fewShotPromptTemplate,
    qualityScore: 92,
    speedScore: 75,
    costScore: 68,
    avgResponseTime: 2.1,
    totalCost: 0.52,
    userSatisfaction: 4.7,
    questions: customerSupportQuestions,
  },
  {
    id: 'test-3',
    prompt: 'TEST-02-Claude-3',
    model: 'Claude-3',
    testSetId: 'TEST-02',
    promptTemplate: fewShotPromptTemplate,
    qualityScore: 88,
    speedScore: 82,
    costScore: 75,
    avgResponseTime: 1.6,
    totalCost: 0.38,
    userSatisfaction: 4.5,
    questions: customerSupportQuestions,
  },
  {
    id: 'test-4',
    prompt: 'TEST-03-GPT-4',
    model: 'GPT-4',
    testSetId: 'TEST-03',
    promptTemplate: chainOfThoughtTemplate,
    qualityScore: 94,
    speedScore: 72,
    costScore: 65,
    avgResponseTime: 2.5,
    totalCost: 0.58,
    userSatisfaction: 4.8,
    questions: technicalSupportQuestions,
  },
  {
    id: 'test-5',
    prompt: 'TEST-03-Claude-3',
    model: 'Claude-3',
    testSetId: 'TEST-03',
    promptTemplate: chainOfThoughtTemplate,
    qualityScore: 91,
    speedScore: 80,
    costScore: 72,
    avgResponseTime: 1.8,
    totalCost: 0.42,
    userSatisfaction: 4.6,
    questions: technicalSupportQuestions,
  },
  {
    id: 'test-6',
    prompt: 'TEST-04-Gemini-Pro',
    model: 'Gemini-Pro',
    testSetId: 'TEST-04',
    promptTemplate: fewShotPromptTemplate,
    qualityScore: 86,
    speedScore: 88,
    costScore: 82,
    avgResponseTime: 1.3,
    totalCost: 0.28,
    userSatisfaction: 4.4,
    questions: productInfoQuestions,
  },
  {
    id: 'test-7',
    prompt: 'TEST-04-GPT-4',
    model: 'GPT-4',
    testSetId: 'TEST-04',
    promptTemplate: fewShotPromptTemplate,
    qualityScore: 89,
    speedScore: 76,
    costScore: 69,
    avgResponseTime: 1.9,
    totalCost: 0.48,
    userSatisfaction: 4.5,
    questions: productInfoQuestions,
  },
  {
    id: 'test-8',
    prompt: 'TEST-05-Claude-3',
    model: 'Claude-3',
    testSetId: 'TEST-05',
    promptTemplate: zeroShotPromptTemplate,
    qualityScore: 84,
    speedScore: 85,
    costScore: 78,
    avgResponseTime: 1.5,
    totalCost: 0.35,
    userSatisfaction: 4.3,
    questions: productInfoQuestions.slice(0, 6),
  },
];

/**
 * Add calculated overallScore to each test result
 */
export const mockTestResults: TestResult[] = baseTestResults.map((test) => ({
  ...test,
  overallScore: calculateOverallScore(test as TestResult),
}));

/**
 * Mock comparison data across multiple metrics (top 3 tests)
 */
export const mockComparisonData: ComparisonData[] = [
  { metric: '정확도', v1: 94, v2: 92, claude: 91 },
  { metric: '속도', v1: 72, v2: 75, claude: 80 },
  { metric: '비용효율', v1: 65, v2: 68, claude: 72 },
  { metric: '일관성', v1: 90, v2: 88, claude: 87 },
  { metric: '관련성', v1: 95, v2: 93, claude: 92 },
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
  name: 'TEST-03-GPT-4 (Chain-of-Thought)',
  overallScore: 77, // Will be calculated from the actual winner
  responseTime: 2.5,
  cost: '$0.58',
  promptTemplate: chainOfThoughtTemplate,
} as const;

/**
 * Mock evaluation insights
 */
export const mockEvaluationInsights = {
  totalVoters: 100,
  preferencePercentage: 76,
  summary:
    '총 100명의 사용자 중 76%가 Chain-of-Thought 프롬프트를 선호했습니다. 논리적이고 단계별 설명이 높은 평가를 받았습니다.',
  reasons: [
    '✓ 답변이 질문과 높은 관련성을 보임 (94점)',
    '✓ 정확하고 사실에 기반한 정보 제공 (92점)',
    '✓ 일관된 톤과 스타일 유지 (90점)',
    '⚠ 일부 답변에서 완전성 개선 여지 있음 (88점)',
  ],
} as const;
