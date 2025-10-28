/**
 * Data Input Feature Types
 * 데이터 입력 기능의 타입 정의
 */

/**
 * 데이터베이스 테이블 정보
 */
export interface TableInfo {
  name: string;
  rows: number;
  columns: string[];
}

/**
 * TextInputTab Props
 */
export interface TextInputTabProps {
  onAddText?: (text: string) => void;
}

/**
 * UrlCrawlerTab Props
 */
export interface UrlCrawlerTabProps {
  isExpertMode: boolean;
  isAdvancedOpen: boolean;
  onAdvancedOpenChange: (open: boolean) => void;
  onStartCrawling?: (url: string) => void;
}

/**
 * FileUploadTab Props
 */
export interface FileUploadTabProps {
  isExpertMode: boolean;
  uploadProgress: number;
  documentPreview: string;
  onFileUpload?: (files: FileList) => void;
}

/**
 * DatabaseTab Props
 */
export interface DatabaseTabProps {
  isExpertMode: boolean;
  tables: TableInfo[];
  selectedTables: string[];
  onToggleTable: (tableName: string) => void;
  onConnect?: () => void;
}

/**
 * DataCleansingSection Props
 */
export interface DataCleansingSectionProps {
  isExpertMode: boolean;
}
