import { useLocation, useNavigate, useSearchParams } from 'react-router';
import Pagination from '../Pagination';
import Results from '../Results';
import Search from '../Search';
import SelectedItems from '../SelectedItems';
import styles from './Main.module.css';

export default function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function closeDetails() {
    navigate({
      pathname: `/`,
      search: searchParams.toString(),
    });
  }

  return (
    <div className={styles.main}>
      <div
        className={`${location.pathname.includes('details') ? styles.overlay : ''}`}
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
