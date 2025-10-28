/**
 * 문자열 처리 유틸리티 함수 모음
 *
 * 문자열 자르기, 대소문자 변환, 슬러그 생성 등의 기능을 제공합니다.
 */

/**
 * 문자열을 지정된 길이로 자르고 말줄임표를 추가합니다.
 *
 * @param text - 자를 문자열
 * @param maxLength - 최대 길이
 * @param ellipsis - 말줄임표 문자 (기본값: '...')
 * @returns 잘린 문자열
 *
 * @example
 * truncate('Hello World', 8) // 'Hello...'
 * truncate('Short', 10) // 'Short'
 * truncate('Long text here', 10, '…') // 'Long text…'
 */
export function truncate(
  text: string,
  maxLength: number,
  ellipsis: string = '...'
): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  const truncatedLength = maxLength - ellipsis.length;
  return text.slice(0, truncatedLength) + ellipsis;
}

/**
 * 문자열의 첫 글자를 대문자로 변환합니다.
 *
 * @param text - 변환할 문자열
 * @returns 첫 글자가 대문자인 문자열
 *
 * @example
 * capitalize('hello') // 'Hello'
 * capitalize('hELLO') // 'HELLO'
 * capitalize('') // ''
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * 각 단어의 첫 글자를 대문자로 변환합니다 (타이틀 케이스).
 *
 * @param text - 변환할 문자열
 * @returns 타이틀 케이스 문자열
 *
 * @example
 * titleCase('hello world') // 'Hello World'
 * titleCase('the quick brown fox') // 'The Quick Brown Fox'
 */
export function titleCase(text: string): string {
  if (!text) return '';

  return text
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * 문자열을 URL 안전한 슬러그로 변환합니다.
 *
 * @param text - 변환할 문자열
 * @returns 슬러그 문자열
 *
 * @example
 * slugify('Hello World!') // 'hello-world'
 * slugify('한글 테스트 123') // '한글-테스트-123'
 * slugify('  Multiple   Spaces  ') // 'multiple-spaces'
 */
export function slugify(text: string): string {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/[^\w\u3131-\uD79D-]+/g, '-') // 영문, 숫자, 한글 외 문자를 하이픈으로
    .replace(/--+/g, '-') // 연속된 하이픈을 하나로
    .replace(/^-+/, '') // 시작 하이픈 제거
    .replace(/-+$/, ''); // 끝 하이픈 제거
}

/**
 * camelCase 문자열을 kebab-case로 변환합니다.
 *
 * @param text - 변환할 camelCase 문자열
 * @returns kebab-case 문자열
 *
 * @example
 * camelToKebab('helloWorld') // 'hello-world'
 * camelToKebab('myVariableName') // 'my-variable-name'
 */
export function camelToKebab(text: string): string {
  if (!text) return '';

  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * kebab-case 문자열을 camelCase로 변환합니다.
 *
 * @param text - 변환할 kebab-case 문자열
 * @returns camelCase 문자열
 *
 * @example
 * kebabToCamel('hello-world') // 'helloWorld'
 * kebabToCamel('my-variable-name') // 'myVariableName'
 */
export function kebabToCamel(text: string): string {
  if (!text) return '';

  return text.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * snake_case 문자열을 camelCase로 변환합니다.
 *
 * @param text - 변환할 snake_case 문자열
 * @returns camelCase 문자열
 *
 * @example
 * snakeToCamel('hello_world') // 'helloWorld'
 * snakeToCamel('my_variable_name') // 'myVariableName'
 */
export function snakeToCamel(text: string): string {
  if (!text) return '';

  return text.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 문자열에서 HTML 태그를 제거합니다.
 *
 * @param html - HTML 문자열
 * @returns 태그가 제거된 순수 텍스트
 *
 * @example
 * stripHtml('<p>Hello <strong>World</strong></p>') // 'Hello World'
 * stripHtml('<div>Test</div>') // 'Test'
 */
export function stripHtml(html: string): string {
  if (!html) return '';

  return html.replace(/<[^>]*>/g, '');
}

/**
 * 문자열에서 특정 문자를 이스케이프합니다.
 *
 * @param text - 이스케이프할 문자열
 * @returns 이스케이프된 문자열
 *
 * @example
 * escapeHtml('<div>Test & "quotes"</div>') // '&lt;div&gt;Test &amp; &quot;quotes&quot;&lt;/div&gt;'
 */
export function escapeHtml(text: string): string {
  if (!text) return '';

  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return text.replace(/[&<>"']/g, (char) => escapeMap[char]);
}

/**
 * 문자열을 반복합니다.
 *
 * @param text - 반복할 문자열
 * @param count - 반복 횟수
 * @returns 반복된 문자열
 *
 * @example
 * repeat('*', 5) // '*****'
 * repeat('ab', 3) // 'ababab'
 */
export function repeat(text: string, count: number): string {
  if (!text || count <= 0) return '';

  return text.repeat(count);
}

/**
 * 문자열 앞뒤 공백을 제거하고 내부 연속된 공백을 하나로 줄입니다.
 *
 * @param text - 정리할 문자열
 * @returns 정리된 문자열
 *
 * @example
 * normalizeWhitespace('  hello   world  ') // 'hello world'
 * normalizeWhitespace('multiple\n\n\nlines') // 'multiple lines'
 */
export function normalizeWhitespace(text: string): string {
  if (!text) return '';

  return text.trim().replace(/\s+/g, ' ');
}

/**
 * 문자열이 특정 접두사로 시작하는지 확인하고 없으면 추가합니다.
 *
 * @param text - 확인할 문자열
 * @param prefix - 접두사
 * @returns 접두사가 있는 문자열
 *
 * @example
 * ensurePrefix('example.com', 'https://') // 'https://example.com'
 * ensurePrefix('https://example.com', 'https://') // 'https://example.com'
 */
export function ensurePrefix(text: string, prefix: string): string {
  if (!text) return prefix;
  if (text.startsWith(prefix)) return text;

  return prefix + text;
}

/**
 * 문자열이 특정 접미사로 끝나는지 확인하고 없으면 추가합니다.
 *
 * @param text - 확인할 문자열
 * @param suffix - 접미사
 * @returns 접미사가 있는 문자열
 *
 * @example
 * ensureSuffix('test', '.txt') // 'test.txt'
 * ensureSuffix('test.txt', '.txt') // 'test.txt'
 */
export function ensureSuffix(text: string, suffix: string): string {
  if (!text) return suffix;
  if (text.endsWith(suffix)) return text;

  return text + suffix;
}

/**
 * 문자열에서 접두사를 제거합니다.
 *
 * @param text - 원본 문자열
 * @param prefix - 제거할 접두사
 * @returns 접두사가 제거된 문자열
 *
 * @example
 * removePrefix('https://example.com', 'https://') // 'example.com'
 * removePrefix('example.com', 'https://') // 'example.com'
 */
export function removePrefix(text: string, prefix: string): string {
  if (!text) return '';
  if (text.startsWith(prefix)) {
    return text.slice(prefix.length);
  }

  return text;
}

/**
 * 문자열에서 접미사를 제거합니다.
 *
 * @param text - 원본 문자열
 * @param suffix - 제거할 접미사
 * @returns 접미사가 제거된 문자열
 *
 * @example
 * removeSuffix('test.txt', '.txt') // 'test'
 * removeSuffix('test', '.txt') // 'test'
 */
export function removeSuffix(text: string, suffix: string): string {
  if (!text) return '';
  if (text.endsWith(suffix)) {
    return text.slice(0, -suffix.length);
  }

  return text;
}

/**
 * 문자열을 지정된 너비로 패딩합니다.
 *
 * @param text - 패딩할 문자열
 * @param width - 목표 너비
 * @param padChar - 패딩 문자 (기본값: ' ')
 * @param align - 정렬 방식 ('left' | 'right' | 'center')
 * @returns 패딩된 문자열
 *
 * @example
 * pad('hello', 10) // 'hello     '
 * pad('hello', 10, '*', 'center') // '**hello***'
 * pad('hello', 10, '0', 'right') // '00000hello'
 */
export function pad(
  text: string,
  width: number,
  padChar: string = ' ',
  align: 'left' | 'right' | 'center' = 'left'
): string {
  if (!text) text = '';
  if (text.length >= width) return text;

  const padLength = width - text.length;

  switch (align) {
    case 'right':
      return padChar.repeat(padLength) + text;
    case 'center': {
      const leftPad = Math.floor(padLength / 2);
      const rightPad = padLength - leftPad;
      return padChar.repeat(leftPad) + text + padChar.repeat(rightPad);
    }
    case 'left':
    default:
      return text + padChar.repeat(padLength);
  }
}

/**
 * 문자열을 단어 단위로 자릅니다 (단어를 중간에 자르지 않음).
 *
 * @param text - 자를 문자열
 * @param maxLength - 최대 길이
 * @param ellipsis - 말줄임표 문자 (기본값: '...')
 * @returns 잘린 문자열
 *
 * @example
 * truncateWords('Hello World Test', 12) // 'Hello World...'
 * truncateWords('Short', 10) // 'Short'
 */
export function truncateWords(
  text: string,
  maxLength: number,
  ellipsis: string = '...'
): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > 0) {
    return truncated.slice(0, lastSpaceIndex) + ellipsis;
  }

  return truncated + ellipsis;
}

/**
 * 문자열에서 악센트를 제거합니다 (é → e).
 *
 * @param text - 변환할 문자열
 * @returns 악센트가 제거된 문자열
 *
 * @example
 * removeAccents('café') // 'cafe'
 * removeAccents('naïve') // 'naive'
 */
export function removeAccents(text: string): string {
  if (!text) return '';

  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * 랜덤 문자열을 생성합니다.
 *
 * @param length - 문자열 길이
 * @param charset - 사용할 문자 세트 (기본값: 영문 대소문자 + 숫자)
 * @returns 랜덤 문자열
 *
 * @example
 * randomString(8) // 'aB3xYz9K'
 * randomString(6, '0123456789') // '472913'
 */
export function randomString(
  length: number,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * 문자열의 바이트 크기를 계산합니다 (UTF-8).
 *
 * @param text - 크기를 계산할 문자열
 * @returns 바이트 크기
 *
 * @example
 * getByteSize('hello') // 5
 * getByteSize('한글') // 6
 */
export function getByteSize(text: string): number {
  if (!text) return 0;

  return new Blob([text]).size;
}
