import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import Details from './components/Details/Details.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';
import NotFound from './pages/NotFound/NotFound.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <ErrorBoundary fallback={<p>Application is broken</p>}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="details/:id" element={<Details />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </StrictMode>
  );
}
