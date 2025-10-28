import type {
  DeploymentConfig,
  ApiConfig,
  IntegrationPlatform,
  CodeExample,
  DeploymentMetrics,
} from '@/types/deployment';

/**
 * Mock deployment configuration
 */
export const mockDeploymentConfig: DeploymentConfig = {
  status: 'deployed',
  uptime: 99.9,
  avgResponseTime: 1.8,
  totalRequests: 12543,
};

/**
 * Mock API configuration
 */
export const mockApiConfig: ApiConfig = {
  apiKey: 'sk_live_abc123xyz789...',
  apiEndpoint: 'https://api.aiagentlab.com/v1/chat',
};

/**
 * Mock integration platforms
 */
export const mockIntegrationPlatforms: IntegrationPlatform[] = [
  { id: 'api', name: 'REST API', icon: 'Code' },
  { id: 'widget', name: '웹 위젯', icon: 'Globe' },
  { id: 'sdk', name: '모바일 SDK', icon: 'Smartphone' },
];

/**
 * Mock code examples for different platforms
 */
export const mockCodeExamples: CodeExample[] = [
  {
    platform: 'curl',
    title: 'cURL 예제',
    code: `curl -X POST https://api.aiagentlab.com/v1/chat \\
  -H "Authorization: Bearer sk_live_abc123xyz789..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "안녕하세요, 도움이 필요합니다",
    "conversation_id": "optional-id"
  }'`,
  },
  {
    platform: 'embed',
    title: '웹 위젯 임베드 코드',
    code: `<script src="https://cdn.aiagentlab.com/widget.js"></script>
<script>
  AIAgentLab.init({
    apiKey: 'sk_live_abc123xyz789...',
    theme: 'dark',
    position: 'bottom-right'
  });
</script>`,
  },
  {
    platform: 'ios',
    title: 'iOS CocoaPods',
    code: `pod 'AIAgentLab', '~> 1.0.0'`,
  },
  {
    platform: 'ios-swift',
    title: 'Swift 예제',
    code: `import AIAgentLab

let config = AIAgentLab.Configuration(
  apiKey: "sk_live_abc123xyz789..."
)

AIAgentLab.initialize(with: config)`,
  },
  {
    platform: 'android',
    title: 'Android Gradle',
    code: `implementation 'com.aiagentlab:sdk:1.0.0'`,
  },
  {
    platform: 'android-kotlin',
    title: 'Kotlin 예제',
    code: `import com.aiagentlab.SDK

AIAgentLab.initialize(
  context = this,
  apiKey = "sk_live_abc123xyz789..."
)`,
  },
];

/**
 * Mock deployment metrics (real-time)
 */
export const mockDeploymentMetrics: DeploymentMetrics = {
  activeUsers: 324,
  todayRequests: 1847,
  avgResponseTime: 1.8,
  successRate: 99.2,
};

/**
 * Mock widget configuration options
 */
export const mockWidgetConfig = {
  theme: 'dark' as const,
  position: 'bottom-right' as const,
  primaryColor: '#8b5cf6',
  welcomeMessage: '안녕하세요!',
};

/**
 * Mock API documentation links
 */
export const mockApiDocs = [
  { title: '인증 및 보안', url: '/docs/auth' },
  { title: '요청/응답 형식', url: '/docs/api-reference' },
  { title: '에러 처리', url: '/docs/errors' },
  { title: 'Rate Limits', url: '/docs/rate-limits' },
];
