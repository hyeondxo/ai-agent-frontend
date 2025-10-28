/**
 * Mock RAG Settings Data
 * RAG 파이프라인 설정을 위한 Mock 데이터
 */

import type { EmbeddingModelInfo, VectorDBInfo } from '@/types/rag';

/**
 * 임베딩 모델 목록
 */
export const embeddingModels: EmbeddingModelInfo[] = [
  {
    id: 'sentence-transformers',
    displayName: 'Sentence Transformers (paraphrase-multilingual)',
    provider: 'Open Source',
    description: '오픈소스 경량 모델. 로컬 실행 가능하여 비용이 들지 않습니다.',
    dimensions: 768,
    maxTokens: 512,
    costPer1M: 0,
    isRecommended: true,
  },
  {
    id: 'openai-large',
    displayName: 'OpenAI text-embedding-3-large',
    provider: 'OpenAI',
    description: '최신 OpenAI 임베딩 모델. 높은 정확도와 안정성을 제공합니다.',
    dimensions: 3072,
    maxTokens: 8191,
    costPer1M: 0,
  },
  {
    id: 'openai-small',
    displayName: 'OpenAI text-embedding-3-small',
    provider: 'OpenAI',
    description: '경량화된 OpenAI 임베딩 모델. 빠른 처리 속도와 비용 효율성.',
    dimensions: 1536,
    maxTokens: 8191,
    costPer1M: 0.02,
  },
  {
    id: 'cohere',
    displayName: 'Cohere embed-multilingual-v3.0',
    provider: 'Cohere',
    description: '다국어 지원이 우수한 Cohere 임베딩. 한국어 성능이 뛰어납니다.',
    dimensions: 1024,
    maxTokens: 512,
    costPer1M: 0.10,
  },
  {
    id: 'voyage',
    displayName: 'Voyage AI voyage-large-2',
    provider: 'Voyage AI',
    description: '특화된 도메인에 강한 임베딩 모델. 기술 문서에 최적화되었습니다.',
    dimensions: 1536,
    maxTokens: 16000,
    costPer1M: 0.12,
  },
];

/**
 * 벡터 데이터베이스 목록
 */
export const vectorDatabases: VectorDBInfo[] = [
  {
    id: 'chromadb',
    displayName: 'ChromaDB',
    description: '경량 임베디드 벡터DB. 빠른 프로토타이핑에 최적화되었습니다.',
    features: ['임베디드 모드', '빠른 설정', 'Python 네이티브', '무료'],
    hosting: 'both',
    isRecommended: true,
  },
  {
    id: 'pinecone',
    displayName: 'Pinecone',
    description: '관리형 벡터DB. 쉬운 설정과 자동 확장성을 제공합니다.',
    features: ['완전 관리형', '자동 확장', '실시간 업데이트', '고성능'],
    hosting: 'cloud',
  },
  {
    id: 'weaviate',
    displayName: 'Weaviate',
    description: '오픈소스 벡터DB. 유연한 스키마와 강력한 검색 기능.',
    features: ['GraphQL API', '하이브리드 검색', '스키마 지원', '오픈소스'],
    hosting: 'both',
  },
  {
    id: 'qdrant',
    displayName: 'Qdrant',
    description: '고성능 벡터 검색. 로컬/클라우드 모두 지원하는 Rust 기반 DB.',
    features: ['고성능', 'REST API', '필터링', 'Docker 지원'],
    hosting: 'both',
  },
];

/**
 * 기본 RAG 설정
 */
export const defaultRAGConfig = {
  embeddingModel: 'sentence-transformers' as const,
  vectorDB: 'chromadb' as const,
  chunking: {
    strategy: 'semantic' as const,
    chunkSize: 512,
    chunkOverlap: 50,
  },
  retrieval: {
    topK: 5,
    scoreThreshold: 0.7,
    maxTokens: 4000,
    rerankingEnabled: false,
  },
};
