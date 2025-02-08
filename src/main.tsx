import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import Routing from './components/Routing.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary fallback={<p>Application is broken</p>}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}
