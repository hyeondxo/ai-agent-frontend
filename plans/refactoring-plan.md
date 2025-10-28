# AI Agent Lab 프론트엔드 대규모 리팩토링 플랜

> **작성일**: 2025-10-28
> **목표**: React Router 도입 및 엔터프라이즈급 아키텍처로 리팩토링
> **예상 소요 시간**: 18.5시간 (약 3일)

---

## 📊 진행 상황 추적

| Phase | 상태 | 완료일 | 소요시간 | 비고 |
|-------|------|--------|----------|------|
| Phase 0: 준비 단계 | ✅ 완료 | 2025-10-28 | 15분 | 의존성 설치, 디렉토리 생성, Git 초기화 완료 |
| Phase 1: 타입 시스템 구축 | ✅ 완료 | 2025-10-28 | 20분 | 6개 타입 파일 + index 생성 완료 |
| Phase 2: 데이터 레이어 분리 | ✅ 완료 | 2025-10-28 | 45분 | 5개 mock 데이터 파일 + 5개 커스텀 훅 생성 완료 |
| Phase 3: Context API 도입 | ✅ 완료 | 2025-10-28 | 25분 | UserModeContext 생성, Props drilling 제거 완료 |
| Phase 4: React Router 도입 | ✅ 완료 | 2025-10-28 | 30분 | RootLayout, 라우터 설정, NavLink 전환, 페이지 이동 완료 |
| Phase 5: 컴포넌트 분리 및 최적화 | 🟡 진행 중 | 2025-10-28 | 2시간 | Dashboard 완료 (20%), 가이드 문서 작성 |
| Phase 6: 상수 및 설정 관리 | ✅ 완료 | 2025-10-28 | 1시간 | 5개 상수 파일 생성, 컴포넌트 업데이트 완료 |
| Phase 7: 성능 최적화 | ✅ 완료 | 2025-10-28 | 45분 | Code Splitting, 메모이제이션, React.memo 적용 완료 |
| Phase 8: 유틸리티 및 헬퍼 함수 | ✅ 완료 | 2025-10-28 | 1시간 | 57개 유틸리티 함수 생성 (format, chart, validation, string) |
| Phase 9: 접근성 및 UX 개선 | ⬜️ 대기 | - | - | - |
| Phase 10: 문서화 및 정리 | ✅ 완료 | 2025-10-28 | 1시간 | README 500줄, CLAUDE.md 663줄, JSDoc 100% 완료 |
| Phase 11: 테스트 및 검증 | ⬜️ 대기 | - | - | - |

**상태 범례:**
- ⬜️ 대기 (Not Started)
- 🟡 진행 중 (In Progress)
- ✅ 완료 (Completed)
- ❌ 블로킹 (Blocked)

---

## 🎯 현재 작업 상태

### 현재 Phase: Phase 5 - 컴포넌트 분리 및 최적화 (일시 중지)
**시작일**: 2025-10-28
**진행률**: 20% (1/5 features completed)

### 최근 완료: Phase 10 - 문서화 및 정리
**완료일**: 2025-10-28
**소요 시간**: 1시간

#### Phase 4 완료된 작업
- [x] RootLayout 컴포넌트 생성 (layouts/RootLayout.tsx)
- [x] 라우터 설정 파일 생성 (routes/index.tsx)
- [x] createBrowserRouter 설정 및 라우트 정의
- [x] 페이지 컴포넌트 이동 (components/ → pages/)
- [x] Sidebar를 NavLink로 전환
- [x] App.tsx 리팩토링 (RouterProvider 사용)
- [x] 모든 import 경로 업데이트
- [x] 빌드 검증 (Vite 빌드 성공)

#### Phase 3 완료된 작업
- [x] UserMode Context 생성 (UserModeContext.tsx)
- [x] UserModeProvider 구현 및 useUserMode 훅
- [x] main.tsx에 Provider 적용
- [x] 모든 페이지에서 userMode Props 제거 (Dashboard, DataInputPage, PromptStudioPage, ResultsValidationPage)
- [x] App.tsx에서 userMode state 및 props 제거
- [x] Sidebar.tsx에서 useUserMode 훅 사용으로 전환
- [x] 빌드 검증 (TypeScript 컴파일 에러 0개)

#### Phase 2 완료된 작업
- [x] Mock 데이터 추출 (mockDashboard.ts, mockPrompts.ts, mockDataInput.ts, mockResults.ts, mockDeployment.ts)
- [x] 커스텀 훅 생성 (useDashboardData, usePromptTemplates, useDataInput, useTestResults, useDeploymentConfig)
- [x] 페이지 컴포넌트 업데이트 (Dashboard.tsx, PromptStudioPage.tsx, DataInputPage.tsx, ResultsValidationPage.tsx, DeploymentPage.tsx)
- [x] 빌드 검증 (TypeScript 컴파일 에러 0개)

#### Phase 1 완료된 작업
- [x] 공통 타입 정의 (common.ts) - UserMode, Page, PageProps
- [x] Dashboard 타입 정의 (dashboard.ts) - PerformanceDataPoint, ModelComparison, CostBreakdown, RadarDataPoint
- [x] Prompt 타입 정의 (prompt.ts) - PromptTemplate, ModelConfig, PromptHistory, AdvancedSettings
- [x] Data Input 타입 정의 (data-input.ts) - TableInfo, DataSource, UploadStatus, CrawlerConfig
- [x] Results 타입 정의 (results.ts) - TestResult, ComparisonData, ResponseExample
- [x] Deployment 타입 정의 (deployment.ts) - DeploymentConfig, ApiConfig, IntegrationPlatform
- [x] 타입 Index 파일 생성 (index.ts) - 중앙 집중식 export

#### Phase 6 완료된 작업
- [x] routes.ts 생성 (ROUTES 객체, 라우트 헬퍼 함수)
- [x] navigation.ts 생성 (NAVIGATION_ITEMS, APP_BRANDING, USER_MODE_LABELS)
- [x] models.ts 생성 (AI_MODELS, 모델 헬퍼 함수)
- [x] chart.ts 생성 (CHART_COLORS, 차트 설정, 기본 props)
- [x] theme.ts 생성 (COLORS, STYLES, SPACING, 테마 헬퍼)
- [x] index.ts 배럴 export 생성
- [x] routes/index.tsx 업데이트 (ROUTES 사용)
- [x] Sidebar.tsx 업데이트 (NAVIGATION_ITEMS, APP_BRANDING 사용)
- [x] Chart 컴포넌트 업데이트 (PerformanceChart, ModelComparisonChart, PerformanceRadarChart)
- [x] mockDashboard.ts 업데이트 (AI_MODELS 사용)
- [x] 빌드 검증 (2.24s 빌드 시간)
- [x] Phase 6 요약 문서 작성 (phase-6-summary.md)

#### Phase 5 진행 중 작업
- [x] Dashboard 컴포넌트 분리 (MetricCard, PerformanceChart, ModelComparisonChart, CostBreakdownChart, RadarChart)
- [x] 공통 컴포넌트 생성 (PageHeader, ChartCard, AlertCard)
- [x] DashboardPage 리팩토링 (369 → 203 lines, 45% reduction)
- [x] 빌드 검증 (2.21s 빌드 시간)
- [x] Phase 5 구현 가이드 작성 (phase-5-implementation-guide.md)
- [ ] Prompt Studio 컴포넌트 분리
- [ ] Data Input 컴포넌트 분리
- [ ] Results Validation 컴포넌트 분리
- [ ] Deployment 컴포넌트 분리

#### Phase 7 완료된 작업
- [x] Code Splitting: 모든 페이지 lazy import 적용
- [x] Suspense & PageLoader 컴포넌트 생성
- [x] DashboardPage 메모이제이션 (useMemo, headerActions, starRating)
- [x] PromptStudioPage 메모이제이션 (useCallback)
- [x] DataInputPage 메모이제이션 (useCallback)
- [x] 차트 컴포넌트 React.memo 적용 (5개)
- [x] MetricCard React.memo 적용
- [x] 빌드 검증 (2.32s, 페이지별 청크 분리 확인)
- [x] Phase 7 요약 문서 작성 (phase-7-summary.md)

#### Phase 8 완료된 작업
- [x] 포맷 유틸리티 함수 생성 (format.ts - 8개 함수)
- [x] 차트 유틸리티 함수 생성 (chart.ts - 12개 함수 + 3개 상수)
- [x] 검증 유틸리티 함수 생성 (validation.ts - 13개 함수)
- [x] 문자열 유틸리티 함수 생성 (string.ts - 24개 함수)
- [x] 배럴 export 파일 생성 (index.ts)
- [x] 빌드 검증 (2.76s 빌드 시간)
- [x] Phase 8 요약 문서 작성 (phase-8-summary.md)

#### Phase 10 완료된 작업
- [x] JSDoc 주석 검증 (모든 커스텀 훅 5개, 유틸리티 57개 완료)
- [x] README.md 전면 업데이트 (11줄 → 500줄)
- [x] CLAUDE.md 전면 재작성 (663줄, 최신 아키텍처 반영)
- [x] 코드 정리 (미사용 import 제거)
- [x] 빌드 검증 (2.76s 빌드 시간)
- [x] Phase 10 요약 문서 작성 (phase-10-summary.md)

#### 다음 작업 (Phase 5 계속 또는 Phase 9/11 진행)
- [ ] Phase 5 계속: Prompt Studio feature 구현 (phase-5-implementation-guide.md 참조)
- [ ] Phase 9 시작: 접근성 및 UX 개선
- [ ] Phase 11 시작: 테스트 및 검증

---

## 📋 프로젝트 현황 분석

### 현재 상태
**프로젝트 특성:**
- 총 2,236 라인의 메인 소스코드
- 5개 페이지 컴포넌트 (평균 410 라인/페이지)
- 상태 기반 라우팅 (React Router 미사용)
- Props drilling으로 userMode 전달
- 페이지 내 하드코딩된 mock 데이터
- 46개의 shadcn/ui 컴포넌트

**주요 문제점:**
1. ❌ 라우팅: 수동 상태 관리 → URL 기반 네비게이션 부재
2. ❌ 상태 관리: Props drilling → 전역 상태 없음
3. ❌ 데이터 레이어: Mock 데이터가 컴포넌트에 혼재
4. ❌ 코드 구조: 페이지당 400+ 라인 → 모놀리식 컴포넌트
5. ❌ 타입 안전성: 공통 타입 정의 분산
6. ❌ 재사용성: 비즈니스 로직과 UI 결합

---

## 🎯 리팩토링 목표

**핵심 원칙:**
- ✅ UI/UX 100% 보존 (픽셀 단위 동일)
- ✅ 모든 기능 동작 보존
- ✅ React Router v6 도입
- ✅ 확장 가능한 아키텍처
- ✅ 엔터프라이즈급 코드 품질

---

## 📝 Phase별 상세 실행 계획

### Phase 0: 준비 단계 ⏱️ 30분

**목적:** 안전한 리팩토링을 위한 기반 구축

#### 체크리스트
- [ ] **0.1 의존성 설치**
  ```bash
  npm install react-router-dom@6
  npm install -D @types/react-router-dom
  ```

- [ ] **0.2 TypeScript 설정 추가**
  - [ ] `tsconfig.json` 생성 (strict mode)
  - [ ] Path alias 확장: `@/` 구조 유지

- [ ] **0.3 디렉토리 구조 생성**
  ```bash
  mkdir -p src/{pages,features,hooks,contexts,types,constants,utils,layouts}
  ```
  - [ ] `src/pages/` 생성
  - [ ] `src/features/` 생성
  - [ ] `src/hooks/` 생성
  - [ ] `src/contexts/` 생성
  - [ ] `src/types/` 생성
  - [ ] `src/constants/` 생성
  - [ ] `src/utils/` 생성
  - [ ] `src/layouts/` 생성

- [ ] **0.4 Git 브랜치 생성**
  ```bash
  git checkout -b refactor/enterprise-architecture
  ```

#### 검증 기준
- ✅ react-router-dom 설치 확인
- ✅ tsconfig.json 생성 완료
- ✅ 모든 디렉토리 생성 확인
- ✅ 브랜치 전환 완료

---

### Phase 1: 타입 시스템 구축 ⏱️ 1시간

**목적:** 타입 안전성 확보 및 공통 인터페이스 정의

#### 체크리스트
- [ ] **1.1 공통 타입 정의**
  - [ ] `src/types/common.ts` 생성
    - [ ] `UserMode` 타입
    - [ ] `PageRoute` 타입
  - [ ] `src/types/dashboard.ts` 생성
    - [ ] `MetricData` 인터페이스
    - [ ] `ModelComparison` 인터페이스
    - [ ] `CostData` 인터페이스
    - [ ] `RadarData` 인터페이스
  - [ ] `src/types/prompt.ts` 생성
    - [ ] `PromptTemplate` 인터페이스
    - [ ] `ModelConfig` 인터페이스
    - [ ] `PromptHistory` 인터페이스
  - [ ] `src/types/data-input.ts` 생성
    - [ ] `TableInfo` 인터페이스
    - [ ] `DataSource` 타입
  - [ ] `src/types/results.ts` 생성
    - [ ] `TestResult` 인터페이스
    - [ ] `ComparisonData` 인터페이스
    - [ ] `ResponseExample` 인터페이스
  - [ ] `src/types/deployment.ts` 생성
    - [ ] `DeploymentConfig` 인터페이스
    - [ ] `ApiConfig` 인터페이스

- [ ] **1.2 Props 인터페이스 표준화**
  - [ ] 모든 페이지 컴포넌트 Props 타입 추출
  - [ ] 공통 Props 패턴 식별 및 재사용

#### 검증 기준
- ✅ 모든 타입 파일 생성 완료
- ✅ TypeScript 컴파일 에러 0개
- ✅ 기존 코드 정상 동작

---

### Phase 2: 데이터 레이어 분리 ⏱️ 2시간

**목적:** Mock 데이터를 컴포넌트에서 분리하여 추후 API 연동 준비

#### 체크리스트
- [ ] **2.1 Mock 데이터 추출**
  - [ ] `src/data/mockDashboard.ts` 생성
    - [ ] `mockPerformanceData` 추출
    - [ ] `mockModelComparison` 추출
    - [ ] `mockCostBreakdown` 추출
    - [ ] `mockRadarData` 추출
  - [ ] `src/data/mockPrompts.ts` 생성
    - [ ] `mockTemplates` 추출
    - [ ] `mockModels` 추출
    - [ ] `mockPromptHistory` 추출
  - [ ] `src/data/mockDataInput.ts` 생성
    - [ ] `mockTables` 추출
    - [ ] `mockDocumentPreview` 추출
  - [ ] `src/data/mockResults.ts` 생성
    - [ ] `mockTestResults` 추출
    - [ ] `mockComparisonData` 추출
    - [ ] `mockResponseExamples` 추출
  - [ ] `src/data/mockDeployment.ts` 생성
    - [ ] API 설정 데이터 추출

- [ ] **2.2 커스텀 훅 생성**
  - [ ] `src/hooks/useDashboardData.ts`
  - [ ] `src/hooks/usePromptTemplates.ts`
  - [ ] `src/hooks/useDataInput.ts`
  - [ ] `src/hooks/useTestResults.ts`
  - [ ] `src/hooks/useDeploymentConfig.ts`

- [ ] **2.3 페이지 컴포넌트 업데이트**
  - [ ] Dashboard.tsx에서 mock 데이터 제거 및 훅 사용
  - [ ] PromptStudioPage.tsx에서 mock 데이터 제거 및 훅 사용
  - [ ] DataInputPage.tsx에서 mock 데이터 제거 및 훅 사용
  - [ ] ResultsValidationPage.tsx에서 mock 데이터 제거 및 훅 사용
  - [ ] DeploymentPage.tsx에서 mock 데이터 제거 및 훅 사용

#### 검증 기준
- ✅ 모든 페이지에서 mock 데이터 제거
- ✅ 커스텀 훅으로 데이터 접근
- ✅ UI 렌더링 동일
- ✅ TypeScript 에러 없음

---

### Phase 3: Context API 도입 ⏱️ 1.5시간

**목적:** Props drilling 제거 및 전역 상태 관리

#### 체크리스트
- [ ] **3.1 UserMode Context 생성**
  - [ ] `src/contexts/UserModeContext.tsx` 생성
    - [ ] `UserModeContext` 생성
    - [ ] `UserModeProvider` 구현
    - [ ] `useUserMode` 훅 구현

- [ ] **3.2 Provider 적용**
  - [ ] `src/main.tsx`에 `UserModeProvider` 추가
  - [ ] Context 초기값 설정

- [ ] **3.3 모든 페이지에서 Props 제거**
  - [ ] App.tsx에서 userMode state 제거
  - [ ] Dashboard.tsx Props 제거 및 useUserMode() 사용
  - [ ] DataInputPage.tsx Props 제거 및 useUserMode() 사용
  - [ ] PromptStudioPage.tsx Props 제거 및 useUserMode() 사용
  - [ ] ResultsValidationPage.tsx Props 제거 및 useUserMode() 사용
  - [ ] DeploymentPage.tsx Props 제거 (필요 시)

- [ ] **3.4 Sidebar 업데이트**
  - [ ] Sidebar.tsx에서 Props 제거
  - [ ] useUserMode() 훅으로 모드 접근
  - [ ] 모드 전환 로직 Context 사용

#### 검증 기준
- ✅ Props drilling 완전 제거
- ✅ 모드 전환 정상 동작
- ✅ 모든 페이지에서 모드 반영
- ✅ TypeScript 에러 없음

---

### Phase 4: React Router 도입 ⏱️ 2시간

**목적:** URL 기반 라우팅 구현 및 브라우저 히스토리 관리

#### 체크리스트
- [ ] **4.1 라우터 설정**
  - [ ] `src/routes/index.tsx` 생성
    - [ ] `createBrowserRouter` 설정
    - [ ] 라우트 정의 (/, /dashboard, /data-input, etc.)
    - [ ] RootLayout 연결
    - [ ] 각 페이지 라우트 매핑
  - [ ] `AppRouter` 컴포넌트 생성

- [ ] **4.2 Layout 컴포넌트 생성**
  - [ ] `src/layouts/RootLayout.tsx` 생성
    - [ ] Sidebar 포함
    - [ ] `<Outlet />` 설정
    - [ ] 배경 그라디언트 유지

- [ ] **4.3 Sidebar 네비게이션 개선**
  - [ ] `NavLink` import
  - [ ] 모든 메뉴 아이템을 `NavLink`로 변경
  - [ ] `isActive` 상태 자동 관리
  - [ ] 클릭 시 `navigate()` 대신 링크 사용

- [ ] **4.4 컴포넌트 파일 이동**
  - [ ] `src/components/Dashboard.tsx` → `src/pages/DashboardPage.tsx`
  - [ ] `src/components/DataInputPage.tsx` → `src/pages/DataInputPage.tsx`
  - [ ] `src/components/PromptStudioPage.tsx` → `src/pages/PromptStudioPage.tsx`
  - [ ] `src/components/ResultsValidationPage.tsx` → `src/pages/ResultsValidationPage.tsx`
  - [ ] `src/components/DeploymentPage.tsx` → `src/pages/DeploymentPage.tsx`
  - [ ] 모든 import 경로 업데이트

- [ ] **4.5 App.tsx 리팩토링**
  - [ ] 기존 라우팅 로직 제거
  - [ ] `<AppRouter />` 컴포넌트 사용
  - [ ] 불필요한 state 제거

- [ ] **4.6 index.html 업데이트**
  - [ ] `<base href="/">` 추가 (필요 시)

#### 검증 기준
- ✅ URL 변경 시 페이지 전환
- ✅ 브라우저 뒤로가기/앞으로가기 동작
- ✅ 직접 URL 입력 시 페이지 로드
- ✅ 사이드바 active 상태 자동 반영
- ✅ 모든 페이지 정상 렌더링
- ✅ TypeScript 에러 없음

---

### Phase 5: 컴포넌트 분리 및 최적화 ⏱️ 4시간

**목적:** 대형 페이지 컴포넌트를 작은 단위로 분해

#### 체크리스트
- [ ] **5.1 Dashboard 분리**
  - [ ] `src/features/dashboard/` 디렉토리 생성
  - [ ] `components/MetricCard.tsx` 생성
  - [ ] `components/PerformanceChart.tsx` 생성
  - [ ] `components/ModelComparisonChart.tsx` 생성
  - [ ] `components/CostBreakdownChart.tsx` 생성
  - [ ] `components/RadarChart.tsx` 생성
  - [ ] `components/index.ts` (배럴 export)
  - [ ] `hooks/useDashboardData.ts` 이동
  - [ ] `types.ts` 생성
  - [ ] DashboardPage.tsx 리팩토링 (150 라인 이하)

- [ ] **5.2 PromptStudio 분리**
  - [ ] `src/features/prompt-studio/` 디렉토리 생성
  - [ ] `components/TemplateSelector.tsx` 생성
  - [ ] `components/ModelSelector.tsx` 생성
  - [ ] `components/PromptEditor.tsx` 생성
  - [ ] `components/AdvancedSettings.tsx` 생성
  - [ ] `components/PromptHistory.tsx` 생성
  - [ ] `components/index.ts` (배럴 export)
  - [ ] `hooks/usePromptTemplates.ts` 이동
  - [ ] `hooks/useModelSelection.ts` 생성
  - [ ] `types.ts` 생성
  - [ ] PromptStudioPage.tsx 리팩토링 (150 라인 이하)

- [ ] **5.3 DataInput 분리**
  - [ ] `src/features/data-input/` 디렉토리 생성
  - [ ] `components/TextInputTab.tsx` 생성
  - [ ] `components/UrlCrawlerTab.tsx` 생성
  - [ ] `components/FileUploadTab.tsx` 생성
  - [ ] `components/DatabaseTab.tsx` 생성
  - [ ] `components/DataSourceTabs.tsx` 생성
  - [ ] `components/index.ts` (배럴 export)
  - [ ] `hooks/useDataInput.ts` 이동
  - [ ] `types.ts` 생성
  - [ ] DataInputPage.tsx 리팩토링 (150 라인 이하)

- [ ] **5.4 Results 분리**
  - [ ] `src/features/results/` 디렉토리 생성
  - [ ] `components/TestResultCard.tsx` 생성
  - [ ] `components/ComparisonChart.tsx` 생성
  - [ ] `components/ResponseComparison.tsx` 생성
  - [ ] `components/index.ts` (배럴 export)
  - [ ] `hooks/useTestResults.ts` 이동
  - [ ] `types.ts` 생성
  - [ ] ResultsValidationPage.tsx 리팩토링 (150 라인 이하)

- [ ] **5.5 Deployment 분리**
  - [ ] `src/features/deployment/` 디렉토리 생성
  - [ ] `components/ApiKeySection.tsx` 생성
  - [ ] `components/IntegrationTabs.tsx` 생성
  - [ ] `components/CodeExample.tsx` 생성
  - [ ] `components/index.ts` (배럴 export)
  - [ ] `hooks/useDeploymentConfig.ts` 이동
  - [ ] `types.ts` 생성
  - [ ] DeploymentPage.tsx 리팩토링 (150 라인 이하)

- [ ] **5.6 공통 컴포넌트 추출**
  - [ ] `src/components/common/PageHeader.tsx` 생성
  - [ ] `src/components/common/StatsCard.tsx` 생성
  - [ ] `src/components/common/ChartContainer.tsx` 생성
  - [ ] `src/components/common/EmptyState.tsx` 생성
  - [ ] `src/components/common/LoadingSpinner.tsx` 생성

#### 검증 기준
- ✅ 각 페이지 컴포넌트 150 라인 이하
- ✅ 재사용 가능한 컴포넌트 식별 및 추출
- ✅ UI/UX 픽셀 단위 동일
- ✅ 모든 기능 정상 동작
- ✅ TypeScript 에러 없음

---

### Phase 6: 상수 및 설정 관리 ⏱️ 1시간

**목적:** 하드코딩 제거 및 중앙 집중식 설정

#### 체크리스트
- [ ] **6.1 라우트 상수**
  - [ ] `src/constants/routes.ts` 생성
    - [ ] `ROUTES` 객체 정의
    - [ ] 모든 라우트 경로 정의

- [ ] **6.2 네비게이션 설정**
  - [ ] `src/constants/navigation.ts` 생성
    - [ ] `NAVIGATION_ITEMS` 배열 정의
    - [ ] 아이콘, 레이블, 경로 매핑

- [ ] **6.3 모델 설정**
  - [ ] `src/constants/models.ts` 생성
    - [ ] `AI_MODELS` 객체 정의
    - [ ] 모델별 설정 (가격, 속도, 품질)

- [ ] **6.4 차트 설정**
  - [ ] `src/constants/chart.ts` 생성
    - [ ] 차트 색상 팔레트
    - [ ] 기본 차트 옵션

- [ ] **6.5 테마 설정**
  - [ ] `src/constants/theme.ts` 생성
    - [ ] 색상 상수
    - [ ] 스타일 변수

- [ ] **6.6 상수 적용**
  - [ ] 모든 하드코딩된 값을 상수로 교체
  - [ ] Import 경로 업데이트

#### 검증 기준
- ✅ 하드코딩된 문자열/숫자 제거
- ✅ 설정 변경 시 한 곳만 수정
- ✅ TypeScript 에러 없음

---

### Phase 7: 성능 최적화 ⏱️ 1.5시간

**목적:** React 성능 최적화 기법 적용

#### 체크리스트
- [ ] **7.1 메모이제이션 적용**
  - [ ] Dashboard: 차트 데이터 `useMemo`
  - [ ] PromptStudio: 템플릿 필터링 `useMemo`
  - [ ] Results: 비교 데이터 계산 `useMemo`
  - [ ] 이벤트 핸들러 `useCallback`

- [ ] **7.2 Code Splitting**
  - [ ] 각 페이지 컴포넌트 `lazy` import
  - [ ] `Suspense` 래퍼 추가
  - [ ] 로딩 폴백 컴포넌트 생성

- [ ] **7.3 차트 컴포넌트 최적화**
  - [ ] Recharts 컴포넌트 메모이제이션
  - [ ] 데이터 변경 시만 리렌더링

- [ ] **7.4 이미지 최적화**
  - [ ] Lazy loading 적용
  - [ ] ImageWithFallback 최적화

#### 검증 기준
- ✅ React DevTools Profiler로 렌더링 횟수 확인
- ✅ 불필요한 리렌더링 제거
- ✅ 초기 로딩 속도 개선
- ✅ 번들 크기 측정

---

### Phase 8: 유틸리티 및 헬퍼 함수 ⏱️ 1시간

**목적:** 재사용 가능한 유틸리티 함수 구축

#### 체크리스트
- [ ] **8.1 포맷 유틸리티**
  - [ ] `src/utils/format.ts` 생성
    - [ ] `formatCurrency()` 구현
    - [ ] `formatPercentage()` 구현
    - [ ] `formatDuration()` 구현
    - [ ] `formatDate()` 구현

- [ ] **8.2 차트 유틸리티**
  - [ ] `src/utils/chart.ts` 생성
    - [ ] `generateChartColors()` 구현
    - [ ] `formatChartTooltip()` 구현
    - [ ] `processChartData()` 구현

- [ ] **8.3 검증 유틸리티**
  - [ ] `src/utils/validation.ts` 생성
    - [ ] `isValidUrl()` 구현
    - [ ] `isValidApiKey()` 구현
    - [ ] `isValidEmail()` 구현

- [ ] **8.4 문자열 유틸리티**
  - [ ] `src/utils/string.ts` 생성
    - [ ] `truncate()` 구현
    - [ ] `capitalize()` 구현

- [ ] **8.5 유틸리티 적용**
  - [ ] 중복 코드를 유틸리티 함수로 교체
  - [ ] 모든 컴포넌트에 적용

#### 검증 기준
- ✅ 중복 코드 제거
- ✅ 테스트 가능한 순수 함수
- ✅ TypeScript 에러 없음

---

### Phase 9: 접근성 및 UX 개선 ⏱️ 1시간

**목적:** 키보드 네비게이션 및 접근성 강화

#### 체크리스트
- [ ] **9.1 키보드 단축키 추가**
  - [ ] `src/hooks/useKeyboardShortcuts.ts` 생성
  - [ ] Cmd/Ctrl + 1-5로 페이지 전환
  - [ ] 단축키 안내 모달 (선택 사항)

- [ ] **9.2 로딩 상태 추가**
  - [ ] `src/components/common/PageLoader.tsx` 생성
  - [ ] 페이지 전환 시 로딩 표시
  - [ ] 스켈레톤 UI (선택 사항)

- [ ] **9.3 에러 바운더리 추가**
  - [ ] `src/components/ErrorBoundary.tsx` 생성
  - [ ] 에러 폴백 UI 구현
  - [ ] 라우터에 에러 바운더리 적용

- [ ] **9.4 접근성 개선**
  - [ ] ARIA 레이블 추가
  - [ ] 포커스 표시 개선
  - [ ] 키보드 네비게이션 테스트

#### 검증 기준
- ✅ 키보드만으로 모든 기능 접근 가능
- ✅ 로딩 상태 명확히 표시
- ✅ 에러 발생 시 앱 크래시 방지
- ✅ 접근성 검사 통과

---

### Phase 10: 문서화 및 정리 ⏱️ 1시간

**목적:** 코드 이해도 향상 및 유지보수성 확보

#### 체크리스트
- [ ] **10.1 JSDoc 주석 추가**
  - [ ] 모든 커스텀 훅에 JSDoc
  - [ ] 유틸리티 함수에 JSDoc
  - [ ] 복잡한 컴포넌트에 설명 추가

- [ ] **10.2 README 업데이트**
  - [ ] 프로젝트 구조 섹션 추가
  - [ ] 개발 가이드 추가
  - [ ] 컴포넌트 규칙 추가
  - [ ] 상태 관리 패턴 설명

- [ ] **10.3 CLAUDE.md 업데이트**
  - [ ] 새로운 디렉토리 구조 반영
  - [ ] React Router 사용법 추가
  - [ ] Context API 패턴 설명
  - [ ] Feature 기반 구조 설명

- [ ] **10.4 코드 정리**
  - [ ] 미사용 import 제거
  - [ ] 주석 정리
  - [ ] 코드 포맷팅

#### 검증 기준
- ✅ 모든 public API에 JSDoc
- ✅ README 최신 상태 유지
- ✅ CLAUDE.md 완전 업데이트
- ✅ 코드 품질 체크 통과

---

### Phase 11: 테스트 및 검증 ⏱️ 2시간

**목적:** 리팩토링 결과 검증 및 품질 보증

#### 체크리스트
- [ ] **11.1 기능 테스트**
  - [ ] 모든 페이지 정상 렌더링 확인
  - [ ] 사이드바 네비게이션 동작 테스트
  - [ ] 모드 전환 (Beginner ↔ Expert) 테스트
  - [ ] 차트 인터랙션 테스트
  - [ ] 폼 입력 및 제출 테스트
  - [ ] 브라우저 히스토리 네비게이션 테스트
  - [ ] URL 직접 입력 테스트

- [ ] **11.2 UI/UX 검증**
  - [ ] 각 페이지 스크린샷 비교
  - [ ] 레이아웃 일치 확인
  - [ ] 애니메이션 및 트랜지션 보존 확인
  - [ ] 반응형 레이아웃 테스트
  - [ ] 색상 및 스타일 일치 확인

- [ ] **11.3 성능 테스트**
  - [ ] Lighthouse 점수 측정
  - [ ] 번들 크기 비교
  - [ ] 초기 로딩 속도 측정
  - [ ] 페이지 전환 속도 측정

- [ ] **11.4 코드 품질 검증**
  - [ ] `npm run build` 실행 및 에러 확인
  - [ ] TypeScript 컴파일 에러 0개
  - [ ] 콘솔 에러/경고 0개
  - [ ] ESLint 검사 (설치 시)

- [ ] **11.5 브라우저 호환성 테스트**
  - [ ] Chrome 테스트
  - [ ] Firefox 테스트
  - [ ] Safari 테스트 (macOS)
  - [ ] Edge 테스트

#### 검증 기준
- ✅ 모든 기능 정상 동작
- ✅ UI/UX 100% 동일
- ✅ TypeScript 에러 0개
- ✅ 콘솔 경고 0개
- ✅ 번들 크기 동일하거나 감소
- ✅ 성능 저하 없음

---

## 📁 최종 디렉토리 구조

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
│   │   ├── components/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── PerformanceChart.tsx
│   │   │   ├── ModelComparisonChart.tsx
│   │   │   ├── CostBreakdownChart.tsx
│   │   │   ├── RadarChart.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   └── useDashboardData.ts
│   │   └── types.ts
│   ├── data-input/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types.ts
│   ├── prompt-studio/
│   ├── results/
│   └── deployment/
│
├── components/                     # 공통 컴포넌트
│   ├── common/                     # 범용 컴포넌트
│   │   ├── PageHeader.tsx
│   │   ├── StatsCard.tsx
│   │   ├── ChartContainer.tsx
│   │   ├── EmptyState.tsx
│   │   └── LoadingSpinner.tsx
│   ├── Sidebar.tsx                 # 글로벌 사이드바
│   ├── ErrorBoundary.tsx
│   ├── ui/                         # shadcn/ui 컴포넌트 (46개)
│   └── figma/
│
├── layouts/                        # 레이아웃 컴포넌트
│   └── RootLayout.tsx
│
├── routes/                         # 라우팅 설정
│   └── index.tsx
│
├── contexts/                       # Context API
│   └── UserModeContext.tsx
│
├── hooks/                          # 커스텀 훅
│   ├── useDashboardData.ts
│   ├── usePromptTemplates.ts
│   ├── useDataInput.ts
│   ├── useTestResults.ts
│   ├── useDeploymentConfig.ts
│   └── useKeyboardShortcuts.ts
│
├── types/                          # 타입 정의
│   ├── common.ts
│   ├── dashboard.ts
│   ├── prompt.ts
│   ├── data-input.ts
│   ├── results.ts
│   └── deployment.ts
│
├── data/                           # Mock 데이터 (추후 API 대체)
│   ├── mockDashboard.ts
│   ├── mockPrompts.ts
│   ├── mockDataInput.ts
│   ├── mockResults.ts
│   └── mockDeployment.ts
│
├── constants/                      # 상수 및 설정
│   ├── routes.ts
│   ├── navigation.ts
│   ├── models.ts
│   ├── chart.ts
│   └── theme.ts
│
├── utils/                          # 유틸리티 함수
│   ├── format.ts
│   ├── chart.ts
│   ├── validation.ts
│   └── string.ts
│
├── styles/                         # 스타일 파일
├── guidelines/                     # 디자인 가이드라인
├── App.tsx                         # 루트 컴포넌트 (간소화)
├── main.tsx                        # 진입점
└── index.css                       # 전역 스타일
```

---

## 🎯 예상 결과

### 코드 품질 지표
- ✅ 평균 컴포넌트 크기: 400+ 라인 → 100-150 라인
- ✅ Props drilling 깊이: 3단계 → 0단계
- ✅ 타입 안전성: 부분적 → 100%
- ✅ 코드 재사용성: 낮음 → 높음
- ✅ 테스트 가능성: 낮음 → 높음

### 개발자 경험
- ✅ URL 기반 네비게이션 (북마크, 공유 가능)
- ✅ 컴포넌트 단위 개발 가능
- ✅ 명확한 관심사 분리
- ✅ 쉬운 유닛 테스트 작성
- ✅ 빠른 신규 기능 추가

### 확장성
- ✅ 새 페이지 추가: 라우트 설정만으로 가능
- ✅ API 연동: 훅만 수정하면 됨
- ✅ 상태 관리 확장: Context 추가로 대응
- ✅ 다국어 지원 준비: i18n 통합 용이
- ✅ 테스트 추가: 각 레이어 독립적 테스트

---

## 🚨 리스크 관리

### 잠재적 문제점
1. **스타일 깨짐**: Tailwind 클래스 이동 시 누락
2. **상태 동기화**: Context로 전환 시 초기값 불일치
3. **라우팅 오류**: URL 경로 오타
4. **번들 크기 증가**: React Router 추가로 인한 증가

### 완화 전략
1. ✅ Phase별 기능 테스트 필수
2. ✅ Git 커밋 단위를 작게 유지
3. ✅ UI 스크린샷 비교로 검증
4. ✅ Code Splitting으로 번들 크기 최적화

---

## 📝 작업 노트

### 진행 중 메모
-

### 발견된 이슈
-

### 개선 아이디어
-

---

## 📌 Phase 완료 체크리스트

각 Phase 완료 후 다음 항목을 확인하세요:

- [ ] TypeScript 컴파일 성공
- [ ] 모든 페이지 정상 렌더링
- [ ] 콘솔 에러/경고 0개
- [ ] UI/UX 동일성 확인
- [ ] Git 커밋 완료 (커밋 메시지: `feat(phase-X): 설명`)

---

## 🎉 최종 검증 시나리오

리팩토링 완료 후 다음 시나리오를 테스트하세요:

### 1. 사용자 플로우 테스트
- [ ] 대시보드 진입
- [ ] 데이터 입력 페이지로 이동
- [ ] 프롬프트 작성
- [ ] 결과 확인
- [ ] 배포 설정
- [ ] 모드 전환 (Beginner ↔ Expert)
- [ ] 브라우저 뒤로가기/앞으로가기

### 2. 시각적 회귀 테스트
- [ ] 모든 페이지 스크린샷 비교
- [ ] 반응형 레이아웃 확인 (모바일, 태블릿, 데스크톱)
- [ ] 다크 테마 일관성 확인

### 3. 성능 테스트
- [ ] Lighthouse 점수 (목표: 90+)
- [ ] 번들 크기 (목표: 이전과 동일하거나 감소)
- [ ] 초기 로딩 속도 (목표: 3초 이내)
- [ ] 페이지 전환 속도 (목표: 즉시)

---

## 📊 성과 측정

### Before (리팩토링 전)
- 평균 컴포넌트 크기: 410 라인
- Props drilling 깊이: 3단계
- 타입 커버리지: 약 60%
- 재사용 가능 컴포넌트: 5개
- 번들 크기: _____ KB

### After (리팩토링 후)
- 평균 컴포넌트 크기: _____ 라인
- Props drilling 깊이: _____ 단계
- 타입 커버리지: _____ %
- 재사용 가능 컴포넌트: _____ 개
- 번들 크기: _____ KB

---

**마지막 업데이트:** 2025-10-28
**담당자:** Claude Code
**상태:** 준비 완료
