/**
 * 유틸리티 함수 중앙 Export
 *
 * 모든 유틸리티 함수를 한 곳에서 import할 수 있도록 배럴 export를 제공합니다.
 *
 * @example
 * import { formatCurrency, truncate, isValidUrl } from '@/utils';
 */

// 포맷 유틸리티
export {
  formatCurrency,
  formatPercentage,
  formatDuration,
  formatDate,
  formatNumber,
  formatCompactNumber,
  formatBytes,
} from './format';

// 차트 유틸리티
export {
  generateChartColors,
  CHART_COLOR_PALETTES,
  formatChartTooltip,
  normalizeChartData,
  filterChartDataByTimeRange,
  aggregateChartData,
  groupChartData,
  calculateChartDomain,
  generateChartTicks,
  smoothChartData,
  DEFAULT_TOOLTIP_STYLE,
  DEFAULT_GRID_STYLE,
  DEFAULT_AXIS_STYLE,
  type TooltipFormatter,
  type CustomTooltipProps,
} from './chart';

// 검증 유틸리티
export {
  isValidUrl,
  isValidEmail,
  isValidApiKey,
  validatePasswordStrength,
  isValidPhoneNumber,
  isValidJson,
  isValidNumberRange,
  isValidFileExtension,
  isValidFileSize,
  isValidDateRange,
  isValidIPv4,
  isNotEmpty,
} from './validation';

// 문자열 유틸리티
export {
  truncate,
  capitalize,
  titleCase,
  slugify,
  camelToKebab,
  kebabToCamel,
  snakeToCamel,
  stripHtml,
  escapeHtml,
  repeat,
  normalizeWhitespace,
  ensurePrefix,
  ensureSuffix,
  removePrefix,
  removeSuffix,
  pad,
  truncateWords,
  removeAccents,
  randomString,
  getByteSize,
} from './string';
