import {
  mockTables,
  mockDocumentPreview,
  mockUploadStatus,
  mockCrawlerConfig,
  mockDatabaseConfig,
  mockCleansingOptions,
  mockCleaningSuggestion,
} from '@/data/mockDataInput';

/**
 * Custom hook for data input functionality
 *
 * Returns data input related information including database tables,
 * document previews, upload status, crawler config, and cleansing options.
 *
 * @returns Data input configuration and state
 */
export function useDataInput() {
  // In the future, this will manage upload state and API calls
  // For now, return mock data
  return {
    tables: mockTables,
    documentPreview: mockDocumentPreview,
    uploadStatus: mockUploadStatus,
    crawlerConfig: mockCrawlerConfig,
    databaseConfig: mockDatabaseConfig,
    cleansingOptions: mockCleansingOptions,
    cleaningSuggestion: mockCleaningSuggestion,
  };
}
