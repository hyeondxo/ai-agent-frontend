/**
 * DataCleansingSection Component
 * 데이터 정제 섹션
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Filter, Sparkles, ChevronDown } from 'lucide-react';
import { DataCleansingSectionProps } from '../types';

export function DataCleansingSection({}: DataCleansingSectionProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-purple-400" />
        <h3 className="text-white">데이터 정제 (Cleansing)</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-sm">일반 데이터 제거</span>
            <div className="flex items-center gap-2">
              <Checkbox defaultChecked />
              <Badge className="bg-green-500/20 text-green-400 text-xs">추천</Badge>
            </div>
          </div>
          <p className="text-xs text-white/60">
            중복 문장, boilerplate 코드 자동 제거
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-sm">노이즈 필터링</span>
            <div className="flex items-center gap-2">
              <Checkbox defaultChecked />
              <Badge className="bg-green-500/20 text-green-400 text-xs">추천</Badge>
            </div>
          </div>
          <p className="text-xs text-white/60">
            광고, 네비게이션 등 불필요한 요소 제거
          </p>
        </div>
      </div>

      {/* Advanced Options */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen} className="mt-4">
        <CollapsibleTrigger className="flex items-center gap-2 text-sm text-white/60 hover:text-white">
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isAdvancedOpen ? 'rotate-180' : ''
            }`}
          />
          고급 정제 옵션
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white text-sm">커스텀 필터</span>
                <Checkbox />
              </div>
              <Input
                placeholder="제외할 키워드 (쉼표로 구분)"
                className="mt-2 bg-white/5 border-white/10 text-white text-sm placeholder:text-white/40"
              />
            </div>

            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white text-sm">AI 기반 정제</span>
                <Checkbox />
              </div>
              <p className="text-xs text-white/60">
                LLM을 활용한 지능형 데이터 정제
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
        <div>
          <p className="text-white text-sm mb-1">AI 제안</p>
          <p className="text-xs text-white/60">
            현재 데이터에서 1,234개의 중복 항목과 567개의 노이즈를 감지했습니다. 자동
            정제를 권장합니다.
          </p>
        </div>
      </div>
    </Card>
  );
}
