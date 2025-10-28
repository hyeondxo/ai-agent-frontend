/**
 * DetailedAnalysisTabs Component
 * 상세 분석 탭 (비교 분석, 응답 결과, 품질 평가)
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  MessageSquare,
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DetailedAnalysisTabsProps } from '../types';

export function DetailedAnalysisTabs({
  comparisonData,
  responseExamples,
  evaluationMetrics,
  selectedTest,
  topThreeTests = [],
}: DetailedAnalysisTabsProps) {
  // Prepare comparison data for top 3 tests
  const top3ComparisonData = [
    {
      metric: '정확도',
      [topThreeTests[0]?.prompt || 'Test 1']: topThreeTests[0]?.qualityScore || 0,
      [topThreeTests[1]?.prompt || 'Test 2']: topThreeTests[1]?.qualityScore || 0,
      [topThreeTests[2]?.prompt || 'Test 3']: topThreeTests[2]?.qualityScore || 0,
    },
    {
      metric: '속도',
      [topThreeTests[0]?.prompt || 'Test 1']: topThreeTests[0]?.speedScore || 0,
      [topThreeTests[1]?.prompt || 'Test 2']: topThreeTests[1]?.speedScore || 0,
      [topThreeTests[2]?.prompt || 'Test 3']: topThreeTests[2]?.speedScore || 0,
    },
    {
      metric: '비용효율',
      [topThreeTests[0]?.prompt || 'Test 1']: topThreeTests[0]?.costScore || 0,
      [topThreeTests[1]?.prompt || 'Test 2']: topThreeTests[1]?.costScore || 0,
      [topThreeTests[2]?.prompt || 'Test 3']: topThreeTests[2]?.costScore || 0,
    },
  ];

  // Prepare response time comparison data
  const responseTimeData = topThreeTests.map((test) => ({
    name: test.prompt || '',
    '응답시간(초)': test.avgResponseTime || 0,
  }));

  // Prepare cost comparison data
  const costComparisonData = topThreeTests.map((test) => ({
    name: test.prompt || '',
    '비용($)': test.totalCost || 0,
  }));

  return (
    <Tabs defaultValue="comparison" className="w-full">
      <TabsList className="bg-white/5 border border-white/10 p-1">
        <TabsTrigger value="comparison" className="data-[state=active]:bg-purple-500/20">
          <BarChart3 className="w-4 h-4 mr-2" />
          비교 분석
        </TabsTrigger>
        <TabsTrigger value="responses" className="data-[state=active]:bg-purple-500/20">
          <MessageSquare className="w-4 h-4 mr-2" />
          응답 결과
        </TabsTrigger>
        <TabsTrigger value="evaluation" className="data-[state=active]:bg-purple-500/20">
          <Target className="w-4 h-4 mr-2" />
          품질 평가
        </TabsTrigger>
      </TabsList>

      {/* Comparison Tab */}
      <TabsContent value="comparison" className="space-y-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Bar Chart - Top 3 Tests */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h3 className="text-white mb-4 text-sm">성능 지표 비교 (상위 3개)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={top3ComparisonData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="metric" stroke="#ffffff60" tick={{ fontSize: 10 }} />
                <YAxis stroke="#ffffff60" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #ffffff20',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar
                  dataKey={topThreeTests[0]?.prompt || 'Test 1'}
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey={topThreeTests[1]?.prompt || 'Test 2'}
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey={topThreeTests[2]?.prompt || 'Test 3'}
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Response Time Comparison */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h3 className="text-white mb-4 text-sm">응답시간 비교</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimeData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis
                  dataKey="name"
                  stroke="#ffffff60"
                  tick={{ fontSize: 10 }}
                />
                <YAxis stroke="#ffffff60" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #ffffff20',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar
                  dataKey="응답시간(초)"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Cost Comparison */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h3 className="text-white mb-4 text-sm">비용 비교</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costComparisonData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis
                  dataKey="name"
                  stroke="#ffffff60"
                  tick={{ fontSize: 10 }}
                />
                <YAxis stroke="#ffffff60" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #ffffff20',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, '비용($)']}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar
                  dataKey="비용($)"
                  fill="#f59e0b"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </TabsContent>

      {/* Response Results Tab */}
      <TabsContent value="responses" className="space-y-4 mt-6">
        {selectedTest && selectedTest.questions && selectedTest.questions.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white text-lg">
                  {selectedTest.prompt} - 응답 결과
                </h3>
                <p className="text-sm text-white/60 mt-1">
                  {selectedTest.questions.length}개의 테스트 질문
                </p>
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                {selectedTest.model}
              </Badge>
            </div>

            {selectedTest.questions.map((q, index) => (
              <Card
                key={q.id}
                className="bg-white/5 backdrop-blur-xl border-white/10 p-6"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      질문 {index + 1}
                    </Badge>
                    {q.rating && (
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-amber-400">{q.rating}/5.0</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white font-medium">{q.question}</p>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-300 font-medium">AI 응답</span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">{q.answer}</p>
                </div>
              </Card>
            ))}
          </>
        ) : (
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-white text-lg mb-2">테스트를 선택해주세요</h3>
              <p className="text-white/60 text-sm">
                응답 결과를 보려면 테스트 카드를 클릭하세요
              </p>
            </div>
          </Card>
        )}
      </TabsContent>

      {/* Evaluation Tab */}
      <TabsContent value="evaluation" className="space-y-4 mt-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white mb-1">AI 기반 품질 평가</h3>
              <p className="text-sm text-white/60">
                GPT-4를 평가자로 사용한 자동 점수
              </p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              전체 점수: 90/100
            </Badge>
          </div>

          <div className="space-y-4">
            {evaluationMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{metric.score}/100</span>
                    {metric.status === 'excellent' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${metric.score}%`,
                      backgroundColor: metric.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-sm mb-3">평가 근거</h4>
            <div className="space-y-2 text-xs text-white/80">
              <p>✓ 답변이 질문과 높은 관련성을 보임 (94점)</p>
              <p>✓ 정확하고 사실에 기반한 정보 제공 (92점)</p>
              <p>✓ 일관된 톤과 스타일 유지 (90점)</p>
              <p>⚠ 일부 답변에서 완전성 개선 여지 있음 (88점)</p>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
