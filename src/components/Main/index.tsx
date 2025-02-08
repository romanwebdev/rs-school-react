import { useLocation } from 'react-router';
import Pagination from '../Pagination';
import Results from '../Results';
import Search from '../Search';
import SelectedItems from '../SelectedItems';
import styles from './Main.module.css';

export default function Main() {
  const location = useLocation();

  function closeDetails() {
    // navigate(`/`); // TODO: fix later
  }

  return (
    <div className={styles.main} onClick={closeDetails}>
      <div
        className={`${location.pathname.includes('details') ? styles.detailsOpen : ''}`}
        data-testid="overlay"
      ></div>
      <div className="container">
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
