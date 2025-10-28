/**
 * UrlCrawlerTab Component
 * URL 크롤링 탭
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Globe, ChevronDown } from 'lucide-react';
import { UrlCrawlerTabProps } from '../types';

export function UrlCrawlerTab({
  isAdvancedOpen,
  onAdvancedOpenChange,
  onStartCrawling,
}: UrlCrawlerTabProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <h3 className="text-white mb-4">웹페이지 크롤링</h3>
      <div className="space-y-4">
        <div className="flex gap-3">
          <Input
            placeholder="https://example.com"
            className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500"
            onClick={() => onStartCrawling?.('')}
          >
            <Globe className="w-4 h-4 mr-2" />
            크롤링 시작
          </Button>
        </div>

        <Collapsible open={isAdvancedOpen} onOpenChange={onAdvancedOpenChange}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isAdvancedOpen ? 'rotate-180' : ''
              }`}
            />
            고급 크롤링 옵션
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <Checkbox id="follow-links" />
                <label htmlFor="follow-links" className="text-sm text-white cursor-pointer">
                  하위 링크 자동 탐색 (최대 3단계)
                </label>
              </div>
              <Badge className="bg-gray-500/20 text-white text-xs">OFF (기본값)</Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <Checkbox id="extract-images" />
                <label htmlFor="extract-images" className="text-sm text-white cursor-pointer">
                  이미지 설명 추출
                </label>
              </div>
              <Badge className="bg-gray-500/20 text-white text-xs">OFF (기본값)</Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <Checkbox id="extract-tables" defaultChecked />
                <label htmlFor="extract-tables" className="text-sm text-white cursor-pointer">
                  표(Table) 데이터 구조화
                </label>
              </div>
              <Badge className="bg-green-500/20 text-green-400 text-xs">ON (추천)</Badge>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Card>
  );
}
