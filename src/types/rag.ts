/**
 * RAG Configuration Types
 * RAG 파이프라인 설정을 위한 타입 정의
 */

/**
 * 임베딩 모델 종류
 */
export type EmbeddingModel =
  | 'openai-large'
  | 'openai-small'
  | 'cohere'
  | 'sentence-transformers'
  | 'voyage';

/**
 * 벡터 데이터베이스 종류
 */
export type VectorDB = 'pinecone' | 'weaviate' | 'qdrant' | 'chromadb';

/**
 * 청킹 전략
 */
export type ChunkingStrategy =
  | 'fixed-size'
  | 'semantic'
  | 'recursive'
  | 'sentence';

/**
 * 임베딩 모델 정보
 */
export interface EmbeddingModelInfo {
  id: EmbeddingModel;
  displayName: string;
  provider: string;
  description: string;
  dimensions: number;
  maxTokens: number;
  costPer1M: number;
  isRecommended?: boolean;
}

/**
 * 벡터DB 정보
 */
export interface VectorDBInfo {
  id: VectorDB;
  displayName: string;
  description: string;
  features: string[];
  hosting: 'cloud' | 'self-hosted' | 'both';
  isRecommended?: boolean;
}

/**
 * 청킹 설정
 */
export interface ChunkingConfig {
  strategy: ChunkingStrategy;
  chunkSize: number;
  chunkOverlap: number;
  separators?: string[];
}

/**
 * 검색 설정
 */
export interface RetrievalConfig {
  topK: number;
  scoreThreshold: number;
  maxTokens: number;
  rerankingEnabled: boolean;
}

/**
 * RAG 전체 설정
 */
export interface RAGConfig {
  embeddingModel: EmbeddingModel;
  vectorDB: VectorDB;
  chunking: ChunkingConfig;
  retrieval: RetrievalConfig;
}
