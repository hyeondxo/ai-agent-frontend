import {
  mockDeploymentConfig,
  mockApiConfig,
  mockIntegrationPlatforms,
  mockCodeExamples,
  mockDeploymentMetrics,
  mockWidgetConfig,
  mockApiDocs,
} from '@/data/mockDeployment';

/**
 * Custom hook for deployment configuration and metrics
 *
 * Returns deployment status, API configuration, integration platforms,
 * code examples, metrics, and widget configuration.
 *
 * @returns Deployment configuration and real-time metrics
 */
export function useDeploymentConfig() {
  // In the future, this will fetch from API and handle real-time metrics
  // For now, return mock data
  return {
    deploymentConfig: mockDeploymentConfig,
    apiConfig: mockApiConfig,
    integrationPlatforms: mockIntegrationPlatforms,
    codeExamples: mockCodeExamples,
    deploymentMetrics: mockDeploymentMetrics,
    widgetConfig: mockWidgetConfig,
    apiDocs: mockApiDocs,
  };
}
