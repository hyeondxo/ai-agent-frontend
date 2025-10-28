/**
 * Prompt Studio Page
 * 프롬프트 엔지니어링 스튜디오 - 다중 세트 관리 시스템
 */

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Plus } from 'lucide-react';
import { usePromptTemplates } from '@/features/prompt-studio/hooks/usePromptTemplates';
import {
  TemplateSelector,
  TestSetList,
  PromptEditor,
  ModelSelector,
  AdvancedSettings,
  PromptSetPagination,
} from '@/features/prompt-studio/components';
import type { PromptSet, TestQuestion } from '@/features/prompt-studio/types';
import type { TestSetResult } from '@/types/prompt';
import { mockTestSets } from '@/data/mockPrompts';

export function PromptStudioPage() {
  // Use custom hook for data
  const { templates, models } = usePromptTemplates();

  // Test sets state
  const [testSets] = useState<TestSetResult[]>(mockTestSets);

  // Multiple prompt sets management
  const [promptSets, setPromptSets] = useState<PromptSet[]>([
    {
      id: `set-${Date.now()}`,
      templateId: null,
      promptText: '',
      questions: [{ id: `question-${Date.now()}`, value: '' }],
      selectedModels: ['gpt-4'],
      advancedSettings: {
        temperature: 0.7,
        maxTokens: 2000,
        topP: 0.9,
      },
      isAdvancedOpen: false,
    },
  ]);

  const [activeSetIndex, setActiveSetIndex] = useState(0);

  // Get current active set
  const currentSet = promptSets[activeSetIndex];

  // Add new prompt set
  const handleAddSet = useCallback(() => {
    const newSet: PromptSet = {
      id: `set-${Date.now()}`,
      templateId: null,
      promptText: '',
      questions: [{ id: `question-${Date.now()}`, value: '' }],
      selectedModels: ['gpt-4'],
      advancedSettings: {
        temperature: 0.7,
        maxTokens: 2000,
        topP: 0.9,
      },
      isAdvancedOpen: false,
    };
    setPromptSets([...promptSets, newSet]);
    setActiveSetIndex(promptSets.length);
  }, [promptSets]);

  // Update current set's property
  const updateCurrentSet = useCallback(
    (updates: Partial<PromptSet>) => {
      setPromptSets((prevSets) =>
        prevSets.map((set, index) =>
          index === activeSetIndex ? { ...set, ...updates } : set
        )
      );
    },
    [activeSetIndex]
  );

  // Handler for template selection
  const handleSelectTemplate = useCallback(
    (templateId: string) => {
      const template = templates.find((t) => t.id === templateId);
      updateCurrentSet({
        templateId,
        promptText: template?.prompt || '',
      });
    },
    [templates, updateCurrentSet]
  );

  // Handler for prompt text change
  const handlePromptTextChange = useCallback(
    (text: string) => {
      updateCurrentSet({ promptText: text });
    },
    [updateCurrentSet]
  );

  // Handler for questions change
  const handleQuestionsChange = useCallback(
    (questions: TestQuestion[]) => {
      updateCurrentSet({ questions });
    },
    [updateCurrentSet]
  );

  // Handler for model toggle
  const handleToggleModel = useCallback(
    (modelId: string) => {
      const newSelectedModels = currentSet.selectedModels.includes(modelId)
        ? currentSet.selectedModels.filter((m) => m !== modelId)
        : [...currentSet.selectedModels, modelId];

      updateCurrentSet({ selectedModels: newSelectedModels });
    },
    [currentSet.selectedModels, updateCurrentSet]
  );

  // Handler for temperature change
  const handleTemperatureChange = useCallback(
    (value: number[]) => {
      updateCurrentSet({
        advancedSettings: {
          ...currentSet.advancedSettings,
          temperature: value[0],
        },
      });
    },
    [currentSet.advancedSettings, updateCurrentSet]
  );

  // Handler for advanced settings open/close
  const handleAdvancedOpenChange = useCallback(
    (open: boolean) => {
      updateCurrentSet({ isAdvancedOpen: open });
    },
    [updateCurrentSet]
  );

  // Handler for test set restoration from sessionStorage
  useEffect(() => {
    const restoreData = sessionStorage.getItem('restoreTestSet');
    if (restoreData) {
      try {
        const testSet: TestSetResult = JSON.parse(restoreData);

        // Convert test set to prompt set format
        const restoredSet: PromptSet = {
          id: `set-${Date.now()}`,
          templateId: null,
          promptText: testSet.promptTemplate,
          questions: testSet.questions,
          selectedModels: testSet.selectedModels,
          advancedSettings: testSet.advancedSettings,
          isAdvancedOpen: false,
        };

        // Update current set with restored data
        setPromptSets((prevSets) =>
          prevSets.map((set, index) =>
            index === activeSetIndex ? restoredSet : set
          )
        );

        // Clear sessionStorage
        sessionStorage.removeItem('restoreTestSet');
      } catch (error) {
        console.error('Failed to restore test set:', error);
      }
    }
  }, [activeSetIndex]);

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
        {/* Left Panel - Templates & Test Sets */}
        <div className="space-y-6">
          <TemplateSelector
            templates={templates}
            selectedTemplate={currentSet.templateId}
            onSelectTemplate={handleSelectTemplate}
          />
          <TestSetList testSets={testSets} />
        </div>

        {/* Center Panel - Prompt Editor */}
        <div className="lg:col-span-2 space-y-6">
          <PromptEditor
            selectedTemplate={currentSet.templateId}
            templates={templates}
            promptText={currentSet.promptText}
            questions={currentSet.questions}
            onPromptTextChange={handlePromptTextChange}
            onQuestionsChange={handleQuestionsChange}
          />

          <ModelSelector
            models={models}
            selectedModels={currentSet.selectedModels}
            onToggleModel={handleToggleModel}
          />

          {/* Advanced Settings */}
          <AdvancedSettings
            isOpen={currentSet.isAdvancedOpen}
            onOpenChange={handleAdvancedOpenChange}
            temperature={[currentSet.advancedSettings.temperature]}
            onTemperatureChange={handleTemperatureChange}
          />

          {/* Pagination */}
          <PromptSetPagination
            totalSets={promptSets.length}
            activeIndex={activeSetIndex}
            onSetChange={setActiveSetIndex}
          />

          {/* Action Buttons */}
          <div className="flex justify-end">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-white/10 !text-white hover:!text-white"
                onClick={handleAddSet}
              >
                <Plus className="w-4 h-4 mr-2" />
                테스트 추가
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
