import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { ROUTES } from '@/constants';

// Lazy load page components for code splitting
const AgentListPage = lazy(() =>
  import('@/pages/AgentListPage').then((module) => ({
    default: module.AgentListPage,
  }))
);
const AgentDashboardPage = lazy(() =>
  import('@/pages/AgentDashboardPage').then((module) => ({
    default: module.AgentDashboardPage,
  }))
);
const IntegratedAnalyticsPage = lazy(() =>
  import('@/pages/IntegratedAnalyticsPage').then((module) => ({
    default: module.IntegratedAnalyticsPage,
  }))
);
const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  }))
);
const DataInputPage = lazy(() =>
  import('@/pages/DataInputPage').then((module) => ({
    default: module.DataInputPage,
  }))
);
const RagSettingsPage = lazy(() =>
  import('@/pages/RagSettingsPage').then((module) => ({
    default: module.RagSettingsPage,
  }))
);
const PromptStudioPage = lazy(() =>
  import('@/pages/PromptStudioPage').then((module) => ({
    default: module.PromptStudioPage,
  }))
);
const PromptHistoryDetailPage = lazy(() =>
  import('@/pages/PromptHistoryDetailPage').then((module) => ({
    default: module.PromptHistoryDetailPage,
  }))
);
const TestSetDetailPage = lazy(() =>
  import('@/pages/TestSetDetailPage').then((module) => ({
    default: module.TestSetDetailPage,
  }))
);
const ResultsValidationPage = lazy(() =>
  import('@/pages/ResultsValidationPage').then((module) => ({
    default: module.ResultsValidationPage,
  }))
);
const DeploymentPage = lazy(() =>
  import('@/pages/DeploymentPage').then((module) => ({
    default: module.DeploymentPage,
  }))
);
const PlaygroundPage = lazy(() =>
  import('@/pages/PlaygroundPage').then((module) => ({
    default: module.PlaygroundPage,
  }))
);

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  );
}

// Wrapper component with Suspense
function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.AGENTS} replace />,
      },
      // Agent routes
      {
        path: ROUTES.AGENTS.slice(1),
        element: (
          <SuspenseWrapper>
            <AgentListPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'agents/:agentId', // Dynamic route for agent dashboard
        element: (
          <SuspenseWrapper>
            <AgentDashboardPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.ANALYTICS.slice(1),
        element: (
          <SuspenseWrapper>
            <IntegratedAnalyticsPage />
          </SuspenseWrapper>
        ),
      },
      // Legacy dashboard route (kept for backward compatibility)
      {
        path: ROUTES.DASHBOARD.slice(1),
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
      // Other routes
      {
        path: ROUTES.DATA_INPUT.slice(1),
        element: (
          <SuspenseWrapper>
            <DataInputPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.RAG_SETTINGS.slice(1),
        element: (
          <SuspenseWrapper>
            <RagSettingsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.PROMPT_STUDIO.slice(1),
        element: (
          <SuspenseWrapper>
            <PromptStudioPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'prompt-studio/history/:id',
        element: (
          <SuspenseWrapper>
            <PromptHistoryDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'prompt-studio/test-set/:testSetId',
        element: (
          <SuspenseWrapper>
            <TestSetDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.RESULTS.slice(1),
        element: (
          <SuspenseWrapper>
            <ResultsValidationPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.DEPLOYMENT.slice(1),
        element: (
          <SuspenseWrapper>
            <DeploymentPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.PLAYGROUND.slice(1),
        element: (
          <SuspenseWrapper>
            <PlaygroundPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);
