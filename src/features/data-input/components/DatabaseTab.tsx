/**
 * DatabaseTab Component
 * 데이터베이스 연결 탭
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Database, Search } from 'lucide-react';
import { DatabaseTabProps } from '../types';

export function DatabaseTab({
  isExpertMode,
  tables,
  selectedTables,
  onToggleTable,
  onConnect,
}: DatabaseTabProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <h3 className="text-white mb-4">데이터베이스 연결</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm text-white">데이터베이스 타입</label>
          <select className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white">
            <option>PostgreSQL</option>
            <option>MySQL</option>
            <option>MongoDB</option>
            <option>SQLite</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white">호스트</label>
          <Input
            placeholder="localhost:5432"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Table Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-white text-sm">테이블 선택</h4>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-white/40" />
            <Input
              placeholder="테이블 검색..."
              className="w-48 h-8 bg-white/5 border-white/10 text-white text-sm placeholder:text-white/40"
            />
          </div>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {tables.map((table) => (
            <div
              key={table.name}
              className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  id={table.name}
                  checked={selectedTables.includes(table.name)}
                  onCheckedChange={(checked) => {
                    onToggleTable(table.name);
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-purple-400" />
                    <span className="text-white">{table.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {table.rows.toLocaleString()} rows
                    </Badge>
                  </div>
                  {isExpertMode && (
                    <p className="text-xs text-white/60 mt-1">
                      {table.columns.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500"
        onClick={onConnect}
      >
        <Database className="w-4 h-4 mr-2" />
        선택한 테이블 연결 ({selectedTables.length})
      </Button>
    </Card>
  );
}
