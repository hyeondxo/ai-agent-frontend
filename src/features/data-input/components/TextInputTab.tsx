/**
 * TextInputTab Component
 * 텍스트 직접 입력 탭
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check } from 'lucide-react';
import { TextInputTabProps } from '../types';

export function TextInputTab({ onAddText }: TextInputTabProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <h3 className="text-white mb-4">텍스트 직접 입력</h3>
      <Textarea
        placeholder="지식 베이스로 사용할 텍스트를 입력하세요..."
        className="min-h-[200px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
      />
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-white/60">0 / 10,000 자</span>
        <Button
          className="bg-gradient-to-r from-purple-500 to-blue-500"
          onClick={() => onAddText?.('')}
        >
          <Check className="w-4 h-4 mr-2" />
          텍스트 추가
        </Button>
      </div>
    </Card>
  );
}
