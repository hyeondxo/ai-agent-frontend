/**
 * TemplateSelector Component
 * 프롬프트 템플릿 선택 UI
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Plus } from 'lucide-react';
import { TemplateSelectorProps } from '../types';

export function TemplateSelector({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onAddCustomTemplate,
}: TemplateSelectorProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="text-white">프롬프트 템플릿</h3>
      </div>
      <div className="space-y-2">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`
                w-full text-left p-3 rounded-lg border transition-all
                ${
                  selectedTemplate === template.id
                    ? 'bg-purple-500/20 border-purple-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-purple-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-white text-sm mb-1">{template.name}</p>
                  <p className="text-xs text-white/60">{template.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {onAddCustomTemplate && (
        <Button
          className="w-full mt-4"
          variant="outline"
          onClick={onAddCustomTemplate}
        >
          <Plus className="w-4 h-4 mr-2" />
          커스텀 템플릿 추가
        </Button>
      )}
    </Card>
  );
}
