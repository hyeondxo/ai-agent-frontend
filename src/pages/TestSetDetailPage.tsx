/**
 * Test Set Detail Page
 * 테스트 세트 상세 페이지 - 실행 결과 및 복원 기능
 */

import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ArrowLeft,
  RefreshCcw,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { mockTestSets } from '@/data/mockPrompts';
import { formatDate, formatCurrency } from '@/utils';

export function TestSetDetailPage() {
  const { testSetId } = useParams<{ testSetId: string }>();
  const navigate = useNavigate();

  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Find the test set
  const testSet = mockTestSets.find((set) => set.testSetId === testSetId);

  if (!testSet) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/prompt-studio')}
            className="text-white hover:text-white/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
        </div>
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
          <p className="text-white text-center">
            테스트 세트를 찾을 수 없습니다.
          </p>
        </Card>
      </div>
    );
  }

  const handleRestore = () => {
    // Store test set data in sessionStorage to restore in PromptStudioPage
    sessionStorage.setItem('restoreTestSet', JSON.stringify(testSet));
    navigate('/prompt-studio');
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/prompt-studio')}
            className="text-white hover:text-white/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
          <div>
            <h1 className="text-3xl text-white mb-2">{testSet.testSetId}</h1>
            <p className="text-white/60">{formatDate(testSet.executedAt)}</p>
          </div>
        </div>
        <Button
          onClick={handleRestore}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          이 세트 복원하기
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Test Set Configuration */}
        <div className="space-y-6">
          {/* Prompt Template */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
            <Collapsible open={isPromptOpen} onOpenChange={setIsPromptOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="text-white text-sm font-medium">
                      프롬프트 템플릿
                    </span>
                  </div>
                  {isPromptOpen ? (
                    <ChevronUp className="w-4 h-4 text-white/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 p-3 bg-black/50 rounded-lg border border-white/10">
                  <pre className="text-white/80 text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                    {testSet.promptTemplate}
                  </pre>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Test Questions */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
            <h4 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              테스트 질문 ({testSet.questions.length}개)
            </h4>
            <div className="space-y-2">
              {testSet.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="p-2 bg-white/5 rounded border border-white/10"
                >
                  <span className="text-xs text-white/60">질문 {index + 1}</span>
                  <p className="text-sm text-white mt-1">{question.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Selected Models */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
            <h4 className="text-white text-sm font-medium mb-3">
              선택된 모델 ({testSet.selectedModels.length}개)
            </h4>
            <div className="flex flex-wrap gap-2">
              {testSet.selectedModels.map((modelId) => (
                <Badge key={modelId} variant="secondary">
                  {modelId.toUpperCase()}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Advanced Settings */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
            <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-sm font-medium">
                      고급 설정
                    </span>
                  </div>
                  {isSettingsOpen ? (
                    <ChevronUp className="w-4 h-4 text-white/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">Temperature</span>
                    <span className="text-sm text-white">
                      {testSet.advancedSettings.temperature}
                    </span>
                  </div>
                  {testSet.advancedSettings.maxTokens && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Max Tokens</span>
                      <span className="text-sm text-white">
                        {testSet.advancedSettings.maxTokens}
                      </span>
                    </div>
                  )}
                  {testSet.advancedSettings.topP && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Top P</span>
                      <span className="text-sm text-white">
                        {testSet.advancedSettings.topP}
                      </span>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

        {/* Right Panel - Execution Results */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl text-white mb-4">
            실행 결과 ({testSet.results.length}개)
          </h2>
          <div className="space-y-4">
            {testSet.results.map((result) => (
              <Card
                key={result.modelId}
                className="bg-white/5 backdrop-blur-xl border-white/10 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white font-medium">
                    {result.modelName}
                  </h3>
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    품질: {result.qualityScore}/100
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-xs text-white/60 block mb-1">
                      응답 시간
                    </span>
                    <p className="text-lg text-white font-medium">
                      {result.avgResponseTime}초
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-xs text-white/60 block mb-1">
                      비용
                    </span>
                    <p className="text-lg text-white font-medium">
                      {formatCurrency(result.totalCost)}
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-xs text-white/60 block mb-1">
                      속도 점수
                    </span>
                    <p className="text-lg text-white font-medium">
                      {result.speedScore}/100
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-xs text-white/60 block mb-1">
                      만족도
                    </span>
                    <p className="text-lg text-white font-medium">
                      {result.userSatisfaction}/5.0
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
