# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
모든 사고 과정과 답변에 대한 출력은 한국어로 수행한다.

## 프로젝트 개요

**AI Agent Lab Design**은 Figma 디자인에서 변환된 AI 에이전트 실험실 프로토타이핑 도구입니다. React + TypeScript + Vite 기반의 엔터프라이즈급 프론트엔드 애플리케이션으로, AI 모델 성능 모니터링, 프롬프트 엔지니어링, 데이터 입력, 결과 검증, 배포 관리를 위한 대시보드를 제공합니다.

원본 Figma 디자인: https://www.figma.com/design/x4m44S5GS4zpP4Ixp6oFhP/AI-Agent-Lab-Design

## 핵심 명령어

### 개발 환경
```bash
# 의존성 설치
npm i

# 개발 서버 실행 (포트 3000, 자동으로 브라우저 열림)
npm run dev

# 프로덕션 빌드
npm run build
```

### 빌드 설정
- **출력 디렉토리**: `build/` (표준 `dist/`가 아님)
- **타겟**: ESNext
- **개발 서버**: `http://localhost:3000`

---

## 아키텍처 구조

### 1. React Router 기반 라우팅 ⭐️ NEW

이 프로젝트는 **React Router v7**을 사용합니다:

- `RootLayout`이 Sidebar와 페이지 outlet 제공
- URL 기반 페이지 네비게이션
- 브라우저 히스토리 관리
- 5개 주요 페이지: Dashboard, DataInput, PromptStudio, ResultsValidation, Deployment

```typescript
// 라우팅 설정 (routes/index.tsx)
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/data-input', element: <DataInputPage /> },
      { path: '/prompt-studio', element: <PromptStudioPage /> },
      { path: '/results', element: <ResultsValidationPage /> },
      { path: '/deployment', element: <DeploymentPage /> },
    ],
  },
]);

// 새 페이지 추가 시
// 1. src/pages/에 페이지 컴포넌트 생성
// 2. routes/index.tsx에 라우트 추가
// 3. constants/navigation.ts에 메뉴 항목 추가
```

### 2. Context API 전역 상태 관리 ⭐️ NEW

**Props drilling이 완전히 제거**되었습니다:

```typescript
// contexts/UserModeContext.tsx
import { useUserMode } from '@/contexts/UserModeContext';

function AnyComponent() {
  const { userMode, setUserMode } = useUserMode();

  // userMode: 'beginner' | 'expert'
  const isExpertMode = userMode === 'expert';

  return (
    <div>
      {isExpertMode && <AdvancedFeature />}
    </div>
  );
}
```

**중요**: 페이지 컴포넌트는 더 이상 `userMode` prop을 받지 않습니다. 대신 `useUserMode()` 훅을 사용하세요.

### 3. Feature 기반 아키텍처 ⭐️ NEW

도메인별로 컴포넌트, 훅, 타입을 분리합니다:

```
src/features/
├── dashboard/
│   ├── components/        # 대시보드 전용 컴포넌트
│   │   ├── MetricCard.tsx
│   │   ├── PerformanceChart.tsx
│   │   └── index.ts       # 배럴 export
│   ├── hooks/             # 대시보드 커스텀 훅
│   │   └── useDashboardData.ts
│   └── types.ts           # 대시보드 타입
├── data-input/
├── prompt-studio/
├── results/
└── deployment/
```

**새 Feature 추가 시**:
1. `src/features/feature-name/` 디렉토리 생성
2. `components/`, `hooks/`, `types.ts` 구조 유지
3. `components/index.ts`에 배럴 export 추가

### 4. 컴포넌트 구조 ⭐️ UPDATED

```
src/
├── pages/                          # 라우트 페이지 (150 라인 이하)
│   ├── DashboardPage.tsx
│   ├── DataInputPage.tsx
│   ├── PromptStudioPage.tsx
│   ├── ResultsValidationPage.tsx
│   └── DeploymentPage.tsx
│
├── features/                       # 기능별 도메인 로직
│   ├── dashboard/
│   ├── data-input/
│   ├── prompt-studio/
│   ├── results/
│   └── deployment/
│
├── components/                     # 공통 컴포넌트
│   ├── common/                    # 범용 컴포넌트
│   │   ├── PageHeader.tsx
│   │   ├── ChartCard.tsx
│   │   ├── AlertCard.tsx
│   │   ├── PageLoader.tsx
│   │   └── index.ts
│   ├── Sidebar.tsx                # 글로벌 사이드바
│   ├── ui/                        # shadcn/ui (46개)
│   └── figma/
│
├── layouts/                        # 레이아웃 컴포넌트
│   └── RootLayout.tsx             # Sidebar + Outlet
│
├── routes/                         # 라우팅 설정
│   └── index.tsx                  # React Router 설정
│
├── contexts/                       # Context API
│   └── UserModeContext.tsx        # 사용자 모드 전역 상태
│
├── hooks/                          # 전역 커스텀 훅
│   └── useDeploymentConfig.ts
│
├── types/                          # TypeScript 타입 정의
│   ├── common.ts
│   ├── dashboard.ts
│   ├── prompt.ts
│   ├── data-input.ts
│   ├── results.ts
│   ├── deployment.ts
│   └── index.ts
│
├── data/                           # Mock 데이터
│   ├── mockDashboard.ts
│   ├── mockPrompts.ts
│   ├── mockDataInput.ts
│   ├── mockResults.ts
│   └── mockDeployment.ts
│
├── constants/                      # 상수 및 설정 ⭐️ NEW
│   ├── routes.ts                  # ROUTES 객체
│   ├── navigation.ts              # NAVIGATION_ITEMS
│   ├── models.ts                  # AI_MODELS
│   ├── chart.ts                   # CHART_COLORS
│   ├── theme.ts                   # COLORS, STYLES
│   └── index.ts
│
├── utils/                          # 유틸리티 함수 ⭐️ NEW
│   ├── format.ts                  # 포맷팅 (8개)
│   ├── chart.ts                   # 차트 (12개)
│   ├── validation.ts              # 검증 (13개)
│   ├── string.ts                  # 문자열 (24개)
│   └── index.ts
│
├── App.tsx                         # 루트 컴포넌트 (RouterProvider)
├── main.tsx                        # 진입점 (UserModeProvider)
└── index.css                       # 전역 스타일
```

### 5. UI 컴포넌트 라이브러리

이 프로젝트는 **shadcn/ui** 기반의 Radix UI 컴포넌트를 사용합니다:

- **46개의 사전 구축된 UI 컴포넌트** (`src/components/ui/`)
- **Radix UI primitives**: 접근성과 키보드 네비게이션 내장
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **class-variance-authority (CVA)**: 타입 안전한 variant 관리
- **Recharts**: 대시보드 차트 및 데이터 시각화

```typescript
// UI 컴포넌트 임포트 패턴
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// shadcn/ui 스타일 패턴 유지
// - cn() 유틸리티 함수로 클래스 병합
// - variant props를 통한 스타일 변형
```

### 6. Path Alias 시스템

`vite.config.ts`에 `@/` alias 설정:

```typescript
// '@' alias로 src 디렉토리 접근
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils';
import { ROUTES } from '@/constants';
import type { UserMode } from '@/types';
```

**중요**: 새 컴포넌트 작성 시 항상 `@/` alias를 사용하세요.

---

## 주요 기능

### 1. React Router 네비게이션

```typescript
// NavLink 사용 (Sidebar.tsx)
import { NavLink } from 'react-router-dom';

<NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? 'active-styles' : 'inactive-styles'
  }
>
  Dashboard
</NavLink>

// 프로그래매틱 네비게이션
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/data-input');
```

### 2. 상수 사용 패턴 ⭐️ NEW

```typescript
import { ROUTES, NAVIGATION_ITEMS, AI_MODELS, CHART_COLORS } from '@/constants';

// 라우트 상수
navigate(ROUTES.DASHBOARD);

// 네비게이션 아이템
NAVIGATION_ITEMS.map(item => ...)

// AI 모델 설정
AI_MODELS['gpt-4'].displayName

// 차트 색상
CHART_COLORS.primary
```

### 3. 유틸리티 함수 사용 ⭐️ NEW

```typescript
import {
  formatCurrency,
  formatPercentage,
  isValidUrl,
  truncate,
  generateChartColors,
} from '@/utils';

// 포맷팅
const price = formatCurrency(1234.56); // '$1,234.56'
const accuracy = formatPercentage(92.5); // '92.5%'

// 검증
const isValid = isValidUrl('https://example.com');

// 문자열 처리
const short = truncate('Long text...', 10);

// 차트 유틸리티
const colors = generateChartColors(5);
```

### 4. 성능 최적화 ⭐️ NEW

```typescript
// Code Splitting (lazy loading)
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

// Suspense
<Suspense fallback={<PageLoader />}>
  <Outlet />
</Suspense>

// React.memo
export const MetricCard = memo(({ title, value }: MetricCardProps) => {
  // ...
});

// useMemo/useCallback
const expensiveValue = useMemo(() => calculate(data), [data]);
const handleClick = useCallback(() => action(), []);
```

---

## 기술 스택 세부사항

### 핵심 프레임워크
- **React 18.3.1**: 함수형 컴포넌트, Hooks 사용
- **TypeScript**: 엄격한 타입 체크
- **Vite 6.3.5**: 빌드 도구 및 개발 서버
- **React Router DOM 7.1.1**: 클라이언트 사이드 라우팅 ⭐️ NEW
- **@vitejs/plugin-react-swc**: SWC 기반 빠른 React 변환

### UI 라이브러리
- **Radix UI**: 무스타일 접근 가능한 컴포넌트 primitives
- **Tailwind CSS v4.1.3**: 유틸리티 기반 CSS 프레임워크
- **Lucide React**: 아이콘 라이브러리
- **Recharts 2.15.2**: 데이터 시각화 차트

### 폼 및 상태 관리
- **react-hook-form**: 폼 검증 및 상태 관리
- **Context API**: 전역 상태 관리 (UserMode) ⭐️ NEW

---

## 코딩 패턴 및 규칙

### TypeScript 규칙
```typescript
// 1. 명시적 타입 정의 사용
interface ComponentProps {
  userMode?: never; // ❌ 더 이상 사용하지 않음
  onSomething: () => void;
}

// 2. 타입 안전한 상태 관리
const [currentPage, setCurrentPage] = useState<Page>('dashboard');

// 3. Props 인터페이스를 컴포넌트 위에 정의
```

### React 컴포넌트 패턴
```typescript
// 1. 함수형 컴포넌트 + 명명된 export
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 2. useUserMode 훅 사용 (props 아님)
  const { userMode } = useUserMode();

  // 3. 조건부 렌더링은 boolean 변수로 명확하게
  const isExpertMode = userMode === 'expert';

  return (
    <div>
      {isExpertMode && <ExpertFeature />}
    </div>
  );
}

// 4. 성능 최적화가 필요한 경우 memo 사용
export const OptimizedComponent = memo(ComponentName);
```

### 스타일링 규칙
```typescript
// 1. Tailwind 유틸리티 클래스 사용
className="flex items-center gap-3 px-4 py-3"

// 2. 조건부 스타일은 템플릿 리터럴
className={`
  base-classes
  ${condition ? 'active-classes' : 'inactive-classes'}
`}

// 3. 다크 테마 기반 디자인
// - 배경: bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950
// - 카드: bg-black/30 backdrop-blur-xl border border-white/10
// - 텍스트: text-white, text-white/60 (투명도)
```

### 데이터 시각화 (Recharts) ⭐️ UPDATED
```typescript
import {
  DEFAULT_TOOLTIP_STYLE,
  DEFAULT_GRID_STYLE,
  DEFAULT_AXIS_STYLE,
} from '@/utils/chart';

// 1. ResponsiveContainer로 차트 감싸기
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid {...DEFAULT_GRID_STYLE} />
    <XAxis {...DEFAULT_AXIS_STYLE} />
    <YAxis {...DEFAULT_AXIS_STYLE} />
    <Tooltip contentStyle={DEFAULT_TOOLTIP_STYLE} />
    <Line type="monotone" dataKey="value" stroke="#8b5cf6" />
  </LineChart>
</ResponsiveContainer>
```

---

## 특수 고려사항

### 1. 한국어 UI
- 모든 UI 텍스트가 한국어로 작성됨
- 주석과 코드는 영어 사용
- 새 기능 추가 시 한국어 레이블 사용

### 2. Mock 데이터 패턴
현재 모든 페이지는 커스텀 훅을 통해 mock 데이터 사용:
```typescript
// Custom Hook 패턴 (data/mockDashboard.ts → hooks/useDashboardData.ts)
export function useDashboardData() {
  return {
    performanceData: mockPerformanceData,
    modelComparisonData: mockModelComparison,
    // ...
  };
}

// 페이지에서 사용
const { performanceData } = useDashboardData();
```

**새 기능 추가 시**: 실제 API 연동 전까지 같은 패턴으로 mock 데이터 구성

### 3. 페이지 구조 일관성
모든 페이지 컴포넌트는 다음 구조를 따릅니다:
```typescript
export function PageName() {
  const { userMode } = useUserMode();
  const isExpertMode = userMode === 'expert';

  return (
    <div className="p-8 space-y-6">
      {/* 헤더 섹션 */}
      <PageHeader title="페이지 제목" />

      {/* 콘텐츠 */}
      {/* ... */}
    </div>
  );
}
```

### 4. 상태 관리 전략
- **Local State**: 페이지별 useState 사용
- **Global State**: Context API (UserMode)
- **향후 확장**: React Query (API 연동), Zustand (복잡한 전역 상태)

### 5. 접근성 (a11y)
Radix UI가 기본 접근성 제공:
- 키보드 네비게이션 내장
- ARIA 속성 자동 설정
- 포커스 관리 자동화

---

## 일반적인 작업 시나리오

### 새 페이지 추가
```typescript
// 1. src/pages/NewPage.tsx 생성
export function NewPage() {
  const { userMode } = useUserMode();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl text-white">새 페이지</h1>
    </div>
  );
}

// 2. routes/index.tsx에 라우트 추가
{
  path: '/new-page',
  element: <NewPage />
}

// 3. constants/navigation.ts에 메뉴 항목 추가
{
  id: 'new-page',
  label: '새 페이지',
  icon: YourIcon,
  path: '/new-page'
}
```

### 새 Feature 컴포넌트 추가
```typescript
// 1. src/features/feature-name/components/FeatureComponent.tsx 생성
export function FeatureComponent() {
  return <div>Feature Component</div>;
}

// 2. src/features/feature-name/components/index.ts에 export 추가
export { FeatureComponent } from './FeatureComponent';

// 3. 페이지에서 사용
import { FeatureComponent } from '@/features/feature-name/components';
```

### 유틸리티 함수 추가
```typescript
// src/utils/format.ts에 함수 추가
export function formatExample(value: string): string {
  // JSDoc 주석 필수
  return value;
}

// src/utils/index.ts에 export 추가
export { formatExample } from './format';
```

### 상수 추가
```typescript
// src/constants/theme.ts에 상수 추가
export const NEW_CONSTANT = {
  value: '...'
};

// src/constants/index.ts에 export 추가
export { NEW_CONSTANT } from './theme';
```

---

## 디버깅 팁

### 개발 중 자주 발생하는 문제

1. **useUserMode 훅 오류**
   - `UserModeProvider`가 `main.tsx`에 설정되어 있는지 확인
   - 컴포넌트가 Provider 내부에 있는지 확인

2. **라우팅 문제**
   - `routes/index.tsx`에 라우트가 정의되어 있는지 확인
   - `ROUTES` 상수 사용 시 오타 확인
   - NavLink의 `to` prop 확인

3. **상수 import 오류**
   - `@/constants`에서 import하는지 확인
   - 배럴 export가 업데이트되어 있는지 확인

4. **타입 오류**
   - userMode prop을 페이지 컴포넌트에 전달하지 않는지 확인
   - 대신 `useUserMode()` 훅 사용

---

## 프로젝트 확장 가이드

### 백엔드 통합 준비
향후 통합을 위한 권장 구조:
```
src/
├── api/
│   ├── client.ts          # API 클라이언트 (axios/fetch)
│   ├── endpoints.ts       # API 엔드포인트
│   └── types.ts           # API 응답 타입
├── hooks/
│   ├── queries/           # React Query 훅
│   │   ├── useDashboardQuery.ts
│   │   └── usePromptsQuery.ts
│   └── mutations/         # React Query 뮤테이션
└── store/                 # 전역 상태 (Zustand/Redux)
```

### 테스팅 추가
```bash
# 권장 테스팅 스택
npm install -D vitest @testing-library/react @testing-library/jest-dom

# vite.config.ts에 test 설정 추가
```

### 환경 변수 관리
```bash
# .env 파일 생성 (Vite 규칙)
VITE_API_URL=http://localhost:8000
VITE_APP_NAME="AI Agent Lab"

# 코드에서 접근
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 참고 자료

- **Vite 문서**: https://vitejs.dev/
- **React 문서**: https://react.dev/
- **React Router**: https://reactrouter.com/
- **Radix UI**: https://www.radix-ui.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Recharts**: https://recharts.org/
- **shadcn/ui**: https://ui.shadcn.com/
- **Lucide Icons**: https://lucide.dev/

---

## 리팩토링 히스토리

이 프로젝트는 대규모 엔터프라이즈급 리팩토링을 완료했습니다.

### 완료된 Phase
- ✅ Phase 0: 준비 단계
- ✅ Phase 1: 타입 시스템 구축
- ✅ Phase 2: 데이터 레이어 분리
- ✅ Phase 3: Context API 도입
- ✅ Phase 4: React Router 도입
- 🟡 Phase 5: 컴포넌트 분리 (20% 완료)
- ✅ Phase 6: 상수 및 설정 관리
- ✅ Phase 7: 성능 최적화
- ✅ Phase 8: 유틸리티 및 헬퍼 함수

자세한 내용은 `plans/refactoring-plan.md` 참조.

---

## 중요: 변경 사항 요약

이 프로젝트는 최근 대규모 리팩토링을 거쳤습니다. 주요 변경사항:

### ❌ 더 이상 사용하지 않음
- 상태 기반 페이지 전환 (`currentPage` state)
- userMode prop drilling
- 컴포넌트 내부 mock 데이터 하드코딩

### ✅ 새로 도입됨
- React Router v7 (URL 기반 라우팅)
- Context API (UserMode 전역 관리)
- Feature 기반 아키텍처
- 상수 관리 시스템
- 유틸리티 함수 라이브러리 (57개 함수)
- 성능 최적화 (Code Splitting, Memo)

### 📝 코드 작성 시 주의사항
1. 페이지 컴포넌트에 `userMode` prop 전달하지 말 것
2. 대신 `useUserMode()` 훅 사용
3. 라우팅은 `useNavigate()` 또는 `NavLink` 사용
4. 상수는 `@/constants`에서 import
5. 유틸리티 함수는 `@/utils`에서 import
6. 항상 `@/` path alias 사용

---

**IMPORTANT**: 이 문서는 리팩토링 완료 후 최신 상태입니다. 코드 작성 시 반드시 새로운 패턴을 따라주세요.
