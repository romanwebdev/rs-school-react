import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../Pagination';
import Results from '../Results';
import Search from '../Search';
import SelectedItems from '../SelectedItems';
import styles from './Main.module.css';

export default function Main() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';

  function closeDetails() {
    router.push(`/?${searchParams.toString()}`);
  }

  return (
    <div className={styles.main}>
      <div
        className={`${currentPath.includes('details') ? styles.overlay : ''}`}
        data-testid="overlay"
        onClick={closeDetails}
      ></div>
      <div className={styles.container}>
        <h1>Star Wars Charachters</h1>
        <Search />
        <Results />
        <Pagination />
        <div className={styles.selectedItemsWrap}>
          <SelectedItems />
        </div>
      </div>
    </div>
  );
}
