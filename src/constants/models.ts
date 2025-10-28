/**
 * AI Model configurations and constants
 *
 * This file defines all AI model configurations including
 * pricing, performance characteristics, and settings.
 */

/**
 * AI Model identifier type
 */
export type ModelId = 'gpt-4' | 'claude-3' | 'gemini-pro' | 'llama-2';

/**
 * Model pricing per 1K tokens (in USD)
 */
export interface ModelPricing {
  /** Input token cost per 1K tokens */
  input: number;
  /** Output token cost per 1K tokens */
  output: number;
}

/**
 * Model performance characteristics
 */
export interface ModelPerformance {
  /** Quality score (0-100) */
  quality: number;
  /** Speed score (0-100) */
  speed: number;
  /** Cost efficiency score (0-100) */
  costEfficiency: number;
}

/**
 * Complete model configuration
 */
export interface ModelConfig {
  /** Unique model identifier */
  id: ModelId;
  /** Display name */
  name: string;
  /** Provider/vendor name */
  provider: string;
  /** Display color for charts */
  color: string;
  /** Pricing information */
  pricing: ModelPricing;
  /** Performance metrics */
  performance: ModelPerformance;
  /** Maximum context window in tokens */
  maxTokens: number;
  /** Whether this model is recommended */
  recommended?: boolean;
  /** Model description */
  description?: string;
}

/**
 * AI Models configuration
 *
 * This object contains all available AI models with their
 * pricing, performance, and configuration details.
 */
export const AI_MODELS: Record<ModelId, ModelConfig> = {
  'gpt-4': {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    color: '#8b5cf6', // purple
    pricing: {
      input: 0.03,
      output: 0.06,
    },
    performance: {
      quality: 95,
      speed: 85,
      costEfficiency: 70,
    },
    maxTokens: 8192,
    recommended: true,
    description: '최고 수준의 추론 능력과 창의성',
  },
  'claude-3': {
    id: 'claude-3',
    name: 'Claude-3',
    provider: 'Anthropic',
    color: '#3b82f6', // blue
    pricing: {
      input: 0.025,
      output: 0.05,
    },
    performance: {
      quality: 93,
      speed: 88,
      costEfficiency: 75,
    },
    maxTokens: 100000,
    description: '긴 컨텍스트 처리에 최적화',
  },
  'gemini-pro': {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    color: '#06b6d4', // cyan
    pricing: {
      input: 0.0005,
      output: 0.0015,
    },
    performance: {
      quality: 88,
      speed: 92,
      costEfficiency: 85,
    },
    maxTokens: 32768,
    description: '빠른 응답 속도와 경쟁력 있는 가격',
  },
  'llama-2': {
    id: 'llama-2',
    name: 'Llama-2',
    provider: 'Meta',
    color: '#10b981', // green
    pricing: {
      input: 0.0002,
      output: 0.0006,
    },
    performance: {
      quality: 82,
      speed: 95,
      costEfficiency: 95,
    },
    maxTokens: 4096,
    description: '오픈소스 기반 비용 효율적인 선택',
  },
};

/**
 * Default model ID
 */
export const DEFAULT_MODEL_ID: ModelId = 'gpt-4';

/**
 * Get list of all model IDs
 */
export function getModelIds(): ModelId[] {
  return Object.keys(AI_MODELS) as ModelId[];
}

/**
 * Get model configuration by ID
 */
export function getModelConfig(modelId: ModelId): ModelConfig {
  return AI_MODELS[modelId];
}

/**
 * Get recommended models
 */
export function getRecommendedModels(): ModelConfig[] {
  return Object.values(AI_MODELS).filter(model => model.recommended);
}

/**
 * Calculate estimated cost for a request
 */
export function calculateCost(
  modelId: ModelId,
  inputTokens: number,
  outputTokens: number
): number {
  const model = AI_MODELS[modelId];
  const inputCost = (inputTokens / 1000) * model.pricing.input;
  const outputCost = (outputTokens / 1000) * model.pricing.output;
  return inputCost + outputCost;
}

/**
 * Model comparison sorting criteria
 */
export type ModelSortCriteria = 'quality' | 'speed' | 'cost';

/**
 * Sort models by criteria
 */
export function sortModelsByPerformance(
  criteria: ModelSortCriteria
): ModelConfig[] {
  const models = Object.values(AI_MODELS);

  const sortKey: Record<ModelSortCriteria, keyof ModelPerformance> = {
    quality: 'quality',
    speed: 'speed',
    cost: 'costEfficiency',
  };

  return models.sort(
    (a, b) => b.performance[sortKey[criteria]] - a.performance[sortKey[criteria]]
  );
}
