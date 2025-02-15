import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ThemeProvider } from '../context';
import { store } from '../store';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<p>Application is broken</p>}>
      <ThemeProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
