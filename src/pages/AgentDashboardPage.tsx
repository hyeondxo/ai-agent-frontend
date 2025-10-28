import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Zap,
  DollarSign,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData';
import {
  MetricCard,
  PerformanceChart,
  ModelComparisonChart,
  CostBreakdownChart,
  PerformanceRadarChart,
} from '@/features/dashboard/components';
import { PageHeader, ChartCard, AlertCard } from '@/components/common';
import { AgentStatusBadge } from '@/features/agents/components';
import { useAgent } from '@/contexts/AgentContext';
import { ROUTES } from '@/constants';

/**
 * Agent dashboard page component
 */
export function AgentDashboardPage() {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const { getAgent } = useAgent();
  const agent = agentId ? getAgent(agentId) : undefined;

  const {
    performanceData,
    modelComparisonData,
    costBreakdownData,
    radarData,
  } = useDashboardData();

  // If agent not found
  if (!agent) {
    return (
      <div className="p-8 space-y-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
          <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-2">에이전트를 찾을 수 없습니다</h2>
          <p className="text-white/60 mb-6">
            요청하신 에이전트가 존재하지 않거나 삭제되었습니다.
          </p>
          <Button onClick={() => navigate(ROUTES.AGENTS)} className="bg-purple-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            에이전트 목록으로
          </Button>
        </Card>
      </div>
    );
  }

  // Memoize header actions
  const headerActions = useMemo(
    () => (
      <>
        <Button variant="outline" onClick={() => navigate(ROUTES.AGENTS)} className="gap-2 text-black hover:text-black">
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Button>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <Activity className="w-3 h-3 mr-1" />
          실시간 운영 중
        </Badge>
      </>
    ),
    [navigate]
  );

  // Memoize star rating
  const starRating = useMemo(() => {
    const stars = [];
    const filledStars = Math.floor(agent.metrics.userSatisfaction);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div
          key={i}
          className={`w-4 h-4 rounded-sm ${
            i <= filledStars ? 'bg-amber-400' : 'bg-white/20'
          }`}
        />
      );
    }
    return <div className="flex gap-1">{stars}</div>;
  }, [agent.metrics.userSatisfaction]);

  return (
    <div className="p-8 space-y-6">
      {/* Agent Header */}
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-white mb-2">{agent.name}</h1>
            {agent.description && (
              <p className="text-white/60 mb-3">{agent.description}</p>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              <AgentStatusBadge status={agent.status} />
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {agent.config.model}
              </Badge>
              {agent.config.ragEnabled && (
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  RAG 활성
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">{headerActions}</div>
        </div>
      </div>

      {/* Page Header */}
      <PageHeader
        title="지능형 대시보드"
        description="실시간 성능 모니터링 및 분석"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="응답 품질 점수"
          value={agent.metrics.qualityScore}
          unit="/100"
          icon={<Target className="w-6 h-6" />}
          trend={{ direction: 'up', value: '+12%' }}
          progress={agent.metrics.qualityScore}
          bgGradient="bg-gradient-to-br from-green-500/20 to-emerald-500/20"
          iconColor="text-green-400"
          trendColor="bg-green-500/20 text-green-400 border-green-500/30"
          extra={
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
          }
        />

        <MetricCard
          title="평균 응답 시간"
          value={agent.metrics.avgResponseTime}
          unit="초"
          icon={<Zap className="w-6 h-6" />}
          trend={{ direction: 'up', value: '+8%' }}
          progress={88}
          bgGradient="bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
          iconColor="text-blue-400"
          trendColor="bg-blue-500/20 text-blue-400 border-blue-500/30"
          extra={<Clock className="w-4 h-4 text-blue-400" />}
        />

        <MetricCard
          title="총 비용"
          value={`$${agent.metrics.totalCost.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ direction: 'down', value: '-15%' }}
          progress={78}
          progressLabel="예산의 78%"
          bgGradient="bg-gradient-to-br from-amber-500/20 to-orange-500/20"
          iconColor="text-amber-400"
          trendColor="bg-amber-500/20 text-amber-400 border-amber-500/30"
        />

        <MetricCard
          title="사용자 만족도"
          value={agent.metrics.userSatisfaction}
          unit="/5.0"
          icon={<Users className="w-6 h-6" />}
          trend={{ direction: 'up', value: '+5%' }}
          bgGradient="bg-gradient-to-br from-purple-500/20 to-pink-500/20"
          iconColor="text-purple-400"
          trendColor="bg-purple-500/20 text-purple-400 border-purple-500/30"
          extra={starRating}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="성능 트렌드"
          description="24시간 실시간 모니터링"
          icon={<Sparkles className="w-5 h-5 text-purple-400" />}
        >
          <PerformanceChart data={performanceData} showCost={true} />
        </ChartCard>

        <ChartCard
          title="모델별 성능 비교"
          description="종합 벤치마크 결과"
          icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
        >
          <ModelComparisonChart data={modelComparisonData} showCost={true} />
        </ChartCard>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="비용 분석"
          description="모델별 비용 분포"
          icon={<DollarSign className="w-5 h-5 text-amber-400" />}
        >
          <CostBreakdownChart data={costBreakdownData} />
        </ChartCard>

        <ChartCard
          title="종합 성능 프로파일"
          description="현재 vs 기준선"
          icon={<Activity className="w-5 h-5 text-green-400" />}
        >
          <PerformanceRadarChart data={radarData} />
        </ChartCard>
      </div>

      {/* Alerts Section */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-white">실시간 알림 & 제안</h3>
        </div>
        <div className="space-y-3">
          <AlertCard
            type="success"
            icon={CheckCircle2}
            title="성능 최적화 완료"
            description={`${agent.name}의 응답 시간이 15% 개선되었습니다.`}
            timestamp="5분 전"
          />
          <AlertCard
            type="warning"
            icon={AlertTriangle}
            title="비용 임계값 접근"
            description="예산의 78%를 사용했습니다. 다른 모델로 전환을 고려해보세요."
            timestamp="1시간 전"
          />
          <AlertCard
            type="info"
            icon={Sparkles}
            title="프롬프트 최적화 제안"
            description="Few-shot 예시 추가로 정확도를 5% 더 높일 수 있습니다."
            timestamp="2시간 전"
          />
        </div>
      </Card>
    </div>
  );
}
