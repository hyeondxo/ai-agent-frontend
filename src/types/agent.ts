/**
 * Agent management type definitions
 */

/**
 * Agent status types
 */
export type AgentStatus = 'active' | 'inactive' | 'archived';

/**
 * Agent configuration
 */
export interface AgentConfig {
  /** Primary AI model */
  model: string;
  /** Temperature setting (0-1) */
  temperature?: number;
  /** Max tokens */
  maxTokens?: number;
  /** System prompt */
  systemPrompt?: string;
  /** RAG settings enabled */
  ragEnabled?: boolean;
}

/**
 * Agent performance metrics
 */
export interface AgentMetrics {
  /** Total requests */
  totalRequests: number;
  /** Average response time (seconds) */
  avgResponseTime: number;
  /** Quality score (0-100) */
  qualityScore: number;
  /** Total cost ($) */
  totalCost: number;
  /** Success rate (%) */
  successRate: number;
  /** User satisfaction (0-5) */
  userSatisfaction: number;
}

/**
 * Agent interface
 */
export interface Agent {
  /** Unique identifier */
  id: string;
  /** Agent name */
  name: string;
  /** Agent description */
  description?: string;
  /** Current status */
  status: AgentStatus;
  /** Creation timestamp */
  createdAt: string;
  /** Last updated timestamp */
  updatedAt: string;
  /** Agent configuration */
  config: AgentConfig;
  /** Performance metrics */
  metrics: AgentMetrics;
}

/**
 * Agent creation input
 */
export interface CreateAgentInput {
  /** Agent name (required) */
  name: string;
  /** Agent description */
  description?: string;
  /** Agent configuration */
  config?: Partial<AgentConfig>;
}

/**
 * Agent template types
 */
export type AgentTemplate = 'blank' | 'chatbot' | 'qa' | 'rag';

/**
 * Agent template configuration
 */
export interface AgentTemplateConfig {
  id: AgentTemplate;
  name: string;
  description: string;
  defaultConfig: Partial<AgentConfig>;
}
