import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { ROUTES } from '@/constants';

// Lazy load page components for code splitting
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
const PromptStudioPage = lazy(() =>
  import('@/pages/PromptStudioPage').then((module) => ({
    default: module.PromptStudioPage,
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
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        path: ROUTES.DASHBOARD.slice(1), // Remove leading slash for nested route
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.DATA_INPUT.slice(1),
        element: (
          <SuspenseWrapper>
            <DataInputPage />
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
    ],
  },
]);
