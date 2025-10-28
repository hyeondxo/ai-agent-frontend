/**
 * TestSetList Component
 * 테스트 세트 목록 (프롬프트 히스토리 대체)
 */

import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, Users } from 'lucide-react';
import type { TestSetResult } from '@/types/prompt';
import { formatDate } from '@/utils';

interface TestSetListProps {
  testSets: TestSetResult[];
}

export function TestSetList({ testSets }: TestSetListProps) {
  const navigate = useNavigate();

  const handleSelectTestSet = (testSetId: string) => {
    navigate(`/prompt-studio/test-set/${testSetId}`);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-blue-400" />
        <h3 className="text-white">테스트 세트 목록</h3>
      </div>
      <div className="space-y-2">
        {testSets.length === 0 ? (
          <p className="text-white/60 text-sm text-center py-4">
            아직 실행된 테스트 세트가 없습니다
          </p>
        ) : (
          testSets.map((testSet) => (
            <div
              key={testSet.testSetId}
              onClick={() => handleSelectTestSet(testSet.testSetId)}
              className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">
                  {testSet.testSetId}
                </span>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-white/60" />
                  <Badge variant="secondary" className="text-xs">
                    {testSet.selectedModels.length} 모델
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-white/60">
                {formatDate(testSet.executedAt)}
              </p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
