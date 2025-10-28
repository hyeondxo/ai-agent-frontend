# 다중 에이전트 관리 시스템 구현 플랜

**작성일**: 2025-10-29
**버전**: 1.0
**상태**: 승인됨

---

## 📋 개요

현재 AI Agent Lab은 단일 에이전트만 모니터링하는 고정된 대시보드 구조입니다. 이를 다중 에이전트 관리 시스템으로 전환하여, 여러 AI 에이전트를 생성/관리하고 개별 성능을 모니터링할 수 있도록 개선합니다.

### 현재 상태
- ❌ 하나의 에이전트만 모니터링
- ❌ 고정된 대시보드 뷰
- ❌ 에이전트 생성/관리 기능 없음

### 목표 상태
- ✅ 다중 에이전트 생성 및 관리
- ✅ 에이전트 목록 카드 뷰
- ✅ 개별 에이전트 대시보드
- ✅ 전체 에이전트 통합 분석
- ✅ 에이전트 비교 기능

---

## 🎯 Phase 1: 타입 시스템 및 데이터 모델 구축

### 1.1 새로운 타입 정의

**파일**: `src/types/agent.ts`

```typescript
/**
 * Agent status types
 */
export type AgentStatus = 'active' | 'inactive' | 'archived';

/**
 * Agent interface
 */
export interface Agent {
  /** Unique identifier */
  id: string;
  /** Agent name */
  name: string;
  /** Agent description */
  description?: string;
  /** Current status */
  status: AgentStatus;
  /** Creation timestamp */
  createdAt: string;
  /** Last updated timestamp */
  updatedAt: string;
  /** Agent configuration */
  config: AgentConfig;
  /** Performance metrics */
  metrics: AgentMetrics;
}

/**
 * Agent configuration
 */
export interface AgentConfig {
  /** Primary AI model */
  model: string;
  /** Temperature setting */
  temperature?: number;
  /** Max tokens */
  maxTokens?: number;
  /** System prompt */
  systemPrompt?: string;
  /** RAG settings */
  ragEnabled?: boolean;
}

/**
 * Agent performance metrics
 */
export interface AgentMetrics {
  /** Total requests */
  totalRequests: number;
  /** Average response time (seconds) */
  avgResponseTime: number;
  /** Quality score (0-100) */
  qualityScore: number;
  /** Total cost ($) */
  totalCost: number;
  /** Success rate (%) */
  successRate: number;
  /** User satisfaction (0-5) */
  userSatisfaction: number;
}

/**
 * Agent creation input
 */
export interface CreateAgentInput {
  name: string;
  description?: string;
  config?: Partial<AgentConfig>;
}
```

### 1.2 기존 타입 확장

**파일**: `src/types/dashboard.ts`

```typescript
// 모든 대시보드 메트릭에 agentId 추가
export interface PerformanceDataPoint {
  agentId?: string;  // ⭐ NEW
  time: string;
  quality: number;
  speed: number;
  cost: number;
}

// 통합 메트릭 타입 추가
export interface AggregatedMetrics {
  totalAgents: number;
  totalRequests: number;
  totalCost: number;
  avgQualityScore: number;
  avgResponseTime: number;
}
```

---

## 🎯 Phase 2: 상수 및 라우트 재구성

### 2.1 라우트 구조 변경

**파일**: `src/constants/routes.ts`

```typescript
export const ROUTES = {
  ROOT: '/',
  AGENTS: '/agents',                    // ⭐ NEW (메인 페이지)
  AGENT_DASHBOARD: '/agents/:agentId',  // ⭐ NEW (동적 라우트)
  AGENT_COMPARE: '/agents/compare',     // ⭐ NEW (비교 모드)
  ANALYTICS: '/analytics',              // ⭐ NEW (통합 분석)
  DASHBOARD: '/dashboard',              // ⚠️ DEPRECATED (하위 호환)
  DATA_INPUT: '/data-input',
  RAG_SETTINGS: '/rag-settings',
  PROMPT_STUDIO: '/prompt-studio',
  RESULTS: '/results',
  DEPLOYMENT: '/deployment',
} as const;
```

### 2.2 네비게이션 구조 업데이트

**파일**: `src/constants/navigation.ts`

```typescript
import { Boxes, TrendingUp, LayoutDashboard, /* ... */ } from 'lucide-react';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    path: ROUTES.AGENTS,
    label: '에이전트 목록',
    icon: Boxes,              // ⭐ NEW
  },
  {
    path: ROUTES.ANALYTICS,
    label: '통합 분석',
    icon: TrendingUp,         // ⭐ NEW
  },
  {
    path: ROUTES.DATA_INPUT,
    label: '데이터 입력',
    icon: Database,
  },
  // ... 기존 메뉴들
];
```

---

## 🎯 Phase 3: 에이전트 관리 페이지 구현

### 3.1 AgentListPage 생성

**파일**: `src/pages/AgentListPage.tsx`

**주요 기능**:
- 에이전트 카드 그리드 뷰 (3-4 컬럼)
- 빠른 생성 버튼 (+ 새 에이전트)
- 상태별 필터링 탭 (전체/활성/비활성/보관)
- 검색 기능
- 정렬 옵션 (이름, 생성일, 성능)

**레이아웃**:
```
┌─────────────────────────────────────────┐
│ 에이전트 관리                            │
│ [검색] [필터] [정렬]      [+ 새 에이전트] │
├─────────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │Card │ │Card │ │Card │ │Card │        │
│ └─────┘ └─────┘ └─────┘ └─────┘        │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │Card │ │Card │ │Card │ │ +   │        │
│ └─────┘ └─────┘ └─────┘ └─────┘        │
└─────────────────────────────────────────┘
```

### 3.2 에이전트 관리 Feature

**디렉토리 구조**: `src/features/agents/`

```
agents/
├── components/
│   ├── AgentCard.tsx              # 에이전트 카드 컴포넌트
│   ├── AgentCreateDialog.tsx      # 생성 모달
│   ├── AgentStatusBadge.tsx       # 상태 뱃지
│   ├── AgentActionMenu.tsx        # 액션 메뉴 (수정/삭제/복제)
│   ├── AgentQuickStats.tsx        # 카드 내 간단한 통계
│   └── index.ts                   # 배럴 export
├── hooks/
│   ├── useAgents.ts               # 에이전트 목록 관리
│   ├── useAgentCreate.ts          # 생성 로직
│   ├── useAgentDelete.ts          # 삭제 로직
│   └── useAgentUpdate.ts          # 수정 로직
└── types.ts                       # Feature 전용 타입
```

#### 3.2.1 AgentCard 컴포넌트

**Props**:
```typescript
interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
  onEdit?: (agent: Agent) => void;
  onDelete?: (agentId: string) => void;
  onDuplicate?: (agent: Agent) => void;
}
```

**주요 요소**:
- 에이전트 이름 및 설명
- 상태 뱃지
- 주요 메트릭 (요청 수, 비용, 품질 점수)
- 액션 메뉴 (⋮)
- 호버 효과 (확대 + 그림자)

#### 3.2.2 AgentCreateDialog 컴포넌트

**단계**:
1. **기본 정보**: 이름, 설명
2. **템플릿 선택** (선택적): 빈 에이전트 / 챗봇 / Q&A / RAG
3. **모델 선택**: GPT-4, Claude, Gemini 등
4. **확인 및 생성**

### 3.3 Mock 데이터

**파일**: `src/data/mockAgents.ts`

```typescript
export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: '고객 지원 봇',
    description: '24/7 고객 문의 자동 응답',
    status: 'active',
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-10-28T12:00:00Z',
    config: {
      model: 'gpt-4',
      temperature: 0.7,
      ragEnabled: true,
    },
    metrics: {
      totalRequests: 15420,
      avgResponseTime: 1.2,
      qualityScore: 94,
      totalCost: 680,
      successRate: 98.5,
      userSatisfaction: 4.7,
    },
  },
  {
    id: 'agent-2',
    name: '문서 요약 봇',
    description: '긴 문서를 간결하게 요약',
    status: 'active',
    createdAt: '2025-10-05T00:00:00Z',
    updatedAt: '2025-10-28T10:00:00Z',
    config: {
      model: 'claude-3',
      temperature: 0.5,
      ragEnabled: false,
    },
    metrics: {
      totalRequests: 8320,
      avgResponseTime: 2.1,
      qualityScore: 89,
      totalCost: 320,
      successRate: 96.2,
      userSatisfaction: 4.5,
    },
  },
  {
    id: 'agent-3',
    name: '코드 리뷰어',
    description: 'PR 자동 검토 및 피드백',
    status: 'inactive',
    createdAt: '2025-09-20T00:00:00Z',
    updatedAt: '2025-10-15T08:00:00Z',
    config: {
      model: 'gpt-4',
      temperature: 0.3,
      ragEnabled: false,
    },
    metrics: {
      totalRequests: 2150,
      avgResponseTime: 3.5,
      qualityScore: 92,
      totalCost: 150,
      successRate: 94.8,
      userSatisfaction: 4.6,
    },
  },
];
```

---

## 🎯 Phase 4: 개별 에이전트 대시보드

### 4.1 동적 라우팅 구현

**파일**: `src/routes/index.tsx`

```typescript
// 동적 라우트 추가
{
  path: ROUTES.AGENT_DASHBOARD.slice(1),  // 'agents/:agentId'
  element: (
    <SuspenseWrapper>
      <AgentDashboardPage />
    </SuspenseWrapper>
  ),
}
```

### 4.2 에이전트별 대시보드

**파일**: `src/pages/AgentDashboardPage.tsx` (기존 DashboardPage 리팩토링)

**변경 사항**:
```typescript
import { useParams, useNavigate } from 'react-router-dom';
import { useAgent } from '@/contexts/AgentContext';

export function AgentDashboardPage() {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const { getAgent } = useAgent();

  const agent = getAgent(agentId);

  if (!agent) {
    return <div>에이전트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-8 space-y-6">
      {/* 에이전트 정보 헤더 */}
      <div className="flex items-center gap-4">
        <Button onClick={() => navigate(ROUTES.AGENTS)}>
          ← 목록으로
        </Button>
        <div>
          <h1 className="text-3xl text-white">{agent.name}</h1>
          <p className="text-white/60">{agent.description}</p>
        </div>
        <AgentStatusBadge status={agent.status} />
      </div>

      {/* 기존 대시보드 내용 (agent.metrics 사용) */}
      {/* ... */}
    </div>
  );
}
```

### 4.3 Context API 추가

**파일**: `src/contexts/AgentContext.tsx`

```typescript
interface AgentContextValue {
  agents: Agent[];
  selectedAgent: Agent | null;
  getAgent: (id: string) => Agent | undefined;
  createAgent: (input: CreateAgentInput) => Promise<Agent>;
  updateAgent: (id: string, updates: Partial<Agent>) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  setSelectedAgent: (agent: Agent | null) => void;
}

export const AgentProvider = ({ children }: PropsWithChildren) => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // CRUD 구현
  // ...

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within AgentProvider');
  }
  return context;
};
```

---

## 🎯 Phase 5: 에이전트 비교 기능

### 5.1 비교 페이지

**파일**: `src/pages/AgentComparePage.tsx`

**주요 기능**:
- 최대 4개 에이전트 선택
- 멀티셀렉트 드롭다운
- 나란히 메트릭 비교 테이블
- 통합 성능 차트

**레이아웃**:
```
┌─────────────────────────────────────────┐
│ 에이전트 비교                            │
│ [Agent 1 ▼] [Agent 2 ▼] [Agent 3 ▼] [+] │
├─────────────────────────────────────────┤
│ 지표         │ Agent 1 │ Agent 2 │ Agent 3 │
│─────────────┼─────────┼─────────┼────────│
│ 품질 점수    │   94    │   89    │   92   │
│ 응답 시간    │  1.2s   │  2.1s   │  3.5s  │
│ 총 비용      │  $680   │  $320   │  $150  │
│ 총 요청 수   │ 15,420  │  8,320  │  2,150 │
├─────────────────────────────────────────┤
│ [성능 비교 차트]                         │
└─────────────────────────────────────────┘
```

### 5.2 비교 Feature

**디렉토리**: `src/features/agent-compare/`

```
agent-compare/
├── components/
│   ├── AgentSelector.tsx          # 멀티셀렉트
│   ├── ComparisonTable.tsx        # 비교 테이블
│   ├── ComparisonChart.tsx        # 비교 차트
│   └── index.ts
├── hooks/
│   └── useAgentComparison.ts
└── types.ts
```

---

## 🎯 Phase 6: 통합 분석 페이지

### 6.1 통합 대시보드

**파일**: `src/pages/IntegratedAnalyticsPage.tsx`

**주요 지표**:
- 전체 에이전트 수
- 총 요청 수 (모든 에이전트 합계)
- 총 비용
- 평균 품질 점수
- 평균 응답 시간

**차트**:
- 에이전트별 요청 분포 (파이 차트)
- 에이전트별 비용 기여도 (막대 차트)
- 시간별 총 트래픽 (라인 차트)

### 6.2 통합 분석 Feature

**디렉토리**: `src/features/analytics/`

```
analytics/
├── components/
│   ├── TotalCostCard.tsx
│   ├── AggregatedMetrics.tsx
│   ├── AgentContributionChart.tsx
│   ├── TrafficTrendChart.tsx
│   └── index.ts
├── hooks/
│   └── useAggregatedData.ts
└── types.ts
```

---

## 🎯 Phase 7: UI/UX 개선

### 7.1 에이전트 카드 디자인

**스타일 가이드**:
```typescript
// Glassmorphism 스타일
className="
  bg-black/30
  backdrop-blur-xl
  border border-white/10
  rounded-xl
  p-6
  hover:scale-105
  hover:shadow-2xl
  hover:border-purple-500/30
  transition-all
  duration-300
"

// 상태별 색상
const statusColors = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  archived: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};
```

### 7.2 빠른 생성 플로우

**단계별 다이얼로그**:
1. **이름 입력** (필수)
2. **템플릿 선택** (선택적)
   - 빈 에이전트
   - 챗봇 템플릿
   - Q&A 템플릿
   - RAG 템플릿
3. **모델 선택** (기본: GPT-4)
4. **확인**

**빠른 생성 옵션**:
- "빈 에이전트로 시작" 버튼 → 즉시 생성 (기본값 사용)

### 7.3 드래그 앤 드롭 (선택적)

**라이브러리**: `@dnd-kit/core`

**기능**:
- 에이전트 카드 순서 변경
- LocalStorage에 순서 저장

---

## 🎯 Phase 8: 데이터 영속성 준비

### 8.1 LocalStorage 통합

**파일**: `src/utils/storage.ts`

```typescript
const STORAGE_KEYS = {
  AGENTS: 'ai-agent-lab:agents',
  AGENT_ORDER: 'ai-agent-lab:agent-order',
} as const;

export const saveAgents = (agents: Agent[]) => {
  localStorage.setItem(STORAGE_KEYS.AGENTS, JSON.stringify(agents));
};

export const loadAgents = (): Agent[] => {
  const data = localStorage.getItem(STORAGE_KEYS.AGENTS);
  return data ? JSON.parse(data) : mockAgents;
};

export const saveAgentOrder = (order: string[]) => {
  localStorage.setItem(STORAGE_KEYS.AGENT_ORDER, JSON.stringify(order));
};

export const loadAgentOrder = (): string[] => {
  const data = localStorage.getItem(STORAGE_KEYS.AGENT_ORDER);
  return data ? JSON.parse(data) : [];
};
```

### 8.2 향후 API 연동 준비

**파일**: `src/api/agents.ts`

```typescript
// 향후 백엔드 연동을 위한 스켈레톤
export const agentsApi = {
  getAll: async (): Promise<Agent[]> => {
    // TODO: Replace with actual API call
    return loadAgents();
  },

  getById: async (id: string): Promise<Agent> => {
    // TODO: Replace with actual API call
    const agents = loadAgents();
    const agent = agents.find((a) => a.id === id);
    if (!agent) throw new Error('Agent not found');
    return agent;
  },

  create: async (input: CreateAgentInput): Promise<Agent> => {
    // TODO: Replace with actual API call
    const newAgent: Agent = {
      id: crypto.randomUUID(),
      name: input.name,
      description: input.description,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      config: {
        model: 'gpt-4',
        ...input.config,
      },
      metrics: {
        totalRequests: 0,
        avgResponseTime: 0,
        qualityScore: 0,
        totalCost: 0,
        successRate: 0,
        userSatisfaction: 0,
      },
    };

    const agents = loadAgents();
    agents.push(newAgent);
    saveAgents(agents);

    return newAgent;
  },

  update: async (id: string, updates: Partial<Agent>): Promise<Agent> => {
    // TODO: Replace with actual API call
    const agents = loadAgents();
    const index = agents.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Agent not found');

    agents[index] = {
      ...agents[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    saveAgents(agents);
    return agents[index];
  },

  delete: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    const agents = loadAgents();
    const filtered = agents.filter((a) => a.id !== id);
    saveAgents(filtered);
  },
};
```

---

## 📁 새로운 파일 구조

```
src/
├── pages/
│   ├── AgentListPage.tsx           ⭐ NEW (메인 페이지)
│   ├── AgentDashboardPage.tsx      ⭐ RENAMED (기존 DashboardPage)
│   ├── AgentComparePage.tsx        ⭐ NEW
│   ├── IntegratedAnalyticsPage.tsx ⭐ NEW
│   ├── DataInputPage.tsx
│   ├── RagSettingsPage.tsx
│   ├── PromptStudioPage.tsx
│   ├── ResultsValidationPage.tsx
│   └── DeploymentPage.tsx
│
├── features/
│   ├── agents/                     ⭐ NEW
│   │   ├── components/
│   │   │   ├── AgentCard.tsx
│   │   │   ├── AgentCreateDialog.tsx
│   │   │   ├── AgentStatusBadge.tsx
│   │   │   ├── AgentActionMenu.tsx
│   │   │   ├── AgentQuickStats.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useAgents.ts
│   │   │   ├── useAgentCreate.ts
│   │   │   ├── useAgentDelete.ts
│   │   │   └── useAgentUpdate.ts
│   │   └── types.ts
│   │
│   ├── agent-compare/              ⭐ NEW
│   │   ├── components/
│   │   │   ├── AgentSelector.tsx
│   │   │   ├── ComparisonTable.tsx
│   │   │   ├── ComparisonChart.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   └── useAgentComparison.ts
│   │   └── types.ts
│   │
│   ├── analytics/                  ⭐ NEW
│   │   ├── components/
│   │   │   ├── TotalCostCard.tsx
│   │   │   ├── AggregatedMetrics.tsx
│   │   │   ├── AgentContributionChart.tsx
│   │   │   ├── TrafficTrendChart.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   └── useAggregatedData.ts
│   │   └── types.ts
│   │
│   ├── dashboard/
│   ├── data-input/
│   ├── prompt-studio/
│   ├── results/
│   └── deployment/
│
├── contexts/
│   ├── UserModeContext.tsx
│   └── AgentContext.tsx            ⭐ NEW
│
├── types/
│   ├── agent.ts                    ⭐ NEW
│   ├── common.ts
│   ├── dashboard.ts                ⭐ UPDATED
│   ├── prompt.ts
│   ├── data-input.ts
│   ├── results.ts
│   ├── deployment.ts
│   └── index.ts
│
├── data/
│   ├── mockAgents.ts               ⭐ NEW
│   ├── mockDashboard.ts
│   ├── mockPrompts.ts
│   ├── mockDataInput.ts
│   ├── mockResults.ts
│   └── mockDeployment.ts
│
├── api/
│   └── agents.ts                   ⭐ NEW
│
├── constants/
│   ├── routes.ts                   ⭐ UPDATED
│   ├── navigation.ts               ⭐ UPDATED
│   ├── models.ts
│   ├── chart.ts
│   ├── theme.ts
│   └── index.ts
│
└── utils/
    ├── storage.ts                  ⭐ NEW
    ├── format.ts
    ├── chart.ts
    ├── validation.ts
    ├── string.ts
    └── index.ts
```

---

## 🔄 구현 순서

### Phase 1-2: 기반 구축 (2-3일)
- [ ] 타입 정의 (`agent.ts`)
- [ ] 라우트 상수 업데이트 (`routes.ts`, `navigation.ts`)
- [ ] Mock 데이터 생성 (`mockAgents.ts`)
- [ ] Context API 구현 (`AgentContext.tsx`)
- [ ] Storage 유틸리티 (`storage.ts`)

### Phase 3: 에이전트 목록 (3-4일)
- [ ] `AgentListPage.tsx` 생성
- [ ] `AgentCard` 컴포넌트
- [ ] `AgentCreateDialog` 컴포넌트
- [ ] `AgentStatusBadge` 컴포넌트
- [ ] `AgentActionMenu` 컴포넌트
- [ ] CRUD 훅 구현
- [ ] 라우팅 연결

### Phase 4: 개별 대시보드 (2-3일)
- [ ] `DashboardPage` → `AgentDashboardPage` 리팩토링
- [ ] 동적 라우팅 구현
- [ ] 에이전트별 데이터 필터링
- [ ] 네비게이션 버튼 추가

### Phase 6: 통합 분석 (2-3일)
- [ ] `IntegratedAnalyticsPage.tsx` 생성
- [ ] 통합 메트릭 계산 로직
- [ ] 통합 차트 컴포넌트
- [ ] 에이전트 기여도 차트

### Phase 5: 비교 기능 (2-3일)
- [ ] `AgentComparePage.tsx` 생성
- [ ] `AgentSelector` (멀티셀렉트)
- [ ] `ComparisonTable` 컴포넌트
- [ ] `ComparisonChart` 컴포넌트

### Phase 7: UI/UX 폴리싱 (1-2일)
- [ ] 카드 호버 애니메이션
- [ ] 상태별 색상 코딩
- [ ] 로딩 상태 처리
- [ ] 에러 바운더리

### Phase 8: 데이터 영속성 (1일)
- [ ] LocalStorage 통합
- [ ] API 스켈레톤 생성
- [ ] 데이터 마이그레이션 (기존 데이터 → 다중 에이전트)

---

## ✅ 완료 조건 (Definition of Done)

### 기능 요구사항
- [x] 에이전트 생성/수정/삭제 가능
- [x] 에이전트 목록을 카드 형태로 표시
- [x] 각 에이전트 클릭 시 개별 대시보드 표시
- [x] 전체 에이전트 통합 분석 페이지
- [x] 여러 에이전트 비교 기능
- [x] 상태별 필터링 (활성/비활성/보관)
- [x] LocalStorage로 데이터 유지

### 품질 요구사항
- [x] TypeScript 타입 안전성 (no `any`)
- [x] 반응형 디자인 (모바일, 태블릿, 데스크탑)
- [x] 접근성 준수 (키보드 네비게이션)
- [x] 로딩 상태 및 에러 처리
- [x] 기존 기능 모두 정상 동작 (회귀 테스트)

### 성능 요구사항
- [x] Code Splitting (페이지별 lazy loading)
- [x] 메모이제이션 (useMemo, useCallback)
- [x] 차트 렌더링 최적화

---

## 🚧 알려진 제약사항 및 고려사항

### 1. 백엔드 미연동
- 현재는 LocalStorage + Mock 데이터 사용
- 향후 백엔드 API 연동 시 `src/api/agents.ts` 수정 필요
- API 스키마 변경 시 타입 정의 업데이트 필요

### 2. 실시간 데이터
- 현재 Mock 데이터는 정적임
- 실시간 메트릭 업데이트를 위해 WebSocket/Server-Sent Events 필요

### 3. 성능 최적화
- 에이전트가 100개 이상일 경우 가상 스크롤링 필요
- 차트 데이터가 많을 경우 다운샘플링 고려

### 4. 권한 관리
- 현재 모든 사용자가 모든 에이전트에 접근 가능
- 향후 사용자별 권한 관리 필요

---

## 📊 예상 일정

| Phase | 작업 내용 | 예상 시간 |
|-------|----------|----------|
| Phase 1-2 | 기반 구축 | 2-3일 |
| Phase 3 | 에이전트 목록 | 3-4일 |
| Phase 4 | 개별 대시보드 | 2-3일 |
| Phase 6 | 통합 분석 | 2-3일 |
| Phase 5 | 비교 기능 | 2-3일 |
| Phase 7 | UI/UX 폴리싱 | 1-2일 |
| Phase 8 | 데이터 영속성 | 1일 |
| **총계** | | **13-19일** |

---

## 🔗 관련 문서

- `CLAUDE.md` - 프로젝트 아키텍처 가이드
- `plans/refactoring-plan.md` - 전체 리팩토링 계획
- `plans/phase-*-summary.md` - 이전 Phase 완료 보고서

---

## 📝 변경 이력

| 날짜 | 버전 | 변경 내용 |
|------|------|----------|
| 2025-10-29 | 1.0 | 초안 작성 및 승인 |

---

**작성자**: Claude
**검토자**: 사용자
**승인일**: 2025-10-29
