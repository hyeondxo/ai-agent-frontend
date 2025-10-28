import {
  mockPerformanceData,
  mockModelComparison,
  mockCostBreakdown,
  mockRadarData,
  mockKeyMetrics,
} from '@/data/mockDashboard';

/**
 * Custom hook for dashboard data
 *
 * Returns all dashboard-related data including performance metrics,
 * model comparisons, cost breakdowns, and radar chart data.
 *
 * @returns Dashboard data object with all metrics
 */
export function useDashboardData() {
  // In the future, this will fetch from API
  // For now, return mock data
  return {
    performanceData: mockPerformanceData,
    modelComparisonData: mockModelComparison,
    costBreakdownData: mockCostBreakdown,
    radarData: mockRadarData,
    keyMetrics: mockKeyMetrics,
  };
}
