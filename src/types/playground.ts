/**
 * Playground type definitions for agent testing
 */

/**
 * Message role types
 */
export type MessageRole = 'user' | 'assistant';

/**
 * Chat message interface
 */
export interface ChatMessage {
  /** Unique message ID */
  id: string;
  /** Message role (user or assistant) */
  role: MessageRole;
  /** Message content */
  content: string;
  /** Timestamp */
  timestamp: string;
  /** Agent ID (for assistant messages) */
  agentId?: string;
}

/**
 * Chat session interface
 */
export interface ChatSession {
  /** Session ID */
  id: string;
  /** Selected agent ID */
  agentId: string;
  /** Chat messages */
  messages: ChatMessage[];
  /** Created at timestamp */
  createdAt: string;
  /** Updated at timestamp */
  updatedAt: string;
}
