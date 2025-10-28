import type {
  PromptTemplate,
  ModelConfig,
  PromptHistory,
  TestSetResult,
} from '@/types/prompt';
import { FileText, Sparkles, Wand2 } from 'lucide-react';

/**
 * Mock prompt templates for different scenarios
 */
export const mockTemplates: PromptTemplate[] = [
  {
    id: 'zero-shot',
    name: 'Zero-shot 기본',
    description: '예시 없이 직접 질문',
    icon: FileText,
    prompt:
      '당신은 전문적인 AI 어시스턴트입니다. 주어진 문서를 바탕으로 사용자의 질문에 정확하고 도움이 되는 답변을 제공하세요.\n\n{context}\n\n질문: {question}\n\n답변:',
  },
  {
    id: 'few-shot',
    name: 'Few-shot 예시',
    description: '예시와 함께 학습',
    icon: Sparkles,
    prompt:
      '당신은 전문적인 AI 어시스턴트입니다. 다음 예시를 참고하여 답변하세요.\n\n예시 1:\n질문: 제품 A의 가격은?\n답변: 제품 A의 가격은 $99입니다.\n\n예시 2:\n질문: 배송은 얼마나 걸리나요?\n답변: 일반 배송은 3-5 영업일이 소요됩니다.\n\n{context}\n\n질문: {question}\n\n답변:',
  },
  {
    id: 'role-based',
    name: '역할 기반',
    description: '특정 역할 부여',
    icon: Wand2,
    prompt:
      '당신은 10년 경력의 고객 지원 전문가입니다. 친절하고 전문적인 태도로 고객의 문제를 해결해주세요.\n\n{context}\n\n고객 질문: {question}\n\n전문가 답변:',
  },
];

/**
 * Mock AI model configurations with pricing and performance
 */
export const mockModels: ModelConfig[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    price: '$0.03/1K',
    speed: '중간',
    quality: '최고',
  },
  {
    id: 'claude-3',
    name: 'Claude-3',
    price: '$0.025/1K',
    speed: '빠름',
    quality: '높음',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    price: '$0.02/1K',
    speed: '빠름',
    quality: '높음',
  },
  {
    id: 'llama-2',
    name: 'Llama-2',
    price: '$0.005/1K',
    speed: '매우빠름',
    quality: '중간',
  },
];

/**
 * Mock prompt history with version tracking and detailed execution data
 */
export const mockPromptHistory: PromptHistory[] = [
  {
    id: 1,
    name: '고객 지원 v1',
    date: '2시간 전',
    quality: 85,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    fullPrompt: `당신은 전문적인 고객 지원 AI 어시스턴트입니다. 고객의 문의사항에 친절하고 정확하게 답변해주세요.

고객 질문: 제품 배송이 지연되고 있습니다. 언제 받을 수 있나요?

답변을 작성해주세요:`,
    output: `고객님의 불편을 끼쳐드려 죄송합니다. 배송 지연에 대해 확인해드리겠습니다.

현재 물류센터의 높은 물량으로 인해 배송이 1-2일 지연되고 있습니다. 고객님의 주문은 영업일 기준 3-4일 이내에 도착할 예정입니다.

배송 추적 번호를 통해 실시간으로 배송 상태를 확인하실 수 있으며, 추가 문의사항이 있으시면 언제든 연락 주시기 바랍니다.

감사합니다.`,
    modelName: 'GPT-4',
    responseTime: 2340,
    tokensUsed: {
      prompt: 156,
      completion: 198,
      total: 354,
    },
    cost: 0.01062,
  },
  {
    id: 2,
    name: '고객 지원 v2',
    date: '1시간 전',
    quality: 92,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    fullPrompt: `당신은 10년 경력의 고객 지원 전문가입니다. 공감하고 해결책을 제시하는 태도로 고객을 응대해주세요.

[고객 상황]
- 주문 번호: ORD-2024-1234
- 예상 배송일: 2024-01-15
- 현재 상태: 배송 지연

고객 질문: 제품 배송이 지연되고 있습니다. 언제 받을 수 있나요?

전문가 답변:`,
    output: `안녕하세요, 고객님. 주문하신 제품의 배송이 지연되어 걱정이 많으시겠습니다.

주문 번호 ORD-2024-1234를 확인한 결과, 현재 최종 배송 단계에 있으며 내일(1월 16일) 오전 중 배송이 완료될 예정입니다.

지연된 점 진심으로 사과드리며, 다음 주문 시 사용하실 수 있는 10% 할인 쿠폰을 고객님의 계정에 적립해드렸습니다.

배송 관련 추가 문의사항이 있으시면 언제든 연락 주시기 바랍니다.

감사합니다.`,
    modelName: 'GPT-4',
    responseTime: 2890,
    tokensUsed: {
      prompt: 245,
      completion: 267,
      total: 512,
    },
    cost: 0.01536,
  },
  {
    id: 3,
    name: '고객 지원 v3',
    date: '30분 전',
    quality: 88,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    fullPrompt: `당신은 고객 만족도 최우선의 프리미엄 지원 전문가입니다. 고객의 감정을 이해하고 구체적인 해결책을 제시하세요.

[컨텍스트]
- 고객 등급: VIP
- 주문 이력: 15회
- 평균 만족도: 4.8/5.0
- 주문 번호: ORD-2024-1234
- 예상 배송일: 2024-01-15 (지연됨)
- 현재 상태: 최종 배송 센터 대기 중

고객 질문: 제품 배송이 지연되고 있습니다. 언제 받을 수 있나요?

프리미엄 지원 답변:`,
    output: `안녕하세요, 소중한 VIP 고객님.

주문하신 제품의 배송이 예정보다 지연되어 정말 송구스럽습니다. 고객님께서 저희를 15번이나 이용해주셨는데 이런 불편을 드려 대단히 죄송합니다.

**현재 상황:**
주문 번호 ORD-2024-1234는 현재 최종 배송 센터에서 출고 대기 중이며, **내일(1월 16일) 오전 10시 이전** 배송이 완료될 예정입니다.

**보상 조치:**
- 다음 주문 시 사용 가능한 20% 할인 쿠폰 적립
- 무료 익스프레스 배송 1회 쿠폰 제공
- VIP 전용 우선 고객지원 라인 안내

혹시 긴급하게 필요하신 경우, 가까운 매장에서 픽업 서비스도 가능합니다.

다시 한번 죄송하다는 말씀 드리며, 앞으로 더 나은 서비스로 보답하겠습니다.`,
    modelName: 'Claude-3',
    responseTime: 3120,
    tokensUsed: {
      prompt: 312,
      completion: 398,
      total: 710,
    },
    cost: 0.01775,
  },
];

/**
 * Mock advanced settings default values
 */
export const mockAdvancedSettings = {
  temperature: 0.7,
  maxTokens: 2000,
  topP: 0.9,
  stopSequences: '',
} as const;

/**
 * Mock test sets with execution results
 * 테스트 세트 목록 (프롬프트 히스토리 대체)
 */
export const mockTestSets: TestSetResult[] = [
  {
    testSetId: 'TEST-01',
    executedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    promptTemplate: mockTemplates[0].prompt, // Zero-shot
    questions: [
      { id: 'q1', value: '제품 배송이 지연되고 있습니다. 언제 받을 수 있나요?' },
      { id: 'q2', value: '환불 정책이 어떻게 되나요?' },
    ],
    selectedModels: ['gpt-4'],
    advancedSettings: {
      temperature: 0.7,
      maxTokens: 2000,
      topP: 0.9,
    },
    results: [
      {
        modelId: 'gpt-4',
        modelName: 'GPT-4',
        qualityScore: 85,
        speedScore: 78,
        costScore: 70,
        avgResponseTime: 1.8,
        totalCost: 0.45,
        userSatisfaction: 4.2,
      },
    ],
  },
  {
    testSetId: 'TEST-02',
    executedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    promptTemplate: mockTemplates[1].prompt, // Few-shot
    questions: [
      { id: 'q1', value: '제품 배송이 지연되고 있습니다. 언제 받을 수 있나요?' },
      { id: 'q2', value: '환불 정책이 어떻게 되나요?' },
      { id: 'q3', value: '제품의 보증 기간은 얼마나 되나요?' },
    ],
    selectedModels: ['gpt-4', 'claude-3'],
    advancedSettings: {
      temperature: 0.7,
      maxTokens: 2000,
      topP: 0.9,
    },
    results: [
      {
        modelId: 'gpt-4',
        modelName: 'GPT-4',
        qualityScore: 92,
        speedScore: 75,
        costScore: 68,
        avgResponseTime: 2.1,
        totalCost: 0.52,
        userSatisfaction: 4.7,
      },
      {
        modelId: 'claude-3',
        modelName: 'Claude-3',
        qualityScore: 88,
        speedScore: 82,
        costScore: 75,
        avgResponseTime: 1.6,
        totalCost: 0.38,
        userSatisfaction: 4.5,
      },
    ],
  },
  {
    testSetId: 'TEST-03',
    executedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    promptTemplate: mockTemplates[2].prompt, // Role-based
    questions: [
      { id: 'q1', value: 'VIP 고객의 배송 지연 문의' },
      { id: 'q2', value: '프리미엄 멤버십 혜택 문의' },
    ],
    selectedModels: ['gpt-4', 'claude-3', 'gemini-pro', 'llama-2'],
    advancedSettings: {
      temperature: 0.8,
      maxTokens: 2500,
      topP: 0.95,
    },
    results: [
      {
        modelId: 'gpt-4',
        modelName: 'GPT-4',
        qualityScore: 94,
        speedScore: 73,
        costScore: 65,
        avgResponseTime: 2.3,
        totalCost: 0.58,
        userSatisfaction: 4.8,
      },
      {
        modelId: 'claude-3',
        modelName: 'Claude-3',
        qualityScore: 90,
        speedScore: 80,
        costScore: 72,
        avgResponseTime: 1.7,
        totalCost: 0.42,
        userSatisfaction: 4.6,
      },
      {
        modelId: 'gemini-pro',
        modelName: 'Gemini Pro',
        qualityScore: 87,
        speedScore: 85,
        costScore: 78,
        avgResponseTime: 1.4,
        totalCost: 0.35,
        userSatisfaction: 4.4,
      },
      {
        modelId: 'llama-2',
        modelName: 'Llama-2',
        qualityScore: 80,
        speedScore: 90,
        costScore: 88,
        avgResponseTime: 1.1,
        totalCost: 0.18,
        userSatisfaction: 4.0,
      },
    ],
  },
];
