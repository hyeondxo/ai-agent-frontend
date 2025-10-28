/**
 * DatabaseTab Component
 * 데이터베이스 연결 탭
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Database, Search, Loader2 } from 'lucide-react';
import { DatabaseTabProps, DatabaseConnectionForm } from '../types';

export function DatabaseTab({
  tables,
  selectedTables,
  onToggleTable,
  isConnected,
  isConnecting,
  onConnect,
}: DatabaseTabProps) {
  const [formData, setFormData] = useState<DatabaseConnectionForm>({
    type: 'postgresql',
    host: 'localhost:5432',
    username: '',
    password: '',
  });

  const handleConnect = () => {
    onConnect(formData);
  };

  // 연결 문자열 생성 (예시 표시용)
  const getConnectionString = () => {
    if (!formData.username && !formData.password) {
      return formData.host;
    }
    return `${formData.host}?username=${formData.username}&password=${formData.password ? '****' : ''}`;
  };

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
      <h3 className="text-white mb-4">데이터베이스 연결</h3>

      <div className="space-y-4 mb-6">
        {/* Database Type */}
        <div className="space-y-2">
          <label className="text-sm text-white">데이터베이스 타입</label>
          <select
            className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white"
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as DatabaseConnectionForm['type'],
              })
            }
            disabled={isConnected}
          >
            <option value="postgresql">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="mongodb">MongoDB</option>
            <option value="sqlite">SQLite</option>
          </select>
        </div>

        {/* Host */}
        <div className="space-y-2">
          <label className="text-sm text-white">호스트</label>
          <Input
            placeholder="localhost:5432"
            value={formData.host}
            onChange={(e) => setFormData({ ...formData, host: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            disabled={isConnected}
          />
          <p className="text-xs text-white/40">예: localhost:5432</p>
        </div>

        {/* Username (ID) */}
        <div className="space-y-2">
          <label className="text-sm text-white">사용자 이름 (ID)</label>
          <Input
            placeholder="데이터베이스 사용자 이름"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            disabled={isConnected}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm text-white">비밀번호</label>
          <Input
            type="password"
            placeholder="데이터베이스 비밀번호"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            disabled={isConnected}
          />
        </div>

        {/* Connection String Preview */}
        {(formData.username || formData.password) && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-400 mb-1">연결 문자열 미리보기:</p>
            <code className="text-xs text-white/80 break-all">
              {getConnectionString()}
            </code>
          </div>
        )}

        {/* Connect Button */}
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500"
          onClick={handleConnect}
          disabled={isConnecting || isConnected}
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              연결 중...
            </>
          ) : isConnected ? (
            <>
              <Database className="w-4 h-4 mr-2" />
              연결됨
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              데이터베이스 연결
            </>
          )}
        </Button>
      </div>

      {/* Table Selection - Only show when connected */}
      {isConnected && (
        <div className="space-y-3 border-t border-white/10 pt-6">
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
                    onCheckedChange={() => {
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
                    <p className="text-xs text-white/60 mt-1">
                      {table.columns.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500"
            disabled={selectedTables.length === 0}
          >
            <Database className="w-4 h-4 mr-2" />
            선택한 테이블 가져오기 ({selectedTables.length})
          </Button>
        </div>
      )}
    </Card>
  );
}
