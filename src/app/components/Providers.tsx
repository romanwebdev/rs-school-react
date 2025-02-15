import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context';
import { store } from '../../store';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
