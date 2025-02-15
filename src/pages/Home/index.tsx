import { Outlet } from 'react-router';
import Header from '../../components/Header';
import Main from '../../components/Main';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.home} data-testid="home">
      <div className={styles.mainWrap}>
        <Header />
        <Main />
      </div>
      <Outlet />
    </div>
  );
}
