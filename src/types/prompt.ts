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
