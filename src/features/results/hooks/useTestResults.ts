import {
  mockTestResults,
  mockComparisonData,
  mockResponseExamples,
  mockEvaluationMetrics,
  mockWinner,
  mockEvaluationInsights,
} from '@/data/mockResults';

/**
 * Custom hook for test results and validation data
 *
 * Returns A/B test results, comparison data, response examples,
 * evaluation metrics, and winner configuration.
 *
 * @returns Test results and validation data
 */
export function useTestResults() {
  // In the future, this will fetch from API and handle real-time updates
  // For now, return mock data
  return {
    testResults: mockTestResults,
    comparisonData: mockComparisonData,
    responseExamples: mockResponseExamples,
    evaluationMetrics: mockEvaluationMetrics,
    winner: mockWinner,
    evaluationInsights: mockEvaluationInsights,
  };
}
