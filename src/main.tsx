import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomeLayout from './components/HomeLayout.tsx';
import './index.css';
import Main from './pages/Main.tsx';
import ReactHookForm from './pages/ReactHookForm.tsx';
import UncontrolledFormPage from './pages/UncontrolledFormPage.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Main />} />
            <Route
              path="/uncontrolled-form"
              element={<UncontrolledFormPage />}
            />
            <Route path="/react-hook-form" element={<ReactHookForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
