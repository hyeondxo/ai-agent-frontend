/**
 * Test Set Utilities
 * 테스트 세트 관리를 위한 유틸리티 함수들
 */

import type { TestSetResult } from '@/types/prompt';

const TEST_SET_COUNTER_KEY = 'ailab_test_set_counter';
const TEST_SETS_STORAGE_KEY = 'ailab_test_sets';

/**
 * Generate a new test set ID in the format TEST-01, TEST-02, etc.
 * 로컬 스토리지에서 마지막 번호를 읽고 자동으로 증가시킵니다.
 */
export function generateTestSetId(): string {
  // Get the current counter from localStorage
  const counterStr = localStorage.getItem(TEST_SET_COUNTER_KEY);
  const counter = counterStr ? parseInt(counterStr, 10) : 0;

  // Increment counter
  const newCounter = counter + 1;

  // Save back to localStorage
  localStorage.setItem(TEST_SET_COUNTER_KEY, newCounter.toString());

  // Format as TEST-01, TEST-02, etc.
  return `TEST-${newCounter.toString().padStart(2, '0')}`;
}

/**
 * Format test result title
 * @param testSetId - Test set ID (e.g., TEST-01)
 * @param modelName - Model name (e.g., GPT-4)
 * @returns Formatted title (e.g., TEST-01-GPT-4)
 */
export function formatTestResultTitle(
  testSetId: string,
  modelName: string
): string {
  return `${testSetId}-${modelName}`;
}

/**
 * Save a test set to localStorage
 * @param testSet - Test set result to save
 */
export function saveTestSet(testSet: TestSetResult): void {
  try {
    const existingSets = getAllTestSets();

    // Check if test set already exists and update it
    const existingIndex = existingSets.findIndex(
      (set) => set.testSetId === testSet.testSetId
    );

    if (existingIndex >= 0) {
      existingSets[existingIndex] = testSet;
    } else {
      existingSets.push(testSet);
    }

    localStorage.setItem(TEST_SETS_STORAGE_KEY, JSON.stringify(existingSets));
  } catch (error) {
    console.error('Failed to save test set:', error);
  }
}

/**
 * Load a test set from localStorage by ID
 * @param testSetId - Test set ID to load
 * @returns Test set result or null if not found
 */
export function loadTestSet(testSetId: string): TestSetResult | null {
  try {
    const allSets = getAllTestSets();
    return allSets.find((set) => set.testSetId === testSetId) || null;
  } catch (error) {
    console.error('Failed to load test set:', error);
    return null;
  }
}

/**
 * Get all test sets from localStorage
 * @returns Array of all test sets, sorted by execution time (newest first)
 */
export function getAllTestSets(): TestSetResult[] {
  try {
    const setsStr = localStorage.getItem(TEST_SETS_STORAGE_KEY);
    if (!setsStr) return [];

    const sets: TestSetResult[] = JSON.parse(setsStr);

    // Sort by executedAt descending (newest first)
    return sets.sort(
      (a, b) =>
        new Date(b.executedAt).getTime() - new Date(a.executedAt).getTime()
    );
  } catch (error) {
    console.error('Failed to get all test sets:', error);
    return [];
  }
}

/**
 * Delete a test set from localStorage
 * @param testSetId - Test set ID to delete
 */
export function deleteTestSet(testSetId: string): void {
  try {
    const existingSets = getAllTestSets();
    const filteredSets = existingSets.filter(
      (set) => set.testSetId !== testSetId
    );
    localStorage.setItem(TEST_SETS_STORAGE_KEY, JSON.stringify(filteredSets));
  } catch (error) {
    console.error('Failed to delete test set:', error);
  }
}

/**
 * Reset the test set counter (mainly for testing purposes)
 */
export function resetTestSetCounter(): void {
  localStorage.setItem(TEST_SET_COUNTER_KEY, '0');
}
