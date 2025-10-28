/**
 * Test Results Utility Functions
 * 테스트 결과 관련 유틸리티 함수
 */

import type { TestResult } from '@/types/results';

/**
 * Calculate overall score (average of all scores)
 * 종합 점수 계산 (모든 지표의 평균)
 *
 * @param result - Test result object
 * @returns Overall score (0-100)
 */
export function calculateOverallScore(result: TestResult): number {
  const scores = [
    result.qualityScore,
    result.speedScore,
    result.costScore,
  ];

  const sum = scores.reduce((acc, score) => acc + score, 0);
  const average = sum / scores.length;

  // Round to 1 decimal place
  return Math.round(average * 10) / 10;
}

/**
 * Sort test results by overall score (descending)
 * 종합 점수 기준으로 테스트 결과 정렬 (내림차순)
 *
 * @param tests - Array of test results
 * @returns Sorted array (highest score first)
 */
export function sortTestsByOverallScore(tests: TestResult[]): TestResult[] {
  return [...tests].sort((a, b) => b.overallScore - a.overallScore);
}

/**
 * Get top N tests by overall score
 * 종합 점수 기준 상위 N개 테스트 추출
 *
 * @param tests - Array of test results
 * @param count - Number of top tests to return
 * @returns Top N test results
 */
export function getTopTests(tests: TestResult[], count: number): TestResult[] {
  const sorted = sortTestsByOverallScore(tests);
  return sorted.slice(0, count);
}

/**
 * Find the winner test (highest overall score)
 * 최고 성능 테스트 찾기 (종합 점수 최고)
 *
 * @param tests - Array of test results
 * @returns Winner test result or undefined
 */
export function findWinnerTest(tests: TestResult[]): TestResult | undefined {
  if (tests.length === 0) return undefined;
  return sortTestsByOverallScore(tests)[0];
}
