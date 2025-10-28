/**
 * 포맷팅 유틸리티 함수 모음
 *
 * 금액, 퍼센트, 시간, 날짜 등의 데이터를 사용자 친화적인 형식으로 변환합니다.
 */

/**
 * 숫자를 통화 형식으로 포맷합니다.
 *
 * @param value - 포맷할 숫자 값
 * @param currency - 통화 코드 (기본값: 'USD')
 * @param locale - 로케일 (기본값: 'ko-KR')
 * @returns 포맷된 통화 문자열
 *
 * @example
 * formatCurrency(1234.56) // '$1,234.56'
 * formatCurrency(1234.56, 'KRW') // '₩1,235'
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'ko-KR'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'KRW' ? 0 : 2,
      maximumFractionDigits: currency === 'KRW' ? 0 : 2,
    }).format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return `${value}`;
  }
}

/**
 * 숫자를 퍼센트 형식으로 포맷합니다.
 *
 * @param value - 포맷할 숫자 값 (0-100 범위)
 * @param decimals - 소수점 자릿수 (기본값: 1)
 * @param includeSymbol - '%' 기호 포함 여부 (기본값: true)
 * @returns 포맷된 퍼센트 문자열
 *
 * @example
 * formatPercentage(85.678) // '85.7%'
 * formatPercentage(85.678, 0) // '86%'
 * formatPercentage(85.678, 2, false) // '85.68'
 */
export function formatPercentage(
  value: number,
  decimals: number = 1,
  includeSymbol: boolean = true
): string {
  const formatted = value.toFixed(decimals);
  return includeSymbol ? `${formatted}%` : formatted;
}

/**
 * 밀리초 단위 시간을 사람이 읽기 쉬운 형식으로 포맷합니다.
 *
 * @param milliseconds - 밀리초 단위 시간
 * @param short - 짧은 형식 사용 여부 (기본값: false)
 * @returns 포맷된 시간 문자열
 *
 * @example
 * formatDuration(1500) // '1.5초'
 * formatDuration(65000) // '1분 5초'
 * formatDuration(3665000) // '1시간 1분'
 * formatDuration(3665000, true) // '1h 1m'
 */
export function formatDuration(
  milliseconds: number,
  short: boolean = false
): string {
  if (milliseconds < 0) {
    return '0초';
  }

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const remainingHours = hours % 24;
    if (short) {
      return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
    }
    return remainingHours > 0 ? `${days}일 ${remainingHours}시간` : `${days}일`;
  }

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    if (short) {
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return remainingMinutes > 0 ? `${hours}시간 ${remainingMinutes}분` : `${hours}시간`;
  }

  if (minutes > 0) {
    const remainingSeconds = seconds % 60;
    if (short) {
      return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
    }
    return remainingSeconds > 0 ? `${minutes}분 ${remainingSeconds}초` : `${minutes}분`;
  }

  if (seconds > 0) {
    return short ? `${seconds}s` : `${seconds}초`;
  }

  // 1초 미만
  return short ? `${milliseconds}ms` : `${milliseconds}밀리초`;
}

/**
 * Date 객체 또는 타임스탬프를 포맷된 날짜 문자열로 변환합니다.
 *
 * @param date - Date 객체, 타임스탬프(밀리초), 또는 날짜 문자열
 * @param format - 포맷 타입 ('short' | 'long' | 'time' | 'datetime')
 * @param locale - 로케일 (기본값: 'ko-KR')
 * @returns 포맷된 날짜 문자열
 *
 * @example
 * formatDate(new Date(), 'short') // '2025.10.28'
 * formatDate(new Date(), 'long') // '2025년 10월 28일'
 * formatDate(new Date(), 'time') // '오후 3:45'
 * formatDate(new Date(), 'datetime') // '2025.10.28 오후 3:45'
 */
export function formatDate(
  date: Date | number | string,
  format: 'short' | 'long' | 'time' | 'datetime' = 'short',
  locale: string = 'ko-KR'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;

  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date:', date);
    return '-';
  }

  try {
    switch (format) {
      case 'short':
        return new Intl.DateTimeFormat(locale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(dateObj);

      case 'long':
        return new Intl.DateTimeFormat(locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(dateObj);

      case 'time':
        return new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(dateObj);

      case 'datetime':
        return new Intl.DateTimeFormat(locale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(dateObj);

      default:
        return dateObj.toISOString();
    }
  } catch (error) {
    console.error('Date formatting error:', error);
    return '-';
  }
}

/**
 * 숫자를 천 단위로 구분하여 포맷합니다.
 *
 * @param value - 포맷할 숫자
 * @param decimals - 소수점 자릿수 (기본값: 0)
 * @returns 포맷된 숫자 문자열
 *
 * @example
 * formatNumber(1234567) // '1,234,567'
 * formatNumber(1234.5678, 2) // '1,234.57'
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * 숫자를 압축된 형식으로 포맷합니다 (K, M, B 단위).
 *
 * @param value - 포맷할 숫자
 * @param decimals - 소수점 자릿수 (기본값: 1)
 * @returns 압축된 숫자 문자열
 *
 * @example
 * formatCompactNumber(1234) // '1.2K'
 * formatCompactNumber(1234567) // '1.2M'
 * formatCompactNumber(1234567890) // '1.2B'
 */
export function formatCompactNumber(value: number, decimals: number = 1): string {
  if (value < 1000) {
    return value.toString();
  }

  const units = ['K', 'M', 'B', 'T'];
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);

  if (tier <= 0) {
    return value.toString();
  }

  const unit = units[tier - 1];
  const scaled = value / Math.pow(1000, tier);

  return `${scaled.toFixed(decimals)}${unit}`;
}

/**
 * 바이트 크기를 사람이 읽기 쉬운 형식으로 포맷합니다.
 *
 * @param bytes - 바이트 크기
 * @param decimals - 소수점 자릿수 (기본값: 2)
 * @returns 포맷된 바이트 크기 문자열
 *
 * @example
 * formatBytes(1024) // '1.00 KB'
 * formatBytes(1048576) // '1.00 MB'
 * formatBytes(1073741824, 1) // '1.0 GB'
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}
