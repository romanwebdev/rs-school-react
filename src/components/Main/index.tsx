import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { fetchItems } from '../../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ICharacter } from '../../types/character.type';
import Pagination from '../Pagination';
import Results from '../Results';
import Search from '../Search';
import SelectedItems from '../SelectedItems';
import styles from './Main.module.css';

const ITEMS_COUNT = 0;
const PAGE = 1;

type MainProps = {
  data: ICharacter[];
  setData: (data: ICharacter[]) => void;
};

export default function Main({ data, setData }: MainProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [savedQuery, setSavedQuery] = useLocalStorage('query', '');
  const [itemsCount, setItemsCount] = useState(ITEMS_COUNT);
  const [page, setPage] = useState(PAGE);
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  useEffect(() => {
    const search = async (query: string) => {
      setIsLoading(true);
      setPage(page);
      setSavedQuery(query);

      try {
        const response = await fetchItems(query, page);
        if (response) {
          setData(response.results);
          setItemsCount(response.count);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    search(savedQuery);
  }, [savedQuery, page, setData, setSavedQuery]);

  function closeDetails() {
    navigate(`/`);
  }

  return (
    <div className={styles.main} onClick={closeDetails}>
      <div
        className={`${location.pathname.includes('details') ? styles.detailsOpen : ''}`}
        data-testid="overlay"
      ></div>
      <div className="container">
        <h1>Star Wars Charachters</h1>
        <Search
          savedQuery={savedQuery}
          setSavedQuery={setSavedQuery}
          setPage={setPage}
        />
        <Results data={data} isLoading={isLoading} />
        <Pagination
          itemsCount={itemsCount}
          setPage={setPage}
          currentPage={page}
          isLoading={isLoading}
        />

        <div className={styles.selectedItemsWrap}>
          <SelectedItems />
        </div>
      </div>
    </div>
  );
}
