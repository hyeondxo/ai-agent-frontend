/**
 * AdvancedSettings Component
 * 고급 프롬프트 설정 (Expert 모드 전용)
 */

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Settings, ChevronDown } from 'lucide-react';
import { AdvancedSettingsProps } from '../types';

export function AdvancedSettings({
  isOpen,
  onOpenChange,
  temperature,
  onTemperatureChange,
}: AdvancedSettingsProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-white/60" />
            <h3 className="text-white">고급 설정</h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-white/60 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4 space-y-4">
          {/* Temperature */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white">Temperature</label>
              <span className="text-sm text-white">{temperature[0]}</span>
            </div>
            <Slider
              value={temperature}
              onValueChange={onTemperatureChange}
              min={0}
              max={2}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-white/60">
              낮을수록 일관된 답변, 높을수록 창의적인 답변
            </p>
          </div>

          {/* Max Tokens */}
          <div className="space-y-2">
            <label className="text-sm text-white">Max Tokens</label>
            <Input
              type="number"
              defaultValue={2000}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          {/* Top P */}
          <div className="space-y-2">
            <label className="text-sm text-white">Top P</label>
            <Slider
              defaultValue={[0.9]}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Stop Sequences */}
          <div className="space-y-2">
            <label className="text-sm text-white">Stop Sequences</label>
            <Input
              placeholder="쉼표로 구분..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
