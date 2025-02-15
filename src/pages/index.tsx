import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.home} data-testid="home">
      <div className={styles.mainWrap}>
        <h1>Home Page</h1>
        {/* <Header />
        <Main /> */}
      </div>
      {/* <Outlet /> */}
    </div>
  );
}
