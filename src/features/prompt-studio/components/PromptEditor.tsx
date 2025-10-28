/**
 * PromptEditor Component
 * 프롬프트 작성 및 편집 에디터
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Copy, Save, Sparkles } from 'lucide-react';
import { PromptEditorProps } from '../types';

export function PromptEditor({
  selectedTemplate,
  templates,
  onCopy,
  onSave,
}: PromptEditorProps) {
  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white">프롬프트 에디터</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-white/10 text-black"
            onClick={onCopy}
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-white/10 text-black"
            onClick={onSave}
          >
            <Save className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Textarea
        placeholder="프롬프트를 입력하거나 템플릿을 선택하세요..."
        defaultValue={selectedTemplateData?.prompt || ''}
        className="min-h-[200px] bg-black/30 border-white/10 text-white placeholder:text-white/40 font-mono text-sm"
      />

      {/* Variables */}
      <div className="mt-4 space-y-3">
        <h4 className="text-white text-sm">입력 변수</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs text-white">{'{context}'}</label>
            <Input
              placeholder="문서 컨텍스트..."
              className="bg-white/5 border-white/10 text-white text-sm placeholder:text-white/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white">{'{question}'}</label>
            <Input
              placeholder="테스트 질문..."
              className="bg-white/5 border-white/10 text-white text-sm placeholder:text-white/40"
            />
          </div>
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
