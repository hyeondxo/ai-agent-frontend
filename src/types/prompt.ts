/**
 * Prompt Studio page type definitions
 */

import { LucideIcon } from 'lucide-react';

/**
 * Prompt template definition
 */
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  prompt: string;
}

/**
 * AI model configuration
 */
export interface ModelConfig {
  id: string;
  name: string;
  price: string;
  speed: string;
  quality: string;
}

/**
 * Token usage breakdown
 */
export interface TokenUsage {
  prompt: number;
  completion: number;
  total: number;
}

/**
 * Prompt history entry
 */
export interface PromptHistory {
  id: number;
  name: string;
  date: string;
  quality: number;
  // Detailed information
  timestamp: string;
  fullPrompt: string;
  output: string;
  modelName: string;
  responseTime: number; // in milliseconds
  tokensUsed: TokenUsage;
  cost: number; // in USD
}

/**
 * Advanced prompt settings
 */
export interface AdvancedSettings {
  temperature: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

/**
 * Test set execution result for a specific model
 */
export interface TestSetExecutionResult {
  modelId: string;
  modelName: string;
  qualityScore: number;
  speedScore: number;
  costScore: number;
  avgResponseTime: number;
  totalCost: number;
  userSatisfaction: number;
}

/**
 * Complete test set configuration and results
 */
export interface TestSetResult {
  testSetId: string; // Format: TEST-01, TEST-02, ...
  executedAt: string; // ISO timestamp
  promptTemplate: string; // Full prompt text
  questions: Array<{ id: string; value: string }>; // Test questions
  selectedModels: string[]; // Model IDs
  advancedSettings: AdvancedSettings; // Settings used
  results: TestSetExecutionResult[]; // Results for each model
}
