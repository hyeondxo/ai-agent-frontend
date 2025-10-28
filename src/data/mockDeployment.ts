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
 * Mock code examples for different platforms (object format for easy access)
 */
export const mockCodeExamples = {
  curl: `curl -X POST https://api.aiagentlab.com/v1/chat \\
  -H "Authorization: Bearer sk_live_abc123xyz789..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "안녕하세요, 도움이 필요합니다",
    "conversation_id": "conv_1234567890",
    "stream": false
  }'`,

  webWidget: `<!-- AI Agent Lab 웹 위젯 -->
<script src="https://cdn.aiagentlab.com/widget.js"></script>
<script>
  AIAgentLab.init({
    apiKey: 'sk_live_abc123xyz789...',
    agentId: 'agent_prod_ai_assistant_v2',
    theme: 'dark',
    position: 'bottom-right',
    primaryColor: '#8b5cf6',
    welcomeMessage: '안녕하세요! 무엇을 도와드릴까요?',
    placeholder: '메시지를 입력하세요...',
    language: 'ko',

    // 고급 설정
    allowFileUpload: true,
    maxFileSize: 10485760, // 10MB
    showTimestamp: true,
    enableNotifications: true,

    // 커스텀 스타일
    style: {
      width: '400px',
      height: '600px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
    },

    // 이벤트 핸들러
    onOpen: function() {
      console.log('위젯이 열렸습니다');
    },
    onClose: function() {
      console.log('위젯이 닫혔습니다');
    },
    onMessage: function(message) {
      console.log('새 메시지:', message);
    }
  });
</script>`,

  pythonSDK: `# AI Agent Lab Python SDK 설치
# pip install aiagentlab

from aiagentlab import AIAgentLab, AgentConfig

# SDK 초기화
client = AIAgentLab(
    api_key="sk_live_abc123xyz789...",
    base_url="https://api.aiagentlab.com/v1"
)

# 에이전트 설정
config = AgentConfig(
    agent_id="agent_prod_ai_assistant_v2",
    temperature=0.7,
    max_tokens=2048,
    stream=False,
    language="ko"
)

# 대화 시작
response = client.chat.create(
    config=config,
    messages=[
        {"role": "system", "content": "당신은 도움이 되는 AI 어시스턴트입니다."},
        {"role": "user", "content": "안녕하세요, 도움이 필요합니다."}
    ],
    conversation_id="conv_1234567890"  # 선택사항
)

print(response.message)
print(f"토큰 사용량: {response.usage.total_tokens}")

# 스트리밍 모드
for chunk in client.chat.stream(
    config=config,
    messages=[{"role": "user", "content": "긴 답변을 생성해주세요"}]
):
    print(chunk.delta, end="", flush=True)

# 파일 업로드 및 분석
with open("document.pdf", "rb") as file:
    response = client.chat.create(
        config=config,
        messages=[
            {"role": "user", "content": "이 문서를 요약해주세요"}
        ],
        files=[file]
    )

# 대화 기록 조회
history = client.conversations.get("conv_1234567890")
print(f"총 메시지 수: {len(history.messages)}")

# 에이전트 배포 및 모니터링
deployment = client.deployments.create(
    agent_id="agent_prod_ai_assistant_v2",
    environment="production",
    config={
        "auto_scaling": True,
        "max_concurrent_requests": 100,
        "rate_limit": "1000/hour"
    }
)

print(f"배포 ID: {deployment.id}")
print(f"상태: {deployment.status}")`,
};

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
