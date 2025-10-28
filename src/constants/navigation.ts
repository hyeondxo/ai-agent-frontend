import {
  Boxes,
  TrendingUp,
  LayoutDashboard,
  Database,
  Layers,
  Wand2,
  BarChart3,
  Rocket,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES, type RouteValue } from './routes';

/**
 * Navigation item configuration
 */
export interface NavigationItem {
  /** Route path */
  path: RouteValue;
  /** Display label */
  label: string;
  /** Icon component */
  icon: LucideIcon;
  /** Optional badge text */
  badge?: string;
}

/**
 * Main navigation menu items
 *
 * This array defines the sidebar navigation structure.
 * Items are displayed in the order they appear in this array.
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    path: ROUTES.AGENTS,
    label: '에이전트 목록',
    icon: Boxes,
  },
  {
    path: ROUTES.ANALYTICS,
    label: '통합 분석',
    icon: TrendingUp,
  },
  {
    path: ROUTES.DATA_INPUT,
    label: '데이터 입력',
    icon: Database,
  },
  {
    path: ROUTES.RAG_SETTINGS,
    label: 'RAG 설정',
    icon: Layers,
  },
  {
    path: ROUTES.PROMPT_STUDIO,
    label: '프롬프트 스튜디오',
    icon: Wand2,
  },
  {
    path: ROUTES.RESULTS,
    label: '결과 & 검증',
    icon: BarChart3,
  },
  {
    path: ROUTES.DEPLOYMENT,
    label: '배포',
    icon: Rocket,
  },
  {
    path: ROUTES.PLAYGROUND,
    label: 'Playground',
    icon: MessageSquare,
  },
];

/**
 * App branding configuration
 */
export const APP_BRANDING = {
  /** Application name */
  name: 'AI Agent Lab',
  /** Application tagline */
  tagline: '빠른 프로토타이핑',
  /** Logo description for accessibility */
  logoAlt: 'AI Agent Lab 로고',
} as const;

/**
 * Settings menu configuration
 */
export const SETTINGS_MENU = {
  label: '설정',
  path: '/settings', // Future route
} as const;
