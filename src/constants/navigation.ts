import {
  LayoutDashboard,
  Database,
  Wand2,
  BarChart3,
  Rocket,
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
  /** Whether this item requires expert mode */
  expertOnly?: boolean;
}

/**
 * Main navigation menu items
 *
 * This array defines the sidebar navigation structure.
 * Items are displayed in the order they appear in this array.
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    path: ROUTES.DASHBOARD,
    label: '대시보드',
    icon: LayoutDashboard,
  },
  {
    path: ROUTES.DATA_INPUT,
    label: '데이터 입력',
    icon: Database,
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
 * User mode labels
 */
export const USER_MODE_LABELS = {
  beginner: '초보자',
  expert: '전문가',
} as const;

/**
 * Settings menu configuration
 */
export const SETTINGS_MENU = {
  label: '설정',
  path: '/settings', // Future route
} as const;
