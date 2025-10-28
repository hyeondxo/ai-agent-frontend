import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { PageHeader, ChartCard } from '@/components/common';
import { MetricCard } from '@/features/dashboard/components';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Activity,
  Zap,
  Users,
  Target,
  Boxes,
} from 'lucide-react';
import { useAgent } from '@/contexts/AgentContext';
import { formatCurrency, formatPercentage, DEFAULT_TOOLTIP_STYLE, DEFAULT_GRID_STYLE, DEFAULT_AXIS_STYLE } from '@/utils';
import type { AggregatedMetrics } from '@/types/dashboard';

/**
 * Integrated analytics page component
 */
export function IntegratedAnalyticsPage() {
  const { agents } = useAgent();

  // Calculate aggregated metrics
  const aggregatedMetrics = useMemo<AggregatedMetrics>(() => {
    const activeAgents = agents.filter((a) => a.status === 'active');

    if (activeAgents.length === 0) {
      return {
        totalAgents: agents.length,
        totalRequests: 0,
        totalCost: 0,
        avgQualityScore: 0,
        avgResponseTime: 0,
        avgSuccessRate: 0,
      };
    }

    const totalRequests = activeAgents.reduce((sum, a) => sum + a.metrics.totalRequests, 0);
    const totalCost = activeAgents.reduce((sum, a) => sum + a.metrics.totalCost, 0);
    const avgQualityScore =
      activeAgents.reduce((sum, a) => sum + a.metrics.qualityScore, 0) / activeAgents.length;
    const avgResponseTime =
      activeAgents.reduce((sum, a) => sum + a.metrics.avgResponseTime, 0) / activeAgents.length;
    const avgSuccessRate =
      activeAgents.reduce((sum, a) => sum + a.metrics.successRate, 0) / activeAgents.length;

    return {
      totalAgents: agents.length,
      totalRequests,
      totalCost,
      avgQualityScore,
      avgResponseTime,
      avgSuccessRate,
    };
  }, [agents]);

  // Agent cost distribution data
  const costDistributionData = useMemo(() => {
    return agents
      .filter((a) => a.status === 'active')
      .map((agent) => ({
        name: agent.name,
        cost: agent.metrics.totalCost,
      }))
      .sort((a, b) => b.cost - a.cost);
  }, [agents]);

  // Agent request distribution data (for pie chart)
  const requestDistributionData = useMemo(() => {
    const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
    return agents
      .filter((a) => a.status === 'active')
      .map((agent, idx) => ({
        name: agent.name,
        value: agent.metrics.totalRequests,
        color: colors[idx % colors.length],
      }))
      .sort((a, b) => b.value - a.value);
  }, [agents]);

  // Agent performance comparison
  const performanceComparisonData = useMemo(() => {
    return agents
      .filter((a) => a.status === 'active')
      .map((agent) => ({
        name: agent.name,
        quality: agent.metrics.qualityScore,
        success: agent.metrics.successRate,
      }));
  }, [agents]);

  // Empty state
  if (agents.length === 0) {
    return (
      <div className="p-8 space-y-6">
        <PageHeader title="통합 분석" description="전체 에이전트 성능 통합 분석" />
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
          <Boxes className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-2">아직 생성된 에이전트가 없습니다</h2>
          <p className="text-white/60">에이전트를 생성하면 통합 분석을 확인할 수 있습니다</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <PageHeader
        title="통합 분석"
        description="전체 에이전트 성능 통합 분석"
        icon={<TrendingUp className="w-8 h-8 text-purple-400" />}
      />

      {/* Aggregated Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="전체 에이전트"
          value={aggregatedMetrics.totalAgents}
          icon={<Boxes className="w-6 h-6" />}
          bgGradient="bg-gradient-to-br from-purple-500/20 to-pink-500/20"
          iconColor="text-purple-400"
          extra={
            <div className="text-xs text-white/60">
              활성: {agents.filter((a) => a.status === 'active').length}
            </div>
          }
        />

        <MetricCard
          title="총 요청 수"
          value={aggregatedMetrics.totalRequests.toLocaleString()}
          icon={<Activity className="w-6 h-6" />}
          trend={{ direction: 'up', value: '+24%' }}
          bgGradient="bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
          iconColor="text-blue-400"
          trendColor="bg-blue-500/20 text-blue-400 border-blue-500/30"
        />

        <MetricCard
          title="총 비용"
          value={formatCurrency(aggregatedMetrics.totalCost)}
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ direction: 'down', value: '-8%' }}
          bgGradient="bg-gradient-to-br from-amber-500/20 to-orange-500/20"
          iconColor="text-amber-400"
          trendColor="bg-amber-500/20 text-amber-400 border-amber-500/30"
        />

        <MetricCard
          title="평균 품질 점수"
          value={Math.round(aggregatedMetrics.avgQualityScore)}
          unit="/100"
          icon={<Target className="w-6 h-6" />}
          progress={aggregatedMetrics.avgQualityScore}
          bgGradient="bg-gradient-to-br from-green-500/20 to-emerald-500/20"
          iconColor="text-green-400"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-white/60">평균 응답 시간</p>
              <p className="text-2xl font-bold text-white">
                {aggregatedMetrics.avgResponseTime.toFixed(2)}초
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-white/60">평균 성공률</p>
              <p className="text-2xl font-bold text-white">
                {formatPercentage(aggregatedMetrics.avgSuccessRate)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Distribution */}
        <ChartCard
          title="에이전트별 비용 분포"
          description="총 비용 기준 상위 에이전트"
          icon={<DollarSign className="w-5 h-5 text-amber-400" />}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costDistributionData}>
              <CartesianGrid {...DEFAULT_GRID_STYLE} />
              <XAxis dataKey="name" {...DEFAULT_AXIS_STYLE} />
              <YAxis {...DEFAULT_AXIS_STYLE} />
              <Tooltip contentStyle={DEFAULT_TOOLTIP_STYLE} />
              <Bar dataKey="cost" fill="#f59e0b" radius={[8, 8, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Request Distribution */}
        <ChartCard
          title="요청 수 분포"
          description="에이전트별 요청 비율"
          icon={<Activity className="w-5 h-5 text-blue-400" />}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={requestDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${formatPercentage((entry.value / aggregatedMetrics.totalRequests) * 100)}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {requestDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={DEFAULT_TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Performance Comparison */}
      <ChartCard
        title="에이전트 성능 비교"
        description="품질 점수 vs 성공률"
        icon={<Target className="w-5 h-5 text-green-400" />}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceComparisonData}>
            <CartesianGrid {...DEFAULT_GRID_STYLE} />
            <XAxis dataKey="name" {...DEFAULT_AXIS_STYLE} />
            <YAxis {...DEFAULT_AXIS_STYLE} />
            <Tooltip contentStyle={DEFAULT_TOOLTIP_STYLE} />
            <Legend />
            <Bar dataKey="quality" fill="#8b5cf6" name="품질 점수" radius={[8, 8, 0, 0]} barSize={25} />
            <Bar dataKey="success" fill="#10b981" name="성공률 (%)" radius={[8, 8, 0, 0]} barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Agent Status Summary */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">에이전트 현황</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-sm text-green-400 mb-1">활성</p>
            <p className="text-3xl font-bold text-white">
              {agents.filter((a) => a.status === 'active').length}
            </p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-sm text-white mb-1">비활성</p>
            <p className="text-3xl font-bold text-white">
              {agents.filter((a) => a.status === 'inactive').length}
            </p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm text-white mb-1">보관됨</p>
            <p className="text-3xl font-bold text-white">
              {agents.filter((a) => a.status === 'archived').length}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
