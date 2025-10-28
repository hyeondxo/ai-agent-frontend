/**
 * Common types used across the application
 */

/**
 * User expertise mode
 */
export type UserMode = 'beginner' | 'expert';

/**
 * Page routes in the application
 */
export type Page =
  | 'dashboard'
  | 'data-input'
  | 'prompt-studio'
  | 'results'
  | 'deployment';

/**
 * Common page component props
 */
export interface PageProps {
  userMode: UserMode;
}
