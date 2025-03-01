import { useEffect, useState } from 'react';
import { useQueryParams, useUpdateSearchParams } from '../../hooks';
import styles from './Pagination.module.css';

const ITEMS_PER_PAGE = 10;
const PAGE = 1;

export default function Pagination({ count }: { count: number }) {
  const { page, search } = useQueryParams();
  const [currentPage, setCurrentPage] = useState(PAGE);
  const [pages, setPages] = useState<number[]>([]);

  const updateSearchParams = useUpdateSearchParams();

  useEffect(() => {
    setCurrentPage(+page);
  }, [page]);

  useEffect(() => {
    if (count) {
      const pagesCount = Math.ceil(count / ITEMS_PER_PAGE);
      const pagesArray = Array.from(Array(pagesCount).keys());

      setPages(pagesArray);
    }
  }, [count]);

  const changePage = (newPage: number) => {
    updateSearchParams(newPage.toString(), search);
  };

  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <button
          onClick={() => changePage(page + 1)}
          className={
            styles.page + (page === currentPage - 1 ? ` ${styles.active}` : '')
          }
          key={page}
          disabled={page === currentPage - 1}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
}
