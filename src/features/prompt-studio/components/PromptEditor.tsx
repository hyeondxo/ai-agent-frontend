/**
 * PromptEditor Component
 * 프롬프트 작성 및 편집 에디터
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Plus, X, Sparkles } from 'lucide-react';
import { PromptEditorProps, TestQuestion } from '../types';
import { useEffect } from 'react';

export function PromptEditor({
  selectedTemplate,
  templates,
  promptText,
  questions,
  onPromptTextChange,
  onQuestionsChange,
}: PromptEditorProps) {
  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  // Update prompt text when template changes
  useEffect(() => {
    if (selectedTemplateData && promptText === '') {
      onPromptTextChange(selectedTemplateData.prompt);
    }
  }, [selectedTemplate, selectedTemplateData, promptText, onPromptTextChange]);

  const handleAddQuestion = () => {
    const newQuestion: TestQuestion = {
      id: `question-${Date.now()}`,
      value: '',
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (questionId: string) => {
    if (questions.length > 1) {
      onQuestionsChange(questions.filter((q) => q.id !== questionId));
    }
  };

  const handleQuestionChange = (questionId: string, value: string) => {
    onQuestionsChange(
      questions.map((q) => (q.id === questionId ? { ...q, value } : q))
    );
  };

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white">프롬프트 에디터</h3>
      </div>

      <Textarea
        placeholder="프롬프트를 입력하거나 템플릿을 선택하세요..."
        value={promptText}
        onChange={(e) => onPromptTextChange(e.target.value)}
        className="min-h-[200px] bg-black/30 border-white/10 text-white placeholder:text-white/40 font-mono text-sm"
      />

      {/* Questions */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-white text-sm">테스트 질문</h4>
          <Button
            size="sm"
            variant="outline"
            className="border-white/10 !text-white hover:!text-white h-7 text-xs"
            onClick={handleAddQuestion}
          >
            <Plus className="w-3 h-3 mr-1" />
            질문 추가
          </Button>
        </div>

        <div className="space-y-2">
          {questions.map((question, index) => (
            <div key={question.id} className="flex gap-2">
              <div className="flex-1 space-y-1">
                <label className="text-xs text-white/60">질문 {index + 1}</label>
                <Input
                  placeholder={`테스트 질문 ${index + 1}을 입력하세요...`}
                  value={question.value}
                  onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                  className="bg-white/5 border-white/10 text-white text-sm placeholder:text-white/40"
                />
              </div>
              {questions.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="!text-white/60 hover:!text-red-400 mt-5"
                  onClick={() => handleRemoveQuestion(question.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Tips */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-blue-400 mt-0.5" />
          <div className="text-xs text-white/80">
            <p className="mb-1">💡 프롬프트 최적화 팁:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>구체적이고 명확한 지시사항을 제공하세요</li>
              <li>원하는 출력 형식을 명시하세요</li>
              <li>Few-shot 예시로 품질을 향상시키세요</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
