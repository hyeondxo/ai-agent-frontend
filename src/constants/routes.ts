/**
 * Application route constants
 *
 * This file defines all application routes in a centralized location
 * to avoid hardcoded strings and enable easy route management.
 */

/**
 * Application routes
 */
export const ROUTES = {
  /** Root path - redirects to agents list */
  ROOT: '/',

  /** Agents list page - main page showing all agents (NEW) */
  AGENTS: '/agents',

  /** Individual agent dashboard - dynamic route (NEW) */
  AGENT_DASHBOARD: '/agents/:agentId',

  /** Agent comparison page (NEW) */
  AGENT_COMPARE: '/agents/compare',

  /** Integrated analytics page - all agents combined (NEW) */
  ANALYTICS: '/analytics',

  /** Dashboard page - deprecated, kept for backward compatibility */
  DASHBOARD: '/dashboard',

  /** Data input page - various data source inputs */
  DATA_INPUT: '/data-input',

  /** RAG settings page - embedding model and vector DB selection */
  RAG_SETTINGS: '/rag-settings',

  /** Prompt studio page - prompt engineering interface */
  PROMPT_STUDIO: '/prompt-studio',

  /** Results validation page - test results and comparisons */
  RESULTS: '/results',

  /** Deployment page - API deployment and integration */
  DEPLOYMENT: '/deployment',

  /** Playground page - test agents with chat interface */
  PLAYGROUND: '/playground',
} as const;

/**
 * Type-safe route values
 */
export type RouteValue = typeof ROUTES[keyof typeof ROUTES];

/**
 * Helper function to check if a path is a valid route
 */
export function isValidRoute(path: string): path is RouteValue {
  return Object.values(ROUTES).includes(path as RouteValue);
}

/**
 * Get route label for display purposes
 */
export function getRouteLabel(route: RouteValue): string {
  const labels: Record<RouteValue, string> = {
    [ROUTES.ROOT]: '홈',
    [ROUTES.AGENTS]: '에이전트 목록',
    [ROUTES.AGENT_DASHBOARD]: '에이전트 대시보드',
    [ROUTES.AGENT_COMPARE]: '에이전트 비교',
    [ROUTES.ANALYTICS]: '통합 분석',
    [ROUTES.DASHBOARD]: '대시보드',
    [ROUTES.DATA_INPUT]: '데이터 입력',
    [ROUTES.RAG_SETTINGS]: 'RAG 설정',
    [ROUTES.PROMPT_STUDIO]: '프롬프트 스튜디오',
    [ROUTES.RESULTS]: '결과 & 검증',
    [ROUTES.DEPLOYMENT]: '배포',
    [ROUTES.PLAYGROUND]: 'Playground',
  };

  return labels[route] || '';
}

/**
 * Helper to build agent dashboard route
 */
export function buildAgentDashboardRoute(agentId: string): string {
  return ROUTES.AGENT_DASHBOARD.replace(':agentId', agentId);
}
