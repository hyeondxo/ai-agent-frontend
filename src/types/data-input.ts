/**
 * Data Input page type definitions
 */

/**
 * Database table information
 */
export interface TableInfo {
  name: string;
  columns: string[];
  rows: number;
}

/**
 * Data source types
 */
export type DataSource = 'text' | 'url' | 'file' | 'database';

/**
 * File upload status
 */
export interface UploadStatus {
  progress: number;
  status: 'idle' | 'uploading' | 'completed' | 'error';
  fileName?: string;
}

/**
 * URL crawling configuration
 */
export interface CrawlerConfig {
  url: string;
  depth?: number;
  includeSubdomains?: boolean;
  excludePatterns?: string[];
}

/**
 * Database connection configuration
 */
export interface DatabaseConfig {
  type: 'postgresql' | 'mysql' | 'mongodb' | 'sqlite';
  host: string;
  username: string;
  password: string;
}

/**
 * Database connection form state
 */
export interface DatabaseConnectionForm {
  type: 'postgresql' | 'mysql' | 'mongodb' | 'sqlite';
  host: string;
  username: string;
  password: string;
}

/**
 * Database connection status
 */
export interface DatabaseConnectionStatus {
  isConnected: boolean;
  isConnecting: boolean;
  error?: string;
}
