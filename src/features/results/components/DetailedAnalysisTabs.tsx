/**
 * DetailedAnalysisTabs Component
 * 상세 분석 탭 (비교 분석, 응답 예시, 품질 평가)
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DetailedAnalysisTabsProps } from '../types';

export function DetailedAnalysisTabs({
  isExpertMode,
  comparisonData,
  responseExamples,
  evaluationMetrics,
}: DetailedAnalysisTabsProps) {
  return (
    <Tabs defaultValue="comparison" className="w-full">
      <TabsList className="bg-white/5 border border-white/10 p-1">
        <TabsTrigger value="comparison" className="data-[state=active]:bg-purple-500/20">
          <BarChart3 className="w-4 h-4 mr-2" />
          비교 분석
        </TabsTrigger>
        <TabsTrigger value="responses" className="data-[state=active]:bg-purple-500/20">
          <Sparkles className="w-4 h-4 mr-2" />
          응답 예시
        </TabsTrigger>
        <TabsTrigger value="evaluation" className="data-[state=active]:bg-purple-500/20">
          <Target className="w-4 h-4 mr-2" />
          품질 평가
        </TabsTrigger>
      </TabsList>

      {/* Comparison Tab */}
      <TabsContent value="comparison" className="space-y-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h3 className="text-white mb-4">성능 지표 비교</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="metric" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #ffffff20',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar
                  dataKey="v1"
                  fill="#8b5cf6"
                  name="v1 (Zero-shot)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="v2"
                  fill="#3b82f6"
                  name="v2 (Few-shot)"
                  radius={[8, 8, 0, 0]}
                />
                {isExpertMode && (
                  <Bar
                    dataKey="claude"
                    fill="#10b981"
                    name="Claude-3"
                    radius={[8, 8, 0, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Radar Chart */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h3 className="text-white mb-4">종합 성능 프로파일</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={comparisonData}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="metric" stroke="#ffffff60" />
                <PolarRadiusAxis stroke="#ffffff40" />
                <Radar
                  name="v1"
                  dataKey="v1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                />
                <Radar
                  name="v2"
                  dataKey="v2"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                {isExpertMode && (
                  <Radar
                    name="Claude"
                    dataKey="claude"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.2}
                  />
                )}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </TabsContent>

      {/* Response Examples Tab */}
      <TabsContent value="responses" className="space-y-4 mt-6">
        {responseExamples.map((example, index) => (
          <Card
            key={index}
            className="bg-white/5 backdrop-blur-xl border-white/10 p-6"
          >
            <div className="mb-4">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-2">
                테스트 질문 {index + 1}
              </Badge>
              <p className="text-white">{example.question}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Response V1 */}
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs text-white">
                    v1 (Zero-shot)
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-white/80">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {example.votes.v1}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-white/80">
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-white/80">{example.responseV1}</p>
              </div>

              {/* Response V2 */}
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500/30 text-purple-200 text-xs">
                      v2 (Few-shot)
                    </Badge>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-white/80">
                      <ThumbsUp className="w-3 h-3 mr-1 text-green-400" />
                      {example.votes.v2}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-white/80">
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-white/80">{example.responseV2}</p>
              </div>
            </div>
          </Card>
        ))}

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <p className="text-white text-sm mb-1">집단 평가 결과</p>
            <p className="text-xs text-white/60">
              총 100명의 사용자 중 76%가 Few-shot 프롬프트(v2)를 선호했습니다. 더
              자세하고 친절한 답변이 높은 평가를 받았습니다.
            </p>
          </div>
        </div>
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

          {isExpertMode && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white text-sm mb-3">평가 근거</h4>
              <div className="space-y-2 text-xs text-white/80">
                <p>✓ 답변이 질문과 높은 관련성을 보임 (94점)</p>
                <p>✓ 정확하고 사실에 기반한 정보 제공 (92점)</p>
                <p>✓ 일관된 톤과 스타일 유지 (90점)</p>
                <p>⚠ 일부 답변에서 완전성 개선 여지 있음 (88점)</p>
              </div>
            </div>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
