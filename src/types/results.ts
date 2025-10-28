/**
 * Results & Validation page type definitions
 */

/**
 * Test result data
 */
export interface TestResult {
  id: string;
  prompt: string;
  model: string;
  testSetId?: string; // Format: TEST-01, TEST-02, ...
  promptTemplate?: string; // Full prompt template text
  qualityScore: number;
  speedScore: number;
  costScore: number;
  avgResponseTime: number;
  totalCost: number;
  userSatisfaction: number;
}

/**
 * Comparison data for charts
 */
export interface ComparisonData {
  category: string;
  value1: number;
  value2: number;
  label1?: string;
  label2?: string;
}

/**
 * Response example for comparison
 */
export interface ResponseExample {
  id: string;
  question: string;
  response: string;
  model: string;
  rating?: number;
  feedback?: 'positive' | 'negative' | 'neutral';
}

/**
 * Validation metrics
 */
export interface ValidationMetrics {
  accuracy: number;
  consistency: number;
  relevance: number;
  completeness: number;
}
