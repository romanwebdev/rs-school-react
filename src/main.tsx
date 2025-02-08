import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import Routing from './components/Routing.tsx';
import './index.css';
import { store } from './store/index.ts';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary fallback={<p>Application is broken</p>}>
        <BrowserRouter>
          <Provider store={store}>
            <Routing />
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}
