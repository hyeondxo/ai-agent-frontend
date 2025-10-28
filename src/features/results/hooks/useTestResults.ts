import {
  mockTestResults,
  mockComparisonData,
  mockResponseExamples,
  mockEvaluationMetrics,
  mockWinner,
  mockEvaluationInsights,
} from '@/data/mockResults';
import { sortTestsByOverallScore, getTopTests, findWinnerTest } from '@/utils';

/**
 * Custom hook for test results and validation data
 *
 * Returns A/B test results sorted by overall score, top 3 tests,
 * comparison data, response examples, evaluation metrics, and winner.
 *
 * @returns Test results and validation data
 */
export function useTestResults() {
  // Sort test results by overall score (highest first)
  const sortedResults = sortTestsByOverallScore(mockTestResults);

  // Get top 3 tests for comparison
  const topThreeTests = getTopTests(sortedResults, 3);

  // Find winner (highest overall score)
  const winnerTest = findWinnerTest(sortedResults);

  // Create winner object with actual data
  const winner = winnerTest
    ? {
        name: winnerTest.testSetId
          ? `${winnerTest.testSetId}-${winnerTest.model}`
          : winnerTest.prompt,
        overallScore: winnerTest.overallScore,
        responseTime: winnerTest.avgResponseTime,
        cost: `$${winnerTest.totalCost.toFixed(2)}`,
        promptTemplate: winnerTest.promptTemplate,
      }
    : mockWinner;

  return {
    testResults: sortedResults,
    topThreeTests,
    comparisonData: mockComparisonData,
    responseExamples: mockResponseExamples,
    evaluationMetrics: mockEvaluationMetrics,
    winner,
    evaluationInsights: mockEvaluationInsights,
  };
}
