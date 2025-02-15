import { useEffect, useState } from 'react';
import { useQueryParams, useUpdateSearchParams } from '../../../hooks';
import Button from '../UI/Button';
import styles from './Search.module.css';

const FIRST_PAGE = 1;

export default function Search() {
  const { search } = useQueryParams();
  const [query, setQuery] = useState('');
  const updateSearchParams = useUpdateSearchParams();

  useEffect(() => {
    setQuery(search);
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    updateSearchParams(FIRST_PAGE.toString(), query);
  };

  return (
    <div className={styles.searchWrap}>
      <input onChange={handleChange} value={query} className={styles.input} />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
