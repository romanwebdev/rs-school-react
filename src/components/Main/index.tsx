import { useLocation, useNavigate, useSearchParams } from 'react-router';
import Pagination from '../Pagination';
import Results from '../Results';
import Search from '../Search';
import SelectedItems from '../SelectedItems';
import { ICharacter } from './../../types/character.type';
import styles from './Main.module.css';

export default function Main({
  characters,
  count,
}: {
  characters: ICharacter[];
  count: number;
}) {
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
        <Results characters={characters} />
        <Pagination count={count} />
        <div className={styles.selectedItemsWrap}>
          <SelectedItems />
        </div>
      </div>
    </div>
  );
}
