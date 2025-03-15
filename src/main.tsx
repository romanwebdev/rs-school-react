import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomeLayout from './components/HomeLayout.tsx';
import './index.css';
import Main from './pages/Main.tsx';
import ReactHookFormPage from './pages/ReactHookFormPage.tsx';
import UncontrolledFormPage from './pages/UncontrolledFormPage.tsx';
import { store } from './store/index.ts';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Main />} />
              <Route
                path="/uncontrolled-form"
                element={<UncontrolledFormPage />}
              />
              <Route path="/react-hook-form" element={<ReactHookFormPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}
