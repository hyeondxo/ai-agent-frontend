/**
 * ModelSelector Component
 * AI 모델 선택 UI
 */

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { ModelSelectorProps } from '../types';

export function ModelSelector({
  models,
  selectedModels,
  onToggleModel,
}: ModelSelectorProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <h3 className="text-white mb-4">AI 모델 선택</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {models.map((model) => (
          <div
            key={model.id}
            onClick={() => onToggleModel(model.id)}
            className={`
              p-4 rounded-lg border cursor-pointer transition-all
              ${
                selectedModels.includes(model.id)
                  ? 'bg-purple-500/20 border-purple-500/50'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-white mb-1">{model.name}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <DollarSign className="w-3 h-3" />
                    {model.price}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Zap className="w-3 h-3" />
                    {model.speed}
                  </Badge>
                </div>
              </div>
              {selectedModels.includes(model.id) && (
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-white/60">품질:</span>
              <span className="text-xs text-white">{model.quality}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5" />
        <p className="text-xs text-white/80">
          여러 모델 선택 시 동시에 테스트하여 결과를 비교할 수 있습니다
        </p>
      </div>
    </Card>
  );
}
