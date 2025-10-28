import type { Agent, AgentTemplateConfig } from '@/types/agent';

/**
 * Mock agent data for prototyping
 */
export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: '고객 지원 봇',
    description: '24/7 고객 문의 자동 응답 시스템',
    status: 'active',
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-10-28T12:00:00Z',
    config: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      ragEnabled: true,
      systemPrompt: '당신은 친절하고 전문적인 고객 지원 담당자입니다.',
    },
    metrics: {
      totalRequests: 15420,
      avgResponseTime: 1.2,
      qualityScore: 94,
      totalCost: 680,
      successRate: 98.5,
      userSatisfaction: 4.7,
    },
  },
  {
    id: 'agent-2',
    name: '문서 요약 봇',
    description: '긴 문서를 간결하게 요약하는 전문가',
    status: 'active',
    createdAt: '2025-10-05T00:00:00Z',
    updatedAt: '2025-10-28T10:00:00Z',
    config: {
      model: 'claude-3',
      temperature: 0.5,
      maxTokens: 3000,
      ragEnabled: false,
      systemPrompt: '당신은 문서 요약 전문가입니다. 핵심 내용을 명확하게 전달하세요.',
    },
    metrics: {
      totalRequests: 8320,
      avgResponseTime: 2.1,
      qualityScore: 89,
      totalCost: 320,
      successRate: 96.2,
      userSatisfaction: 4.5,
    },
  },
  {
    id: 'agent-3',
    name: '코드 리뷰어',
    description: 'PR 자동 검토 및 개선 피드백 제공',
    status: 'inactive',
    createdAt: '2025-09-20T00:00:00Z',
    updatedAt: '2025-10-15T08:00:00Z',
    config: {
      model: 'gpt-4',
      temperature: 0.3,
      maxTokens: 4000,
      ragEnabled: false,
      systemPrompt: '당신은 시니어 소프트웨어 엔지니어입니다. 코드 품질과 베스트 프랙티스를 중시합니다.',
    },
    metrics: {
      totalRequests: 2150,
      avgResponseTime: 3.5,
      qualityScore: 92,
      totalCost: 150,
      successRate: 94.8,
      userSatisfaction: 4.6,
    },
  },
  {
    id: 'agent-4',
    name: '데이터 분석가',
    description: '데이터 시각화 및 인사이트 도출',
    status: 'active',
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-10-28T14:00:00Z',
    config: {
      model: 'gemini-pro',
      temperature: 0.6,
      maxTokens: 2500,
      ragEnabled: true,
      systemPrompt: '당신은 데이터 분석 전문가입니다. 숫자 뒤에 숨은 스토리를 찾아내세요.',
    },
    metrics: {
      totalRequests: 5680,
      avgResponseTime: 1.8,
      qualityScore: 87,
      totalCost: 180,
      successRate: 95.3,
      userSatisfaction: 4.4,
    },
  },
  {
    id: 'agent-5',
    name: '번역 봇',
    description: '다국어 실시간 번역 서비스',
    status: 'archived',
    createdAt: '2025-08-15T00:00:00Z',
    updatedAt: '2025-09-30T18:00:00Z',
    config: {
      model: 'llama-2',
      temperature: 0.4,
      maxTokens: 1500,
      ragEnabled: false,
      systemPrompt: '당신은 전문 번역가입니다. 자연스럽고 정확한 번역을 제공하세요.',
    },
    metrics: {
      totalRequests: 12500,
      avgResponseTime: 0.9,
      qualityScore: 85,
      totalCost: 50,
      successRate: 97.8,
      userSatisfaction: 4.3,
    },
  },
];

/**
 * Agent templates for quick creation
 */
export const agentTemplates: AgentTemplateConfig[] = [
  {
    id: 'blank',
    name: '빈 에이전트',
    description: '처음부터 직접 설정',
    defaultConfig: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      ragEnabled: false,
    },
  },
  {
    id: 'chatbot',
    name: '챗봇 템플릿',
    description: '대화형 고객 지원 봇',
    defaultConfig: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      ragEnabled: true,
      systemPrompt: '당신은 친절하고 도움이 되는 챗봇입니다. 사용자의 질문에 명확하고 정중하게 답변하세요.',
    },
  },
  {
    id: 'qa',
    name: 'Q&A 템플릿',
    description: '질의응답 전문 봇',
    defaultConfig: {
      model: 'gpt-4',
      temperature: 0.3,
      maxTokens: 1500,
      ragEnabled: true,
      systemPrompt: '당신은 정확한 정보를 제공하는 Q&A 전문가입니다. 간결하고 명확하게 답변하세요.',
    },
  },
  {
    id: 'rag',
    name: 'RAG 템플릿',
    description: '문서 기반 검색증강생성',
    defaultConfig: {
      model: 'claude-3',
      temperature: 0.5,
      maxTokens: 3000,
      ragEnabled: true,
      systemPrompt: '당신은 제공된 문서를 기반으로 정확한 답변을 제공합니다. 반드시 출처를 명시하세요.',
    },
  },
];

/**
 * Get agent by ID
 */
export function getAgentById(id: string): Agent | undefined {
  return mockAgents.find((agent) => agent.id === id);
}

/**
 * Get agents by status
 */
export function getAgentsByStatus(status: Agent['status']): Agent[] {
  return mockAgents.filter((agent) => agent.status === status);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): AgentTemplateConfig | undefined {
  return agentTemplates.find((template) => template.id === id);
}
