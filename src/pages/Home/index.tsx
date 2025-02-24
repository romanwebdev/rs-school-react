import { Provider } from 'react-redux';
import { Outlet } from 'react-router';
import Header from '../../components/Header';
import Main from '../../components/Main';
import { ThemeProvider } from '../../context';
import { store } from '../../store';
import styles from './Home.module.css';

export default function Home() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <div className={styles.home} data-testid="home">
          <div className={styles.mainWrap}>
            <Header />
            <Main />
          </div>
          <Outlet />
        </div>
      </Provider>
    </ThemeProvider>
  );
}
