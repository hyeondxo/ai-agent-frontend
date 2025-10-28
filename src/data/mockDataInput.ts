import type { TableInfo, DataSource } from '@/types/data-input';

/**
 * Mock database table information
 */
export const mockTables: TableInfo[] = [
  {
    name: 'users',
    columns: ['id', 'name', 'email', 'created_at'],
    rows: 15420,
  },
  {
    name: 'orders',
    columns: ['id', 'user_id', 'product', 'amount', 'date'],
    rows: 48932,
  },
  {
    name: 'products',
    columns: ['id', 'name', 'price', 'category'],
    rows: 2341,
  },
  {
    name: 'reviews',
    columns: ['id', 'user_id', 'product_id', 'rating', 'comment'],
    rows: 9876,
  },
];

/**
 * Mock document preview content
 */
export const mockDocumentPreview = `
Chapter 1: Introduction to AI Agents

AI agents are autonomous systems that can perceive their environment,
make decisions, and take actions to achieve specific goals...

[Table of Contents]
1. Introduction to AI Agents
2. Architecture Patterns
3. Implementation Guide
`;

/**
 * Mock upload status data
 */
export const mockUploadStatus = {
  fileName: 'document.pdf',
  progress: 0,
  isUploading: false,
  isComplete: false,
} as const;

/**
 * Mock crawler configuration
 */
export const mockCrawlerConfig = {
  followLinks: true,
  maxDepth: 3,
  extractImages: false,
  extractTables: true,
} as const;

/**
 * Mock database connection config
 */
export const mockDatabaseConfig = {
  type: 'PostgreSQL' as const,
  host: 'localhost:5432',
  database: '',
  username: '',
  password: '',
} as const;

/**
 * Mock data cleansing options
 */
export const mockCleansingOptions = {
  removeBoilerplate: true,
  filterNoise: true,
  customFilter: false,
  aiBasedCleansing: false,
  customKeywords: '',
} as const;

/**
 * Mock AI suggestion for data cleansing
 */
export const mockCleaningSuggestion = {
  duplicates: 1234,
  noise: 567,
  message:
    '현재 데이터에서 1,234개의 중복 항목과 567개의 노이즈를 감지했습니다. 자동 정제를 권장합니다.',
} as const;
