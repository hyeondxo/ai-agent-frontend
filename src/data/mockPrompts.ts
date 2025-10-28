import type {
  PromptTemplate,
  ModelConfig,
  PromptHistory,
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
 * Mock prompt history with version tracking
 */
export const mockPromptHistory: PromptHistory[] = [
  { id: 1, name: '고객 지원 v1', date: '2시간 전', quality: 85 },
  { id: 2, name: '고객 지원 v2', date: '1시간 전', quality: 92 },
  { id: 3, name: '고객 지원 v3', date: '30분 전', quality: 88 },
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
