import {
  mockTemplates,
  mockModels,
  mockPromptHistory,
  mockAdvancedSettings,
} from '@/data/mockPrompts';

/**
 * Custom hook for prompt studio data
 *
 * Returns prompt templates, AI model configurations, prompt history,
 * and advanced settings for the prompt engineering studio.
 *
 * @returns Prompt studio data object
 */
export function usePromptTemplates() {
  // In the future, this will fetch from API and manage state
  // For now, return mock data
  return {
    templates: mockTemplates,
    models: mockModels,
    promptHistory: mockPromptHistory,
    advancedSettings: mockAdvancedSettings,
  };
}
