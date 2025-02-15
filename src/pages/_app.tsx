import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context';
import { store } from '../store';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
