import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type PropsWithChildren,
} from 'react';
import type { Agent, CreateAgentInput } from '@/types/agent';
import { mockAgents } from '@/data/mockAgents';
import { loadAgents, saveAgents, loadSelectedAgent, saveSelectedAgent } from '@/utils';

/**
 * Agent context value interface
 */
interface AgentContextValue {
  /** All agents */
  agents: Agent[];
  /** Currently selected agent */
  selectedAgent: Agent | null;
  /** Loading state */
  isLoading: boolean;
  /** Get agent by ID */
  getAgent: (id: string) => Agent | undefined;
  /** Get agents by status */
  getAgentsByStatus: (status: Agent['status']) => Agent[];
  /** Create new agent */
  createAgent: (input: CreateAgentInput) => Promise<Agent>;
  /** Update existing agent */
  updateAgent: (id: string, updates: Partial<Agent>) => Promise<void>;
  /** Delete agent */
  deleteAgent: (id: string) => Promise<void>;
  /** Set selected agent */
  setSelectedAgent: (agent: Agent | null) => void;
  /** Refresh agents from storage */
  refreshAgents: () => void;
}

/**
 * Agent context
 */
const AgentContext = createContext<AgentContextValue | undefined>(undefined);

/**
 * Agent provider component
 */
export function AgentProvider({ children }: PropsWithChildren) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgentState] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize agents from LocalStorage or use mock data
  useEffect(() => {
    const loadedAgents = loadAgents();
    if (loadedAgents && loadedAgents.length > 0) {
      setAgents(loadedAgents);
    } else {
      setAgents(mockAgents);
      saveAgents(mockAgents);
    }

    // Load selected agent
    const selectedId = loadSelectedAgent();
    if (selectedId) {
      const agent = (loadedAgents || mockAgents).find((a) => a.id === selectedId);
      if (agent) {
        setSelectedAgentState(agent);
      }
    }

    setIsLoading(false);
  }, []);

  // Sync agents to LocalStorage whenever they change
  useEffect(() => {
    if (!isLoading && agents.length > 0) {
      saveAgents(agents);
    }
  }, [agents, isLoading]);

  /**
   * Get agent by ID
   */
  const getAgent = useCallback(
    (id: string): Agent | undefined => {
      return agents.find((agent) => agent.id === id);
    },
    [agents]
  );

  /**
   * Get agents by status
   */
  const getAgentsByStatus = useCallback(
    (status: Agent['status']): Agent[] => {
      return agents.filter((agent) => agent.status === status);
    },
    [agents]
  );

  /**
   * Create new agent
   */
  const createAgent = useCallback(
    async (input: CreateAgentInput): Promise<Agent> => {
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        name: input.name,
        description: input.description,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        config: {
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 2000,
          ragEnabled: false,
          ...input.config,
        },
        metrics: {
          totalRequests: 0,
          avgResponseTime: 0,
          qualityScore: 0,
          totalCost: 0,
          successRate: 0,
          userSatisfaction: 0,
        },
      };

      setAgents((prev) => [...prev, newAgent]);
      return newAgent;
    },
    []
  );

  /**
   * Update existing agent
   */
  const updateAgent = useCallback(
    async (id: string, updates: Partial<Agent>): Promise<void> => {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === id
            ? {
                ...agent,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : agent
        )
      );

      // Update selected agent if it's the one being updated
      if (selectedAgent?.id === id) {
        setSelectedAgentState((prev) =>
          prev
            ? {
                ...prev,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : null
        );
      }
    },
    [selectedAgent]
  );

  /**
   * Delete agent
   */
  const deleteAgent = useCallback(
    async (id: string): Promise<void> => {
      setAgents((prev) => prev.filter((agent) => agent.id !== id));

      // Clear selected agent if it's being deleted
      if (selectedAgent?.id === id) {
        setSelectedAgentState(null);
        saveSelectedAgent(null);
      }
    },
    [selectedAgent]
  );

  /**
   * Set selected agent
   */
  const setSelectedAgent = useCallback((agent: Agent | null) => {
    setSelectedAgentState(agent);
    saveSelectedAgent(agent?.id || null);
  }, []);

  /**
   * Refresh agents from storage
   */
  const refreshAgents = useCallback(() => {
    const loadedAgents = loadAgents();
    if (loadedAgents) {
      setAgents(loadedAgents);
    }
  }, []);

  const value: AgentContextValue = {
    agents,
    selectedAgent,
    isLoading,
    getAgent,
    getAgentsByStatus,
    createAgent,
    updateAgent,
    deleteAgent,
    setSelectedAgent,
    refreshAgents,
  };

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

/**
 * Hook to use agent context
 */
export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within AgentProvider');
  }
  return context;
}
