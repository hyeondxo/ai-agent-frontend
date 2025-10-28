/**
 * Deployment Feature Types
 */

export interface DeploymentMetrics {
  uptime: string;
  avgResponseTime: string;
  totalRequests: string;
}

export interface DeploymentStatusCardProps {
  metrics: DeploymentMetrics;
  onViewDashboard?: () => void;
}

export interface DeploymentTabsProps {
  apiKey: string;
  apiEndpoint: string;
  embedCode: string;
  curlExample: string;
  apiKeyCopied: boolean;
  embedCodeCopied: boolean;
  onCopy: (text: string, type: 'api' | 'embed') => void;
}

export interface UsageStats {
  activeUsers: string;
  todayRequests: string;
  avgResponseTime: string;
  successRate: string;
}

export interface UsageStatisticsProps {
  stats: UsageStats;
}
