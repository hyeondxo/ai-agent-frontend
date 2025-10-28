/**
 * Deployment page type definitions
 */

/**
 * Deployment configuration
 */
export interface DeploymentConfig {
  apiKey: string;
  apiEndpoint: string;
  environment: 'development' | 'staging' | 'production';
  status: 'pending' | 'deploying' | 'active' | 'inactive' | 'error';
}

/**
 * API integration configuration
 */
export interface ApiConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  headers: Record<string, string>;
  body?: Record<string, unknown>;
}

/**
 * Integration platform types
 */
export type IntegrationPlatform =
  | 'web'
  | 'rest-api'
  | 'javascript'
  | 'python'
  | 'mobile';

/**
 * Code example for integration
 */
export interface CodeExample {
  language: string;
  code: string;
  description?: string;
}

/**
 * Deployment metrics
 */
export interface DeploymentMetrics {
  totalRequests: number;
  successRate: number;
  avgResponseTime: number;
  uptime: number;
}
