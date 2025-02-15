import Header from '../components/Header';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.home} data-testid="home">
      <div className={styles.mainWrap}>
        <Header />
        {/* <Main /> */}
      </div>
      {/* <Outlet /> */}
    </div>
  );
}
