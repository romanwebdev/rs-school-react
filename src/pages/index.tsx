import { useSearchParams } from 'next/navigation';
import Details from '../components/Details';
import Header from '../components/Header';
import Main from '../components/Main';
import styles from '../styles/Home.module.css';

export default function Home() {
  const searchParams = useSearchParams();
  const hasDetails = !!searchParams.get('details');

  return (
    <div className={styles.home} data-testid="home">
      <div className={styles.mainWrap}>
        <Header />
        <Main />
      </div>
      {hasDetails && <Details />}
    </div>
  );
}
