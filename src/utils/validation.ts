/**
 * 검증 유틸리티 함수 모음
 *
 * URL, 이메일, API 키 등의 입력값 유효성을 검증합니다.
 */

/**
 * URL 형식이 유효한지 검증합니다.
 *
 * @param url - 검증할 URL 문자열
 * @param options - 검증 옵션
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isValidUrl('https://example.com') // true
 * isValidUrl('not-a-url') // false
 * isValidUrl('http://example.com', { httpsOnly: true }) // false
 * isValidUrl('example.com', { requireProtocol: false }) // true
 */
export function isValidUrl(
  url: string,
  options: {
    httpsOnly?: boolean;
    requireProtocol?: boolean;
    allowLocalhost?: boolean;
  } = {}
): boolean {
  const {
    httpsOnly = false,
    requireProtocol = true,
    allowLocalhost = true,
  } = options;

  // 빈 문자열 체크
  if (!url || url.trim() === '') {
    return false;
  }

  // 프로토콜이 없는 경우 http:// 추가
  let urlToTest = url;
  if (!url.match(/^https?:\/\//i)) {
    if (requireProtocol) {
      return false;
    }
    urlToTest = `https://${url}`;
  }

  try {
    const urlObj = new URL(urlToTest);

    // HTTPS 전용 검증
    if (httpsOnly && urlObj.protocol !== 'https:') {
      return false;
    }

    // localhost 허용 여부
    if (!allowLocalhost) {
      const hostname = urlObj.hostname.toLowerCase();
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '::1' ||
        hostname.endsWith('.local')
      ) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * 이메일 형식이 유효한지 검증합니다.
 *
 * @param email - 검증할 이메일 문자열
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 * isValidEmail('user+tag@example.co.kr') // true
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim() === '') {
    return false;
  }

  // RFC 5322 기반 이메일 정규식 (간소화 버전)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email);
}

/**
 * API 키 형식이 유효한지 검증합니다.
 *
 * @param apiKey - 검증할 API 키 문자열
 * @param options - 검증 옵션
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isValidApiKey('sk-1234567890abcdef') // true
 * isValidApiKey('short') // false (기본 최소 길이 16)
 * isValidApiKey('sk-1234', { minLength: 4, prefix: 'sk-' }) // true
 */
export function isValidApiKey(
  apiKey: string,
  options: {
    minLength?: number;
    maxLength?: number;
    prefix?: string;
    allowedChars?: RegExp;
  } = {}
): boolean {
  const {
    minLength = 16,
    maxLength = 256,
    prefix,
    allowedChars = /^[a-zA-Z0-9_-]+$/,
  } = options;

  // 빈 문자열 체크
  if (!apiKey || apiKey.trim() === '') {
    return false;
  }

  // 길이 검증
  if (apiKey.length < minLength || apiKey.length > maxLength) {
    return false;
  }

  // 접두사 검증
  if (prefix && !apiKey.startsWith(prefix)) {
    return false;
  }

  // 허용된 문자 검증
  const keyToTest = prefix ? apiKey.slice(prefix.length) : apiKey;
  return allowedChars.test(keyToTest);
}

/**
 * 비밀번호 강도를 검증합니다.
 *
 * @param password - 검증할 비밀번호
 * @param options - 검증 옵션
 * @returns { valid: boolean, strength: 'weak' | 'medium' | 'strong', issues: string[] }
 *
 * @example
 * validatePasswordStrength('pass') // { valid: false, strength: 'weak', issues: ['너무 짧음'] }
 * validatePasswordStrength('Pass123!') // { valid: true, strength: 'strong', issues: [] }
 */
export function validatePasswordStrength(
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}
): {
  valid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  issues: string[];
} {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;

  const issues: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';

  // 길이 검증
  if (password.length < minLength) {
    issues.push(`최소 ${minLength}자 이상이어야 합니다`);
  }

  // 대문자 검증
  if (requireUppercase && !/[A-Z]/.test(password)) {
    issues.push('대문자를 포함해야 합니다');
  }

  // 소문자 검증
  if (requireLowercase && !/[a-z]/.test(password)) {
    issues.push('소문자를 포함해야 합니다');
  }

  // 숫자 검증
  if (requireNumbers && !/[0-9]/.test(password)) {
    issues.push('숫자를 포함해야 합니다');
  }

  // 특수문자 검증
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    issues.push('특수문자를 포함해야 합니다');
  }

  // 강도 계산
  let score = 0;
  if (password.length >= minLength) score++;
  if (password.length >= minLength + 4) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score >= 5) {
    strength = 'strong';
  } else if (score >= 3) {
    strength = 'medium';
  }

  return {
    valid: issues.length === 0,
    strength,
    issues,
  };
}

/**
 * 전화번호 형식이 유효한지 검증합니다 (한국 번호).
 *
 * @param phoneNumber - 검증할 전화번호 문자열
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isValidPhoneNumber('010-1234-5678') // true
 * isValidPhoneNumber('01012345678') // true
 * isValidPhoneNumber('02-1234-5678') // true (서울 지역번호)
 * isValidPhoneNumber('123-456-7890') // false
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber || phoneNumber.trim() === '') {
    return false;
  }

  // 하이픈 제거
  const cleaned = phoneNumber.replace(/-/g, '');

  // 한국 전화번호 패턴
  // 010으로 시작하는 휴대폰: 010-XXXX-XXXX (11자리)
  // 02로 시작하는 서울: 02-XXX-XXXX 또는 02-XXXX-XXXX (9-10자리)
  // 기타 지역번호: 0XX-XXX-XXXX 또는 0XX-XXXX-XXXX (10-11자리)
  const patterns = [
    /^010\d{8}$/, // 010-XXXX-XXXX
    /^02\d{7,8}$/, // 02-XXX-XXXX or 02-XXXX-XXXX
    /^0[3-9]\d{8,9}$/, // 0XX-XXX-XXXX or 0XX-XXXX-XXXX
  ];

  return patterns.some((pattern) => pattern.test(cleaned));
}

/**
 * JSON 문자열이 유효한지 검증합니다.
 *
 * @param jsonString - 검증할 JSON 문자열
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isValidJson('{"key": "value"}') // true
 * isValidJson('invalid json') // false
 */
export function isValidJson(jsonString: string): boolean {
  if (!jsonString || jsonString.trim() === '') {
    return false;
  }

  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

/**
 * 숫자 범위가 유효한지 검증합니다.
 *
 * @param value - 검증할 숫자
 * @param min - 최소값 (선택)
 * @param max - 최대값 (선택)
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isValidNumberRange(50, 0, 100) // true
 * isValidNumberRange(-10, 0, 100) // false
 * isValidNumberRange(5, 0) // true (최대값 제한 없음)
 */
export function isValidNumberRange(
  value: number,
  min?: number,
  max?: number
): boolean {
  if (typeof value !== 'number' || isNaN(value)) {
    return false;
  }

  if (min !== undefined && value < min) {
    return false;
  }

  if (max !== undefined && value > max) {
    return false;
  }

  return true;
}

/**
 * 파일 확장자가 허용된 타입인지 검증합니다.
 *
 * @param filename - 검증할 파일명
 * @param allowedExtensions - 허용된 확장자 배열
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isValidFileExtension('document.pdf', ['.pdf', '.doc']) // true
 * isValidFileExtension('image.jpg', ['.png', '.gif']) // false
 * isValidFileExtension('data.CSV', ['.csv']) // true (대소문자 무시)
 */
export function isValidFileExtension(
  filename: string,
  allowedExtensions: string[]
): boolean {
  if (!filename || filename.trim() === '') {
    return false;
  }

  const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  const normalizedExtensions = allowedExtensions.map((ext) =>
    ext.toLowerCase().startsWith('.') ? ext.toLowerCase() : `.${ext.toLowerCase()}`
  );

  return normalizedExtensions.includes(extension);
}

/**
 * 파일 크기가 제한 범위 내인지 검증합니다.
 *
 * @param fileSizeBytes - 파일 크기 (바이트)
 * @param maxSizeMB - 최대 크기 (MB)
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isValidFileSize(1024 * 1024, 5) // true (1MB < 5MB)
 * isValidFileSize(10 * 1024 * 1024, 5) // false (10MB > 5MB)
 */
export function isValidFileSize(fileSizeBytes: number, maxSizeMB: number): boolean {
  if (fileSizeBytes < 0) {
    return false;
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return fileSizeBytes <= maxSizeBytes;
}

/**
 * 날짜가 유효하고 범위 내에 있는지 검증합니다.
 *
 * @param date - 검증할 날짜
 * @param minDate - 최소 날짜 (선택)
 * @param maxDate - 최대 날짜 (선택)
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isValidDateRange(new Date(), new Date('2020-01-01'), new Date('2030-12-31')) // true
 * isValidDateRange(new Date('2015-01-01'), new Date('2020-01-01')) // false
 */
export function isValidDateRange(
  date: Date,
  minDate?: Date,
  maxDate?: Date
): boolean {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }

  if (minDate && date < minDate) {
    return false;
  }

  if (maxDate && date > maxDate) {
    return false;
  }

  return true;
}

/**
 * IPv4 주소가 유효한지 검증합니다.
 *
 * @param ip - 검증할 IP 주소 문자열
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isValidIPv4('192.168.1.1') // true
 * isValidIPv4('256.1.1.1') // false
 * isValidIPv4('192.168.1') // false
 */
export function isValidIPv4(ip: string): boolean {
  if (!ip || ip.trim() === '') {
    return false;
  }

  const parts = ip.split('.');
  if (parts.length !== 4) {
    return false;
  }

  return parts.every((part) => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255 && part === String(num);
  });
}

/**
 * 문자열이 비어있지 않은지 검증합니다 (공백 제거 후).
 *
 * @param value - 검증할 문자열
 * @param minLength - 최소 길이 (선택)
 * @returns 유효하면 true, 아니면 false
 *
 * @example
 * isNotEmpty('hello') // true
 * isNotEmpty('   ') // false
 * isNotEmpty('hi', 3) // false (길이가 3 미만)
 */
export function isNotEmpty(value: string, minLength: number = 1): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  const trimmed = value.trim();
  return trimmed.length >= minLength;
}
