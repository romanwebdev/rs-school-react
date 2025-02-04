import { useState } from 'react';
import styles from './Search.module.css';

type SearchProps = {
  setSavedQuery: (query: string) => void;
  savedQuery: string;
  setPage: (page: number) => void;
};

const FIRST_PAGE = 1;

export default function Search({
  savedQuery,
  setSavedQuery,
  setPage,
}: SearchProps) {
  const [query, setQuery] = useState(savedQuery);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleSearch() {
    setSavedQuery(query);
    setPage(FIRST_PAGE);
  }

  return (
    <div className={styles.searchWrap}>
      <input onChange={handleChange} value={query} className={styles.input} />
      <button onClick={handleSearch} className={styles.btn}>
        Search
      </button>
    </div>
  );
}
