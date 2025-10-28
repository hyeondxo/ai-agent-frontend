/**
 * FileUploadTab Component
 * 파일 업로드 탭
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Upload,
  FileText,
  Table,
  Image as ImageIcon,
  FileCode,
  ChevronDown,
} from 'lucide-react';
import { FileUploadTabProps } from '../types';

export function FileUploadTab({
  uploadProgress,
  documentPreview,
}: FileUploadTabProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <h3 className="text-white mb-4">파일 업로드</h3>

      {/* Drag & Drop Zone */}
      <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
        <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
        <p className="text-white mb-2">파일을 드래그하거나 클릭하여 업로드</p>
        <p className="text-sm text-white/60">PDF, DOCX, TXT, CSV, XLSX 지원</p>
      </div>

      {/* Upload Progress */}
      {uploadProgress > 0 && (
        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white">document.pdf</span>
            <span className="text-sm text-white/60">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}

      {/* Advanced Options */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen} className="mt-6">
        <CollapsibleTrigger className="flex items-center gap-2 text-sm text-white/60 hover:text-white">
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isAdvancedOpen ? 'rotate-180' : ''
            }`}
          />
          고급 추출 옵션
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          {/* PDF Extraction Options */}
          <div className="space-y-3">
            <h4 className="text-white text-sm">PDF/문서 추출 옵션</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  className="border-white/10 !text-white hover:bg-white/5 hover:!text-white justify-start"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  텍스트만 추출
                </Button>
                <Badge className="bg-green-500/20 text-green-400 text-xs self-start">추천</Badge>
              </div>
              <Button
                variant="outline"
                className="border-white/10 !text-white hover:bg-white/5 hover:!text-white justify-start"
              >
                <Table className="w-4 h-4 mr-2" />
                표(Table)만 추출
              </Button>
              <Button
                variant="outline"
                className="border-white/10 !text-white hover:bg-white/5 hover:!text-white justify-start"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                이미지 캡션
              </Button>
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  className="border-white/10 !text-white hover:bg-white/5 hover:!text-white justify-start"
                >
                  <FileCode className="w-4 h-4 mr-2" />
                  메타데이터 포함
                </Button>
                <Badge className="bg-green-500/20 text-green-400 text-xs self-start">추천</Badge>
              </div>
            </div>
          </div>

          {/* Document Preview */}
          {documentPreview && (
            <div>
              <h4 className="text-white text-sm mb-3">문서 미리보기</h4>
              <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono">
                  {documentPreview}
                </pre>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 !text-white hover:!text-white"
                >
                  페이지 1-5 선택
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 !text-white hover:!text-white"
                >
                  챕터별 분할
                </Button>
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
