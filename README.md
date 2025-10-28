# AI Agent Lab Design

**AI 에이전트 실험실 프로토타이핑 도구** - React + TypeScript + Vite 기반의 엔터프라이즈급 프론트엔드 애플리케이션

> 원본 Figma 디자인: [AI Agent Lab Design](https://www.figma.com/design/x4m44S5GS4zpP4Ixp6oFhP/AI-Agent-Lab-Design)

---

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [빠른 시작](#빠른-시작)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [개발 가이드](#개발-가이드)
- [아키텍처](#아키텍처)
- [코딩 규칙](#코딩-규칙)
- [배포](#배포)
- [라이선스](#라이선스)

---

## 프로젝트 개요

AI Agent Lab은 AI 모델의 프롬프트 엔지니어링, 성능 모니터링, A/B 테스팅, 배포 관리를 위한 올인원 플랫폼입니다.

### 핵심 기능

- 📊 **대시보드**: 실시간 AI 모델 성능 모니터링 및 비용 분석
- ✍️ **프롬프트 스튜디오**: 템플릿 기반 프롬프트 엔지니어링 환경
- 📂 **데이터 입력**: 다양한 데이터 소스 통합 (텍스트, 파일, URL, 데이터베이스)
- 🔬 **결과 검증**: A/B 테스트 및 응답 품질 평가
- 🚀 **배포 관리**: API 키 관리 및 다중 플랫폼 통합

### 사용자 모드

- **Beginner 모드**: 단순화된 UI, 필수 기능만 표시
- **Expert 모드**: 고급 설정, 상세 차트, 기술적 정보 제공

---

## 빠른 시작

### 사전 요구사항

- **Node.js**: 18.x 이상
- **npm**: 9.x 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3000, 자동으로 브라우저 열림)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

### 개발 서버

개발 서버는 `http://localhost:3000`에서 실행됩니다.

---

## 프로젝트 구조

```
src/
├── pages/                          # 라우트 페이지 (150 라인 이하)
│   ├── DashboardPage.tsx          # 대시보드 메인 페이지
│   ├── DataInputPage.tsx          # 데이터 입력 페이지
│   ├── PromptStudioPage.tsx       # 프롬프트 스튜디오 페이지
│   ├── ResultsValidationPage.tsx  # 결과 검증 페이지
│   └── DeploymentPage.tsx         # 배포 관리 페이지
│
├── features/                       # 기능별 도메인 로직
│   ├── dashboard/                 # 대시보드 feature
│   │   ├── components/            # 대시보드 전용 컴포넌트
│   │   │   ├── MetricCard.tsx
│   │   │   ├── PerformanceChart.tsx
│   │   │   ├── ModelComparisonChart.tsx
│   │   │   ├── CostBreakdownChart.tsx
│   │   │   ├── PerformanceRadarChart.tsx
│   │   │   └── index.ts           # 배럴 export
│   │   ├── hooks/                 # 대시보드 커스텀 훅
│   │   │   └── useDashboardData.ts
│   │   └── types.ts               # 대시보드 타입 정의
│   ├── data-input/                # 데이터 입력 feature
│   ├── prompt-studio/             # 프롬프트 스튜디오 feature
│   ├── results/                   # 결과 검증 feature
│   └── deployment/                # 배포 관리 feature
│
├── components/                     # 공통 컴포넌트
│   ├── common/                    # 범용 컴포넌트
│   │   ├── PageHeader.tsx         # 페이지 헤더
│   │   ├── ChartCard.tsx          # 차트 카드
│   │   ├── AlertCard.tsx          # 알림 카드
│   │   ├── PageLoader.tsx         # 페이지 로더
│   │   └── index.ts
│   ├── Sidebar.tsx                # 글로벌 사이드바
│   ├── ui/                        # shadcn/ui 컴포넌트 (46개)
│   └── figma/                     # Figma 관련 컴포넌트
│
├── layouts/                        # 레이아웃 컴포넌트
│   └── RootLayout.tsx             # 루트 레이아웃 (Sidebar + Outlet)
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
│   ├── common.ts                  # 공통 타입
│   ├── dashboard.ts               # 대시보드 타입
│   ├── prompt.ts                  # 프롬프트 타입
│   ├── data-input.ts              # 데이터 입력 타입
│   ├── results.ts                 # 결과 검증 타입
│   ├── deployment.ts              # 배포 타입
│   └── index.ts                   # 타입 배럴 export
│
├── data/                           # Mock 데이터 (추후 API 대체)
│   ├── mockDashboard.ts
│   ├── mockPrompts.ts
│   ├── mockDataInput.ts
│   ├── mockResults.ts
│   └── mockDeployment.ts
│
├── constants/                      # 상수 및 설정
│   ├── routes.ts                  # 라우트 상수
│   ├── navigation.ts              # 네비게이션 설정
│   ├── models.ts                  # AI 모델 설정
│   ├── chart.ts                   # 차트 색상 및 설정
│   ├── theme.ts                   # 테마 상수
│   └── index.ts                   # 상수 배럴 export
│
├── utils/                          # 유틸리티 함수
│   ├── format.ts                  # 포맷팅 (8개 함수)
│   ├── chart.ts                   # 차트 유틸리티 (12개 함수)
│   ├── validation.ts              # 검증 (13개 함수)
│   ├── string.ts                  # 문자열 처리 (24개 함수)
│   └── index.ts                   # 유틸리티 배럴 export
│
├── styles/                         # 스타일 파일
├── guidelines/                     # 디자인 가이드라인
├── App.tsx                         # 루트 컴포넌트
├── main.tsx                        # 진입점
└── index.css                       # 전역 스타일
```

---

## 주요 기능

### 1. React Router 기반 네비게이션

- URL 기반 페이지 라우팅
- 브라우저 히스토리 관리
- NavLink로 자동 active 상태 관리

```typescript
// routes/index.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/data-input', element: <DataInputPage /> },
      // ...
    ],
  },
]);
```

### 2. Context API 전역 상태 관리

- Props drilling 제거
- 사용자 모드 전역 관리 (Beginner ↔ Expert)

```typescript
// contexts/UserModeContext.tsx
const { userMode, setUserMode } = useUserMode();
```

### 3. Feature 기반 아키텍처

- 도메인별로 컴포넌트, 훅, 타입 분리
- 높은 응집도, 낮은 결합도
- 독립적인 테스트 가능

### 4. 유틸리티 라이브러리

- 57개의 재사용 가능한 유틸리티 함수
- 100% JSDoc 문서화
- TypeScript 타입 안전성

```typescript
import { formatCurrency, isValidUrl, truncate } from '@/utils';
```

### 5. 성능 최적화

- Code Splitting (lazy loading)
- React.memo 메모이제이션
- useMemo/useCallback 최적화

---

## 기술 스택

### 핵심 프레임워크

- **React 18.3.1**: 함수형 컴포넌트, Hooks
- **TypeScript**: 엄격한 타입 체크
- **Vite 6.3.5**: 빠른 빌드 및 개발 서버
- **React Router DOM 7.1.1**: 클라이언트 사이드 라우팅

### UI 라이브러리

- **Radix UI**: 접근 가능한 컴포넌트 primitives
- **Tailwind CSS v4.1.3**: 유틸리티 기반 스타일링
- **Lucide React**: 아이콘
- **Recharts 2.15.2**: 데이터 시각화

### 폼 및 상태

- **react-hook-form**: 폼 상태 관리
- **Context API**: 전역 상태 관리

### 빌드 도구

- **@vitejs/plugin-react-swc**: SWC 기반 빠른 변환
- **PostCSS**: CSS 처리

---

## 개발 가이드

### 새 페이지 추가

1. `src/pages/`에 페이지 컴포넌트 생성
2. `src/routes/index.tsx`에 라우트 추가
3. `src/constants/navigation.ts`에 메뉴 항목 추가

```typescript
// pages/NewPage.tsx
export function NewPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl text-white">새 페이지</h1>
    </div>
  );
}

// routes/index.tsx
{
  path: '/new-page',
  element: <NewPage />
}

// constants/navigation.ts
{
  id: 'new-page',
  label: '새 페이지',
  icon: IconName,
  path: '/new-page'
}
```

### 새 Feature 추가

1. `src/features/feature-name/` 디렉토리 생성
2. `components/`, `hooks/`, `types.ts` 구조 유지
3. 배럴 export (`index.ts`) 생성

```
src/features/new-feature/
├── components/
│   ├── FeatureComponent.tsx
│   └── index.ts
├── hooks/
│   └── useFeatureData.ts
└── types.ts
```

### 유틸리티 함수 사용

```typescript
import {
  formatCurrency,
  formatPercentage,
  isValidUrl,
  truncate,
} from '@/utils';

const price = formatCurrency(1234.56); // '$1,234.56'
const accuracy = formatPercentage(92.5); // '92.5%'
const isValid = isValidUrl('https://example.com'); // true
const short = truncate('Long text...', 10); // 'Long te...'
```

---

## 아키텍처

### 디자인 패턴

- **컴포넌트 기반 아키텍처**: 재사용 가능한 작은 컴포넌트
- **Feature 분리**: 도메인별 로직 격리
- **Presentational vs Container**: UI와 로직 분리
- **Custom Hooks**: 비즈니스 로직 캡슐화

### 상태 관리

- **Local State**: 페이지별 useState
- **Global State**: Context API (UserMode)
- **향후 확장**: Zustand 또는 Redux Toolkit 고려

### 데이터 흐름

```
Mock Data → Custom Hook → Page Component → Feature Component
```

향후:
```
API → React Query → Custom Hook → Page Component → Feature Component
```

---

## 코딩 규칙

### TypeScript 규칙

```typescript
// 명시적 타입 정의
interface ComponentProps {
  userMode: 'beginner' | 'expert';
  onAction: () => void;
}

// 타입 안전한 상태
const [value, setValue] = useState<string>('');

// Generic 타입 활용
function getData<T>(id: string): T {
  // ...
}
```

### React 컴포넌트 패턴

```typescript
// 함수형 컴포넌트 + 명명된 export
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 조건부 렌더링은 boolean 변수로
  const isExpertMode = userMode === 'expert';

  return (
    <div>
      {isExpertMode && <AdvancedFeature />}
    </div>
  );
}
```

### 스타일링 규칙

```typescript
// Tailwind 유틸리티 클래스
className="flex items-center gap-3 px-4 py-3"

// 조건부 스타일
className={`
  base-classes
  ${condition ? 'active-classes' : 'inactive-classes'}
`}

// 다크 테마 기반
className="bg-black/30 backdrop-blur-xl border border-white/10"
```

### Import 경로

```typescript
// Path alias 사용
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils';
import type { UserMode } from '@/types';
```

---

## 배포

### 프로덕션 빌드

```bash
npm run build
```

빌드 결과물은 `build/` 디렉토리에 생성됩니다.

### 환경 변수

`.env` 파일 생성:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=AI Agent Lab
```

코드에서 접근:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### 정적 호스팅

Vite 빌드 결과물은 다음 플랫폼에 배포 가능합니다:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: `npm run build && gh-pages -d build`

---

## 성능 지표

### 빌드 성능

- **빌드 시간**: ~2.76초
- **번들 크기**: 257.58 kB (gzip: 84.16 kB)
- **청크 분리**: 페이지별 lazy loading

### 코드 품질

- **평균 컴포넌트 크기**: 100-150 라인
- **Props drilling 깊이**: 0 (Context API 사용)
- **타입 안전성**: 100%
- **JSDoc 문서화**: 100%

---

## 리팩토링 히스토리

이 프로젝트는 대규모 엔터프라이즈급 리팩토링을 거쳤습니다.

### 완료된 Phase

- ✅ **Phase 0**: 준비 단계
- ✅ **Phase 1**: 타입 시스템 구축
- ✅ **Phase 2**: 데이터 레이어 분리
- ✅ **Phase 3**: Context API 도입
- ✅ **Phase 4**: React Router 도입
- 🟡 **Phase 5**: 컴포넌트 분리 (20% 완료)
- ✅ **Phase 6**: 상수 및 설정 관리
- ✅ **Phase 7**: 성능 최적화
- ✅ **Phase 8**: 유틸리티 및 헬퍼 함수

자세한 내용은 `plans/refactoring-plan.md` 참조.

---

## 기여

이 프로젝트는 Figma 디자인에서 변환된 프로토타입입니다.

### 개발 워크플로우

1. Feature 브랜치 생성: `git checkout -b feature/new-feature`
2. 변경 사항 커밋: `git commit -m "feat: add new feature"`
3. 빌드 검증: `npm run build`
4. Pull Request 생성

---

## 라이선스

이 프로젝트는 원본 Figma 디자인을 기반으로 합니다.

---

## 문의

프로젝트 관련 문의는 CLAUDE.md를 참조하거나 이슈를 생성해주세요.
