/**
 * Deployment Page
 * 배포 및 통합 - 리팩토링 완료 (단순화된 버전)
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Rocket,
  Globe,
  Code,
  Smartphone,
  Copy,
  CheckCircle2,
  ExternalLink,
  Settings,
  Key,
  Zap,
  Clock,
  Users,
  Activity,
  Download,
} from 'lucide-react';
import { useDeploymentConfig } from '@/hooks/useDeploymentConfig';

export function DeploymentPage() {
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [embedCodeCopied, setEmbedCodeCopied] = useState(false);

  const {
    apiConfig,
    codeExamples,
  } = useDeploymentConfig();

  const { apiKey, apiEndpoint } = apiConfig;
  const { webWidget: embedCode, curl: curlExample } = codeExamples;

  const handleCopy = (text: string, type: 'api' | 'embed') => {
    navigator.clipboard.writeText(text);
    if (type === 'api') {
      setApiKeyCopied(true);
      setTimeout(() => setApiKeyCopied(false), 2000);
    } else {
      setEmbedCodeCopied(true);
      setTimeout(() => setEmbedCodeCopied(false), 2000);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">배포 및 통합</h1>
          <p className="text-white/60">AI 에이전트를 실제 서비스에 통합하세요</p>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <Activity className="w-3 h-3 mr-1" />
          배포 준비 완료
        </Badge>
      </div>

      {/* Deployment Status */}
      <Card className="bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 backdrop-blur-xl border-green-500/30 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl mb-2">배포 상태</h3>
              <p className="text-white/80 mb-4">에이전트가 성공적으로 배포되었습니다!</p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-white/60 mb-1">가동률</p>
                  <p className="text-white text-lg">99.9%</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1">평균 응답 시간</p>
                  <p className="text-white text-lg">1.8초</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1">총 요청 수</p>
                  <p className="text-white text-lg">12,543</p>
                </div>
              </div>
            </div>
          </div>
          <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
            <ExternalLink className="w-4 h-4 mr-2" />
            대시보드 보기
          </Button>
        </div>
      </Card>

      {/* Deployment Options Tabs */}
      <Tabs defaultValue="api" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1">
          <TabsTrigger value="api" className="data-[state=active]:bg-purple-500/20">
            <Code className="w-4 h-4 mr-2" />
            REST API
          </TabsTrigger>
          <TabsTrigger value="widget" className="data-[state=active]:bg-purple-500/20">
            <Globe className="w-4 h-4 mr-2" />
            웹 위젯
          </TabsTrigger>
        </TabsList>

        {/* REST API Tab */}
        <TabsContent value="api" className="space-y-6 mt-6">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-purple-400" />
              <h3 className="text-white">API 키</h3>
            </div>
            <div className="flex gap-3">
              <Input
                value={apiKey}
                readOnly
                className="flex-1 bg-black/30 border-white/10 text-white font-mono"
              />
              <Button
                onClick={() => handleCopy(apiKey, 'api')}
                className="bg-white/10 hover:bg-white/20"
              >
                {apiKeyCopied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    복사
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-white/60 mt-2">
              ⚠️ API 키를 안전하게 보관하세요.
            </p>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-blue-400" />
              <h3 className="text-white">엔드포인트</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-2 block">Base URL</label>
                <div className="flex gap-3">
                  <Input
                    value={apiEndpoint}
                    readOnly
                    className="flex-1 bg-black/30 border-white/10 text-white font-mono text-sm"
                  />
                  <Button
                    onClick={() => handleCopy(apiEndpoint, 'api')}
                    variant="outline"
                    className="border-white/10 !text-white hover:!text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">cURL 예제</label>
                <pre className="bg-black/30 border border-white/10 rounded-lg p-4 text-xs text-white/80 overflow-x-auto font-mono">
                  {curlExample}
                </pre>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Web Widget Tab */}
        <TabsContent value="widget" className="space-y-6 mt-6">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-green-400" />
              <h3 className="text-white">임베드 코드</h3>
            </div>
            <div className="relative">
              <pre className="bg-black/30 border border-white/10 rounded-lg p-4 text-xs text-white/80 overflow-x-auto font-mono">
                {embedCode}
              </pre>
              <Button
                onClick={() => handleCopy(embedCode, 'embed')}
                size="sm"
                className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
              >
                {embedCodeCopied ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    복사
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-white/60 mt-3">
              위 코드를 웹사이트의 &lt;/body&gt; 태그 직전에 붙여넣으세요.
            </p>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-purple-400" />
              <h3 className="text-white">위젯 커스터마이징</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/80">테마</label>
                <select className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white">
                  <option>Dark</option>
                  <option>Light</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/80">위치</label>
                <select className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white">
                  <option>우측 하단</option>
                  <option>좌측 하단</option>
                </select>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Usage Statistics */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
        <h3 className="text-white mb-4">사용량 통계 (실시간)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/60">활성 사용자</span>
            </div>
            <p className="text-2xl text-white">324</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/60">오늘 요청 수</span>
            </div>
            <p className="text-2xl text-white">1,847</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white/60">평균 응답시간</span>
            </div>
            <p className="text-2xl text-white">1.8s</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white/60">성공률</span>
            </div>
            <p className="text-2xl text-white">99.2%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
