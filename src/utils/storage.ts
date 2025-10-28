import type { Agent } from '@/types/agent';

/**
 * LocalStorage utility functions for agent management
 */

/**
 * Storage keys
 */
const STORAGE_KEYS = {
  AGENTS: 'ai-agent-lab:agents',
  AGENT_ORDER: 'ai-agent-lab:agent-order',
  SELECTED_AGENT: 'ai-agent-lab:selected-agent',
} as const;

/**
 * Save agents to LocalStorage
 */
export function saveAgents(agents: Agent[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.AGENTS, JSON.stringify(agents));
  } catch (error) {
    console.error('Failed to save agents to LocalStorage:', error);
  }
}

/**
 * Load agents from LocalStorage
 */
export function loadAgents(): Agent[] | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.AGENTS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load agents from LocalStorage:', error);
    return null;
  }
}

/**
 * Save agent order (for drag-and-drop functionality)
 */
export function saveAgentOrder(order: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.AGENT_ORDER, JSON.stringify(order));
  } catch (error) {
    console.error('Failed to save agent order to LocalStorage:', error);
  }
}

/**
 * Load agent order from LocalStorage
 */
export function loadAgentOrder(): string[] | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.AGENT_ORDER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load agent order from LocalStorage:', error);
    return null;
  }
}

/**
 * Save selected agent ID
 */
export function saveSelectedAgent(agentId: string | null): void {
  try {
    if (agentId) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_AGENT, agentId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_AGENT);
    }
  } catch (error) {
    console.error('Failed to save selected agent to LocalStorage:', error);
  }
}

/**
 * Load selected agent ID
 */
export function loadSelectedAgent(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_AGENT);
  } catch (error) {
    console.error('Failed to load selected agent from LocalStorage:', error);
    return null;
  }
}

/**
 * Clear all agent-related data from LocalStorage
 */
export function clearAgentStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear agent storage:', error);
  }
}
