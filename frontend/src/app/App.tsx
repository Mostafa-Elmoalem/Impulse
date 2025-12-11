// src/app/App.tsx
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  );
}