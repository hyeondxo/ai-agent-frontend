import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/common';
import { AgentCard, AgentCreateDialog } from '@/features/agents/components';
import { Plus, Search, Boxes } from 'lucide-react';
import { useAgent } from '@/contexts/AgentContext';
import { buildAgentDashboardRoute } from '@/constants/routes';
import type { AgentStatus, CreateAgentInput } from '@/types/agent';

/**
 * Agent list page component
 */
export function AgentListPage() {
  const navigate = useNavigate();
  const { agents, createAgent, deleteAgent } = useAgent();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AgentStatus | 'all'>('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Filter agents
  const filteredAgents = useMemo(() => {
    let filtered = agents;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((agent) => agent.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query) ||
          agent.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [agents, statusFilter, searchQuery]);

  // Count by status
  const statusCounts = useMemo(() => {
    return {
      all: agents.length,
      active: agents.filter((a) => a.status === 'active').length,
      inactive: agents.filter((a) => a.status === 'inactive').length,
      archived: agents.filter((a) => a.status === 'archived').length,
    };
  }, [agents]);

  // Handle agent creation
  const handleCreateAgent = async (input: CreateAgentInput) => {
    const newAgent = await createAgent(input);
    // Navigate to new agent dashboard
    navigate(buildAgentDashboardRoute(newAgent.id));
  };

  // Handle agent click
  const handleAgentClick = (agentId: string) => {
    navigate(buildAgentDashboardRoute(agentId));
  };

  // Handle agent deletion
  const handleDeleteAgent = async (agentId: string) => {
    if (confirm('정말로 이 에이전트를 삭제하시겠습니까?')) {
      await deleteAgent(agentId);
    }
  };

  // Handle agent duplication
  const handleDuplicateAgent = async (agent: typeof agents[0]) => {
    await createAgent({
      name: `${agent.name} (복사본)`,
      description: agent.description,
      config: agent.config,
    });
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <PageHeader
        title="에이전트 관리"
        description="AI 에이전트를 생성하고 관리하세요"
        icon={<Boxes className="w-8 h-8 text-purple-400" />}
        actions={
          <Button disabled className="bg-purple-600/50 gap-2 cursor-not-allowed">
            <Plus className="w-4 h-4" />새 에이전트
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Input
            placeholder="에이전트 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>

        {/* Status Filter */}
        <Tabs
          value={statusFilter}
          onValueChange={(value: string) => setStatusFilter(value as AgentStatus | 'all')}
        >
          <TabsList className="bg-white/5">
            <TabsTrigger value="all" className="text-white/70 data-[state=active]:text-black">
              전체 <span className="ml-1.5 text-xs">({statusCounts.all})</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="text-white/70 data-[state=active]:text-black">
              활성 <span className="ml-1.5 text-xs">({statusCounts.active})</span>
            </TabsTrigger>
            <TabsTrigger value="inactive" className="text-white/70 data-[state=active]:text-black">
              비활성 <span className="ml-1.5 text-xs">({statusCounts.inactive})</span>
            </TabsTrigger>
            <TabsTrigger value="archived" className="text-white/70 data-[state=active]:text-black">
              보관 <span className="ml-1.5 text-xs">({statusCounts.archived})</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Agent Cards Grid */}
      {filteredAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Boxes className="w-16 h-16 text-white/20 mb-4" />
          <h3 className="text-xl text-white/60 mb-2">
            {searchQuery
              ? '검색 결과가 없습니다'
              : statusFilter === 'all'
              ? '아직 생성된 에이전트가 없습니다'
              : `${statusFilter === 'active' ? '활성' : statusFilter === 'inactive' ? '비활성' : '보관된'} 에이전트가 없습니다`}
          </h3>
          <p className="text-white/40 mb-6">새 에이전트를 생성해보세요</p>
          <Button disabled className="bg-purple-600/50 gap-2 cursor-not-allowed">
            <Plus className="w-4 h-4" />새 에이전트 생성
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onClick={() => handleAgentClick(agent.id)}
              onDelete={handleDeleteAgent}
              onDuplicate={handleDuplicateAgent}
            />
          ))}

          {/* Add New Card */}
          {statusFilter === 'all' && !searchQuery && (
            <div
              className="
                bg-white/5 backdrop-blur-xl border-2 border-dashed border-white/10
                rounded-xl p-6
                cursor-not-allowed opacity-50
                flex flex-col items-center justify-center
                min-h-[300px]
              "
            >
              <div className="bg-purple-500/10 rounded-full p-4 mb-4">
                <Plus className="w-8 h-8 text-purple-400/50" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">새 에이전트</h3>
              <p className="text-sm text-white/60 text-center">
                클릭하여 새로운 AI 에이전트를 생성하세요
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create Dialog */}
      <AgentCreateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateAgent}
      />
    </div>
  );
}
