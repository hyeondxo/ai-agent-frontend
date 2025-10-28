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
  /** Root path - redirects to dashboard */
  ROOT: '/',

  /** Dashboard page - main analytics and monitoring */
  DASHBOARD: '/dashboard',

  /** Data input page - various data source inputs */
  DATA_INPUT: '/data-input',

  /** Prompt studio page - prompt engineering interface */
  PROMPT_STUDIO: '/prompt-studio',

  /** Results validation page - test results and comparisons */
  RESULTS: '/results',

  /** Deployment page - API deployment and integration */
  DEPLOYMENT: '/deployment',
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
    [ROUTES.DASHBOARD]: '대시보드',
    [ROUTES.DATA_INPUT]: '데이터 입력',
    [ROUTES.PROMPT_STUDIO]: '프롬프트 스튜디오',
    [ROUTES.RESULTS]: '결과 & 검증',
    [ROUTES.DEPLOYMENT]: '배포',
  };

  return labels[route] || '';
}
