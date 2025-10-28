/**
 * 차트 관련 유틸리티 함수 모음
 *
 * Recharts 컴포넌트에서 사용하는 색상 생성, 툴팁 포맷, 데이터 처리 등의 기능을 제공합니다.
 */

import { formatCurrency, formatPercentage, formatNumber } from './format';

/**
 * 차트용 색상 배열을 생성합니다.
 *
 * @param count - 필요한 색상 개수
 * @param baseHue - 기본 색조 (0-360, 기본값: 280 - 보라색)
 * @returns 색상 문자열 배열
 *
 * @example
 * generateChartColors(3) // ['#a855f7', '#ec4899', '#f59e0b']
 * generateChartColors(5, 200) // 청록색 계열 5개
 */
export function generateChartColors(count: number, baseHue: number = 280): string[] {
  const colors: string[] = [];
  const saturation = 70;
  const lightness = 60;

  for (let i = 0; i < count; i++) {
    // 색조를 균등하게 분산
    const hue = (baseHue + (i * 360) / count) % 360;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}

/**
 * 미리 정의된 차트 색상 팔레트
 */
export const CHART_COLOR_PALETTES = {
  /** 기본 보라색 계열 팔레트 */
  default: ['#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'],

  /** 파스텔 톤 팔레트 */
  pastel: ['#c084fc', '#f9a8d4', '#fdba74', '#6ee7b7', '#93c5fd'],

  /** 어두운 톤 팔레트 */
  dark: ['#7c3aed', '#db2777', '#d97706', '#059669', '#2563eb'],

  /** 그라디언트 블루 계열 */
  blue: ['#3b82f6', '#06b6d4', '#10b981', '#14b8a6', '#0ea5e9'],

  /** 웜 톤 팔레트 */
  warm: ['#f59e0b', '#ef4444', '#ec4899', '#a855f7', '#f97316'],

  /** 쿨 톤 팔레트 */
  cool: ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#6366f1'],
} as const;

/**
 * 차트 툴팁 포맷터 타입
 */
export type TooltipFormatter = (value: number, name: string) => string;

/**
 * 차트 툴팁 값을 포맷합니다.
 *
 * @param value - 포맷할 값
 * @param name - 데이터 키 이름
 * @param type - 포맷 타입
 * @returns 포맷된 문자열
 *
 * @example
 * formatChartTooltip(85.5, 'quality', 'percentage') // '85.5%'
 * formatChartTooltip(1234.56, 'cost', 'currency') // '$1,234.56'
 * formatChartTooltip(42, 'score', 'number') // '42'
 */
export function formatChartTooltip(
  value: number,
  _name: string,
  type: 'percentage' | 'currency' | 'number' | 'duration' = 'number'
): string {
  switch (type) {
    case 'percentage':
      return formatPercentage(value);
    case 'currency':
      return formatCurrency(value);
    case 'duration':
      return `${value}ms`;
    case 'number':
    default:
      return formatNumber(value, 0);
  }
}

/**
 * 차트 데이터를 정규화합니다 (0-100 범위로 변환).
 *
 * @param data - 원본 데이터 배열
 * @param key - 정규화할 속성 키
 * @returns 정규화된 데이터 배열
 *
 * @example
 * const data = [{ score: 50 }, { score: 100 }, { score: 75 }];
 * normalizeChartData(data, 'score')
 * // [{ score: 0 }, { score: 100 }, { score: 50 }]
 */
export function normalizeChartData<T extends Record<string, any>>(
  data: T[],
  key: keyof T
): T[] {
  if (data.length === 0) return data;

  const values = data.map((item) => item[key] as number);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  if (range === 0) return data;

  return data.map((item) => ({
    ...item,
    [key]: ((item[key] as number - min) / range) * 100,
  }));
}

/**
 * 차트 데이터를 시간 범위별로 필터링합니다.
 *
 * @param data - 원본 데이터 배열
 * @param timeKey - 시간 속성 키
 * @param range - 시간 범위 ('1h' | '24h' | '7d' | '30d')
 * @returns 필터링된 데이터 배열
 *
 * @example
 * const data = [
 *   { time: new Date('2025-10-28T10:00:00'), value: 100 },
 *   { time: new Date('2025-10-27T10:00:00'), value: 90 },
 * ];
 * filterChartDataByTimeRange(data, 'time', '24h')
 * // 최근 24시간 데이터만 반환
 */
export function filterChartDataByTimeRange<T extends Record<string, any>>(
  data: T[],
  timeKey: keyof T,
  range: '1h' | '24h' | '7d' | '30d'
): T[] {
  const now = Date.now();
  const rangeMs: Record<string, number> = {
    '1h': 60 * 60 * 1000,
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000,
  };

  const cutoff = now - rangeMs[range];

  return data.filter((item) => {
    const time = item[timeKey];
    const timestamp = typeof time === 'object' && time !== null && 'getTime' in time
      ? (time as Date).getTime()
      : new Date(time as string | number).getTime();
    return timestamp >= cutoff;
  });
}

/**
 * 차트 데이터를 집계합니다 (평균, 합계, 최대, 최소).
 *
 * @param data - 원본 데이터 배열
 * @param key - 집계할 속성 키
 * @param operation - 집계 연산
 * @returns 집계 결과
 *
 * @example
 * const data = [{ score: 80 }, { score: 90 }, { score: 85 }];
 * aggregateChartData(data, 'score', 'average') // 85
 * aggregateChartData(data, 'score', 'max') // 90
 */
export function aggregateChartData<T extends Record<string, any>>(
  data: T[],
  key: keyof T,
  operation: 'average' | 'sum' | 'max' | 'min'
): number {
  if (data.length === 0) return 0;

  const values = data.map((item) => item[key] as number);

  switch (operation) {
    case 'average':
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    case 'sum':
      return values.reduce((sum, val) => sum + val, 0);
    case 'max':
      return Math.max(...values);
    case 'min':
      return Math.min(...values);
    default:
      return 0;
  }
}

/**
 * 차트 데이터를 그룹화합니다.
 *
 * @param data - 원본 데이터 배열
 * @param groupKey - 그룹화 키
 * @returns 그룹화된 데이터 객체
 *
 * @example
 * const data = [
 *   { category: 'A', value: 10 },
 *   { category: 'A', value: 20 },
 *   { category: 'B', value: 30 },
 * ];
 * groupChartData(data, 'category')
 * // { A: [{ category: 'A', value: 10 }, { category: 'A', value: 20 }], B: [...] }
 */
export function groupChartData<T extends Record<string, any>>(
  data: T[],
  groupKey: keyof T
): Record<string, T[]> {
  return data.reduce((groups, item) => {
    const key = String(item[groupKey]);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * 차트 Y축 도메인(범위)을 계산합니다.
 *
 * @param data - 원본 데이터 배열
 * @param key - 값 속성 키
 * @param padding - 패딩 비율 (기본값: 0.1 = 10%)
 * @returns [최소값, 최대값] 튜플
 *
 * @example
 * const data = [{ score: 80 }, { score: 95 }];
 * calculateChartDomain(data, 'score', 0.1) // [78, 97]
 */
export function calculateChartDomain<T extends Record<string, any>>(
  data: T[],
  key: keyof T,
  padding: number = 0.1
): [number, number] {
  if (data.length === 0) return [0, 100];

  const values = data.map((item) => item[key] as number);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  return [
    Math.floor(min - range * padding),
    Math.ceil(max + range * padding),
  ];
}

/**
 * 차트 틱(눈금) 값을 생성합니다.
 *
 * @param min - 최소값
 * @param max - 최대값
 * @param count - 틱 개수 (기본값: 5)
 * @returns 틱 값 배열
 *
 * @example
 * generateChartTicks(0, 100, 5) // [0, 25, 50, 75, 100]
 * generateChartTicks(20, 80, 4) // [20, 40, 60, 80]
 */
export function generateChartTicks(
  min: number,
  max: number,
  count: number = 5
): number[] {
  const ticks: number[] = [];
  const step = (max - min) / (count - 1);

  for (let i = 0; i < count; i++) {
    ticks.push(min + step * i);
  }

  return ticks;
}

/**
 * 데이터 포인트를 스무딩합니다 (이동 평균).
 *
 * @param data - 원본 데이터 배열
 * @param key - 값 속성 키
 * @param windowSize - 윈도우 크기 (기본값: 3)
 * @returns 스무딩된 데이터 배열
 *
 * @example
 * const data = [{ value: 10 }, { value: 20 }, { value: 15 }];
 * smoothChartData(data, 'value', 2)
 * // [{ value: 15 }, { value: 17.5 }, ...]
 */
export function smoothChartData<T extends Record<string, any>>(
  data: T[],
  key: keyof T,
  windowSize: number = 3
): T[] {
  if (data.length < windowSize) return data;

  return data.map((item, index) => {
    const start = Math.max(0, index - Math.floor(windowSize / 2));
    const end = Math.min(data.length, start + windowSize);
    const window = data.slice(start, end);

    const sum = window.reduce((acc, curr) => acc + (curr[key] as number), 0);
    const average = sum / window.length;

    return {
      ...item,
      [key]: average,
    };
  });
}

/**
 * Recharts CustomTooltip props 타입
 */
export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}

/**
 * 차트 툴팁 스타일 기본값
 */
export const DEFAULT_TOOLTIP_STYLE = {
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '12px',
  backdropFilter: 'blur(10px)',
} as const;

/**
 * 차트 그리드 스타일 기본값
 */
export const DEFAULT_GRID_STYLE = {
  strokeDasharray: '3 3',
  stroke: 'rgba(255, 255, 255, 0.1)',
} as const;

/**
 * 차트 축 스타일 기본값
 */
export const DEFAULT_AXIS_STYLE = {
  stroke: 'rgba(255, 255, 255, 0.5)',
  fontSize: 12,
  fill: 'rgba(255, 255, 255, 0.6)',
} as const;
