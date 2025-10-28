import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Sparkles, FileText, MessageSquare, Database } from 'lucide-react';
import type { CreateAgentInput, AgentTemplate } from '@/types/agent';
import { agentTemplates } from '@/data/mockAgents';
import { AI_MODELS } from '@/constants';

/**
 * Agent create dialog props
 */
interface AgentCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: CreateAgentInput) => void;
}

/**
 * Template icons
 */
const templateIcons: Record<AgentTemplate, typeof Sparkles> = {
  blank: Sparkles,
  chatbot: MessageSquare,
  qa: FileText,
  rag: Database,
};

/**
 * Agent creation dialog component
 */
export function AgentCreateDialog({ open, onOpenChange, onSubmit }: AgentCreateDialogProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [selectedModel, setSelectedModel] = useState('gpt-4');

  const handleClose = () => {
    // Reset form
    setStep(1);
    setName('');
    setDescription('');
    setSelectedTemplate(null);
    setSelectedModel('gpt-4');
    onOpenChange(false);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    const template = selectedTemplate
      ? agentTemplates.find((t) => t.id === selectedTemplate)
      : null;

    const input: CreateAgentInput = {
      name: name.trim(),
      description: description.trim() || undefined,
      config: {
        model: selectedModel,
        ...(template?.defaultConfig || {}),
      },
    };

    onSubmit(input);
    handleClose();
  };

  const canProceed = () => {
    if (step === 1) return name.trim().length > 0;
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>새 에이전트 생성</DialogTitle>
          <DialogDescription className="text-white/60">
            {step === 1 && '에이전트 기본 정보를 입력하세요'}
            {step === 2 && '템플릿을 선택하세요 (선택사항)'}
            {step === 3 && 'AI 모델을 선택하세요'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">에이전트 이름 *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 고객 지원 봇"
                  className="bg-white/5 border-white/10 text-white"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명 (선택)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="에이전트에 대한 간단한 설명"
                  className="bg-white/5 border-white/10 text-white resize-none"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 2: Template Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {agentTemplates.map((template) => {
                  const Icon = templateIcons[template.id];
                  const isSelected = selectedTemplate === template.id;

                  return (
                    <Card
                      key={template.id}
                      className={`
                        p-4 cursor-pointer transition-all
                        ${
                          isSelected
                            ? 'bg-purple-500/20 border-purple-500/50'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }
                      `}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`
                          p-2 rounded-lg
                          ${isSelected ? 'bg-purple-500/30' : 'bg-white/10'}
                        `}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white">{template.name}</h4>
                          <p className="text-xs text-white/60 mt-1">{template.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              <p className="text-xs text-white/40 text-center">
                템플릿을 선택하지 않고 건너뛸 수 있습니다
              </p>
            </div>
          )}

          {/* Step 3: Model Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model">AI 모델</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10">
                    {Object.entries(AI_MODELS).map(([key, model]) => (
                      <SelectItem key={key} value={key} className="text-white hover:bg-white/10">
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Model Info */}
              <Card className="bg-white/5 border-white/10 p-4">
                <h4 className="text-sm font-semibold text-white mb-2">
                  {AI_MODELS[selectedModel as keyof typeof AI_MODELS].name}
                </h4>
                <p className="text-xs text-white/60">
                  {AI_MODELS[selectedModel as keyof typeof AI_MODELS].provider}
                </p>
              </Card>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 py-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`
                h-1.5 rounded-full transition-all
                ${s === step ? 'w-8 bg-purple-500' : 'w-1.5 bg-white/20'}
              `}
            />
          ))}
        </div>

        <DialogFooter className="gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="border-white/10">
              이전
            </Button>
          )}
          <Button variant="outline" onClick={handleClose} className="border-white/10">
            취소
          </Button>
          {step < 3 ? (
            <Button onClick={handleNext} disabled={!canProceed()} className="bg-purple-600">
              다음
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed()} className="bg-purple-600">
              생성
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
