/**
 * Data Input Page
 * 데이터 입력 - 리팩토링 완료
 */

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Globe, Database, Upload, X, ChevronDown } from 'lucide-react';
import { useDataInput } from '@/features/data-input/hooks/useDataInput';
import {
  TextInputTab,
  UrlCrawlerTab,
  FileUploadTab,
  DatabaseTab,
  DataCleansingSection,
} from '@/features/data-input/components';

export function DataInputPage() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [uploadProgress] = useState(0);
  const [selectedTables, setSelectedTables] = useState<string[]>(['users', 'orders']);

  // Use custom hook for data
  const { tables, documentPreview } = useDataInput();

  // Memoize event handler to prevent re-creation
  const handleToggleTable = useCallback(
    (tableName: string) => {
      if (selectedTables.includes(tableName)) {
        setSelectedTables(selectedTables.filter((t) => t !== tableName));
      } else {
        setSelectedTables([...selectedTables, tableName]);
      }
    },
    [selectedTables]
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">데이터 입력</h1>
          <p className="text-white/60">다양한 소스에서 지식 기반 구축</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            단계 1/4
          </Badge>
        </div>
      </div>

      {/* Data Source Selection */}
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1">
          <TabsTrigger value="text" className="data-[state=active]:bg-purple-500/20">
            <FileText className="w-4 h-4 mr-2" />
            텍스트 입력
          </TabsTrigger>
          <TabsTrigger value="url" className="data-[state=active]:bg-purple-500/20">
            <Globe className="w-4 h-4 mr-2" />
            URL 크롤링
          </TabsTrigger>
          <TabsTrigger value="file" className="data-[state=active]:bg-purple-500/20">
            <Upload className="w-4 h-4 mr-2" />
            파일 업로드
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-purple-500/20">
            <Database className="w-4 h-4 mr-2" />
            데이터베이스
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4 mt-6">
          <TextInputTab />
        </TabsContent>

        <TabsContent value="url" className="space-y-4 mt-6">
          <UrlCrawlerTab
            isAdvancedOpen={isAdvancedOpen}
            onAdvancedOpenChange={setIsAdvancedOpen}
          />
        </TabsContent>

        <TabsContent value="file" className="space-y-4 mt-6">
          <FileUploadTab
            uploadProgress={uploadProgress}
            documentPreview={documentPreview}
          />
        </TabsContent>

        <TabsContent value="database" className="space-y-4 mt-6">
          <DatabaseTab
            tables={tables}
            selectedTables={selectedTables}
            onToggleTable={handleToggleTable}
          />
        </TabsContent>
      </Tabs>

      {/* Data Cleansing Section */}
      <DataCleansingSection />

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" className="border-white/10 !text-white hover:!text-white">
          <X className="w-4 h-4 mr-2" />
          취소
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 !text-white hover:!text-white">
            임시 저장
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            다음 단계
            <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
