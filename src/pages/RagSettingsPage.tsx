/**
 * RAG Settings Page
 * RAG 파이프라인 설정 - 임베딩 모델 & 벡터DB 선택
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Layers, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { embeddingModels, vectorDatabases, defaultRAGConfig } from '@/data/mockRagSettings';
import type { EmbeddingModel, VectorDB, ChunkingStrategy } from '@/types/rag';

export function RagSettingsPage() {
  const [selectedEmbedding, setSelectedEmbedding] = useState<EmbeddingModel>(
    defaultRAGConfig.embeddingModel
  );
  const [selectedVectorDB, setSelectedVectorDB] = useState<VectorDB>(defaultRAGConfig.vectorDB);
  const [isChunkingOpen, setIsChunkingOpen] = useState(false);
  const [isRetrievalOpen, setIsRetrievalOpen] = useState(false);

  // Chunking settings
  const [chunkingStrategy, setChunkingStrategy] = useState<ChunkingStrategy>(
    defaultRAGConfig.chunking.strategy
  );
  const [chunkSize, setChunkSize] = useState(defaultRAGConfig.chunking.chunkSize);
  const [chunkOverlap, setChunkOverlap] = useState(defaultRAGConfig.chunking.chunkOverlap);

  // Retrieval settings
  const [topK, setTopK] = useState(defaultRAGConfig.retrieval.topK);
  const [scoreThreshold, setScoreThreshold] = useState(defaultRAGConfig.retrieval.scoreThreshold);
  const [maxTokens, setMaxTokens] = useState(defaultRAGConfig.retrieval.maxTokens);
  const [rerankingEnabled, setRerankingEnabled] = useState(
    defaultRAGConfig.retrieval.rerankingEnabled
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">RAG 파이프라인 설정</h1>
          <p className="text-white/60">임베딩 모델과 벡터 데이터베이스 선택</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            단계 2/4
          </Badge>
        </div>
      </div>

      {/* Embedding Model Selection */}
      <div className="space-y-4">
        <h2 className="text-xl text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          임베딩 모델 선택
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {embeddingModels.map((model) => (
            <Card
              key={model.id}
              className={`p-6 cursor-pointer transition-all ${
                selectedEmbedding === model.id
                  ? 'bg-purple-500/20 border-purple-500/50 ring-2 ring-purple-500/50'
                  : 'bg-white/5 border-white/10 hover:border-purple-500/30'
              }`}
              onClick={() => setSelectedEmbedding(model.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium">{model.displayName}</h3>
                    {model.isRecommended && (
                      <Badge className="bg-green-500/20 text-green-400 text-xs">추천</Badge>
                    )}
                  </div>
                  <p className="text-xs text-white/60">{model.provider}</p>
                </div>
                {selectedEmbedding === model.id && (
                  <Check className="w-5 h-5 text-purple-400" />
                )}
              </div>
              <p className="text-sm text-white/80 mb-3">{model.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-white/60">차원: </span>
                  <span className="text-white">{model.dimensions}</span>
                </div>
                <div>
                  <span className="text-white/60">비용: </span>
                  <span className="text-white">${model.costPer1M}/1M</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Vector Database Selection */}
      <div className="space-y-4">
        <h2 className="text-xl text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          벡터 데이터베이스 선택
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vectorDatabases.map((db) => (
            <Card
              key={db.id}
              className={`p-6 cursor-pointer transition-all ${
                selectedVectorDB === db.id
                  ? 'bg-blue-500/20 border-blue-500/50 ring-2 ring-blue-500/50'
                  : 'bg-white/5 border-white/10 hover:border-blue-500/30'
              }`}
              onClick={() => setSelectedVectorDB(db.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium">{db.displayName}</h3>
                    {db.isRecommended && (
                      <Badge className="bg-green-500/20 text-green-400 text-xs">추천</Badge>
                    )}
                  </div>
                  <Badge className="bg-blue-500/30 text-white border border-blue-400/30 text-xs">
                    {db.hosting === 'cloud' ? '클라우드' : db.hosting === 'self-hosted' ? '자체호스팅' : '클라우드/자체호스팅'}
                  </Badge>
                </div>
                {selectedVectorDB === db.id && (
                  <Check className="w-5 h-5 text-blue-400" />
                )}
              </div>
              <p className="text-sm text-white/80 mb-3">{db.description}</p>
              <div className="flex flex-wrap gap-1">
                {db.features.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs text-white border-white/20">
                    {feature}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Advanced Options */}
      <Card className="bg-white/5 border-white/10 p-6">
        <Collapsible open={isChunkingOpen} onOpenChange={setIsChunkingOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <ChevronDown
                className={`w-5 h-5 text-white/60 transition-transform ${
                  isChunkingOpen ? 'rotate-180' : ''
                }`}
              />
              <h3 className="text-white">청킹 전략 설정 (고급)</h3>
            </div>
            <Badge className="bg-gray-500/20 text-gray-400 text-xs">
              기본값: Semantic, 512 tokens
            </Badge>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            {/* Chunking Strategy Selection */}
            <div className="space-y-2">
              <label className="text-sm text-white">청킹 전략</label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={chunkingStrategy === 'semantic' ? 'default' : 'outline'}
                  className={
                    chunkingStrategy === 'semantic'
                      ? 'bg-purple-500/30 border-purple-500/50 text-white'
                      : 'border-white/10 !text-black hover:bg-white/5 hover:!text-black'
                  }
                  onClick={() => setChunkingStrategy('semantic')}
                >
                  Semantic (추천)
                </Button>
                <Button
                  variant={chunkingStrategy === 'fixed-size' ? 'default' : 'outline'}
                  className={
                    chunkingStrategy === 'fixed-size'
                      ? 'bg-purple-500/30 border-purple-500/50 text-white'
                      : 'border-white/10 !text-black hover:bg-white/5 hover:!text-black'
                  }
                  onClick={() => setChunkingStrategy('fixed-size')}
                >
                  Fixed Size
                </Button>
                <Button
                  variant={chunkingStrategy === 'recursive' ? 'default' : 'outline'}
                  className={
                    chunkingStrategy === 'recursive'
                      ? 'bg-purple-500/30 border-purple-500/50 text-white'
                      : 'border-white/10 !text-black hover:bg-white/5 hover:!text-black'
                  }
                  onClick={() => setChunkingStrategy('recursive')}
                >
                  Recursive
                </Button>
                <Button
                  variant={chunkingStrategy === 'sentence' ? 'default' : 'outline'}
                  className={
                    chunkingStrategy === 'sentence'
                      ? 'bg-purple-500/30 border-purple-500/50 text-white'
                      : 'border-white/10 !text-black hover:bg-white/5 hover:!text-black'
                  }
                  onClick={() => setChunkingStrategy('sentence')}
                >
                  Sentence
                </Button>
              </div>
              <p className="text-xs text-white/60">
                Semantic: 의미 기반 분할 (추천) | Fixed: 고정 크기 | Recursive: 재귀적 분할 | Sentence: 문장 단위
              </p>
            </div>

            {/* Chunk Size */}
            <div className="space-y-2">
              <label className="text-sm text-white">청크 크기 (토큰)</label>
              <Input
                type="number"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                className="bg-white/5 border-white/10 text-white"
                min={128}
                max={2048}
                step={128}
              />
              <p className="text-xs text-white/60">
                각 청크의 최대 토큰 수입니다. 기본값: 512 (범위: 128-2048)
              </p>
            </div>

            {/* Chunk Overlap */}
            <div className="space-y-2">
              <label className="text-sm text-white">청크 오버랩 (토큰)</label>
              <Input
                type="number"
                value={chunkOverlap}
                onChange={(e) => setChunkOverlap(Number(e.target.value))}
                className="bg-white/5 border-white/10 text-white"
                min={0}
                max={512}
                step={10}
              />
              <p className="text-xs text-white/60">
                인접한 청크 간 중복되는 토큰 수입니다. 기본값: 50 (범위: 0-512)
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <Card className="bg-white/5 border-white/10 p-6">
        <Collapsible open={isRetrievalOpen} onOpenChange={setIsRetrievalOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <ChevronDown
                className={`w-5 h-5 text-white/60 transition-transform ${
                  isRetrievalOpen ? 'rotate-180' : ''
                }`}
              />
              <h3 className="text-white">검색 설정 (고급)</h3>
            </div>
            <Badge className="bg-gray-500/20 text-gray-400 text-xs">
              기본값: Top 5, Threshold 0.7
            </Badge>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            {/* Top K Setting */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Top K (검색 결과 수)</label>
                <span className="text-sm text-white/80">{topK}</span>
              </div>
              <Slider
                value={[topK]}
                onValueChange={(value) => setTopK(value[0])}
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-white/60">
                검색 시 반환할 최대 문서 청크 개수입니다. 기본값: 5 (범위: 1-20)
              </p>
            </div>

            {/* Score Threshold */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">유사도 임계값 (Score Threshold)</label>
                <span className="text-sm text-white/80">{scoreThreshold.toFixed(2)}</span>
              </div>
              <Slider
                value={[scoreThreshold * 100]}
                onValueChange={(value) => setScoreThreshold(value[0] / 100)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-white/60">
                검색 결과를 필터링할 최소 유사도 점수입니다. 기본값: 0.7 (범위: 0.0-1.0)
              </p>
            </div>

            {/* Max Tokens */}
            <div className="space-y-2">
              <label className="text-sm text-white">최대 토큰 수</label>
              <Input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
                className="bg-white/5 border-white/10 text-white"
                min={1000}
                max={8000}
                step={500}
              />
              <p className="text-xs text-white/60">
                검색 결과로 사용할 최대 토큰 수입니다. 기본값: 4000 (범위: 1000-8000)
              </p>
            </div>

            {/* Reranking Toggle */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="reranking"
                    checked={rerankingEnabled}
                    onCheckedChange={(checked) => setRerankingEnabled(checked as boolean)}
                  />
                  <label htmlFor="reranking" className="text-sm text-white cursor-pointer">
                    재순위 (Reranking) 활성화
                  </label>
                </div>
                <p className="text-xs text-white/60 mt-1 ml-6">
                  검색 결과의 관련성을 재평가하여 더 정확한 순서로 정렬합니다. (추가 비용 발생)
                </p>
              </div>
              {rerankingEnabled && (
                <Badge className="bg-green-500/20 text-green-400 text-xs">활성화</Badge>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" className="border-white/10 !text-white hover:!text-white">
          이전 단계
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 !text-white hover:!text-white">
            임시 저장
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            다음 단계
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
