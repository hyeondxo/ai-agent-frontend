/**
 * Prompt Studio Page
 * 프롬프트 엔지니어링 스튜디오 - 리팩토링 완료
 */

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Code } from 'lucide-react';
import { usePromptTemplates } from '@/features/prompt-studio/hooks/usePromptTemplates';
import {
  TemplateSelector,
  PromptHistory,
  PromptEditor,
  ModelSelector,
  AdvancedSettings,
} from '@/features/prompt-studio/components';

export function PromptStudioPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [temperature, setTemperature] = useState([0.7]);
  const [selectedModels, setSelectedModels] = useState(['gpt-4']);

  // Use custom hook for data
  const { templates, models, promptHistory } = usePromptTemplates();

  // Memoize event handler to prevent re-creation
  const handleToggleModel = useCallback(
    (modelId: string) => {
      if (selectedModels.includes(modelId)) {
        setSelectedModels(selectedModels.filter((m) => m !== modelId));
      } else {
        setSelectedModels([...selectedModels, modelId]);
      }
    },
    [selectedModels]
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">프롬프트 엔지니어링 스튜디오</h1>
          <p className="text-white/60">최적의 프롬프트를 찾아 빠르게 실험하세요</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            단계 3/4
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Templates & History */}
        <div className="space-y-6">
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
          <PromptHistory history={promptHistory} />
        </div>

        {/* Center Panel - Prompt Editor */}
        <div className="lg:col-span-2 space-y-6">
          <PromptEditor
            selectedTemplate={selectedTemplate}
            templates={templates}
          />

          <ModelSelector
            models={models}
            selectedModels={selectedModels}
            onToggleModel={handleToggleModel}
          />

          {/* Advanced Settings */}
          <AdvancedSettings
            isOpen={isAdvancedOpen}
            onOpenChange={setIsAdvancedOpen}
            temperature={temperature}
            onTemperatureChange={setTemperature}
          />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" className="border-white/10 !text-white hover:!text-white">
              <Code className="w-4 h-4 mr-2" />
              코드로 보기
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="border-white/10 !text-white hover:!text-white">
                A/B 테스트 설정
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <Play className="w-4 h-4 mr-2" />
                테스트 실행
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
