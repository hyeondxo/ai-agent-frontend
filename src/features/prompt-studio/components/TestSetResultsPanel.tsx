/**
 * TestSetResultsPanel Component
 * 테스트 세트 결과 사이드 패널
 */

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  RefreshCcw,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Settings,
} from 'lucide-react';
import type { TestSetResult } from '@/types/prompt';
import { formatDate, formatCurrency } from '@/utils';

interface TestSetResultsPanelProps {
  testSet: TestSetResult | null;
  isOpen: boolean;
  onClose: () => void;
  onRestore: (testSetId: string) => void;
}

export function TestSetResultsPanel({
  testSet,
  isOpen,
  onClose,
  onRestore,
}: TestSetResultsPanelProps) {
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  console.log('TestSetResultsPanel 렌더링:', {
    isOpen,
    hasTestSet: !!testSet,
    testSetId: testSet?.testSetId
  });

  if (!testSet) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        side="right"
        className="w-[600px] sm:w-[600px] sm:max-w-[600px] bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950 border-white/10 overflow-y-auto z-[100]"
      >
        <SheetHeader>
          <SheetTitle className="text-white text-xl">
            {testSet.testSetId}
          </SheetTitle>
          <SheetDescription className="text-white/60">
            {formatDate(testSet.executedAt)}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Restore Button */}
          <Button
            onClick={() => onRestore(testSet.testSetId)}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            이 세트 복원하기
          </Button>

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

          {/* Execution Results */}
          <div>
            <h4 className="text-white text-sm font-medium mb-3">
              실행 결과 ({testSet.results.length}개)
            </h4>
            <div className="space-y-3">
              {testSet.results.map((result) => (
                <Card
                  key={result.modelId}
                  className="bg-white/5 backdrop-blur-xl border-white/10 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">
                      {result.modelName}
                    </span>
                    <Badge variant="secondary">
                      품질: {result.qualityScore}/100
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-white/60">응답 시간</span>
                      <p className="text-white">{result.avgResponseTime}초</p>
                    </div>
                    <div>
                      <span className="text-white/60">비용</span>
                      <p className="text-white">
                        {formatCurrency(result.totalCost)}
                      </p>
                    </div>
                    <div>
                      <span className="text-white/60">속도 점수</span>
                      <p className="text-white">{result.speedScore}/100</p>
                    </div>
                    <div>
                      <span className="text-white/60">만족도</span>
                      <p className="text-white">{result.userSatisfaction}/5.0</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
