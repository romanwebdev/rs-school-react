import { useEffect, useState } from 'react';
import { useQueryParams, useUpdateSearchParams } from '../../hooks';
import { useGetCharactersQuery } from '../../store/star-wars-api';
import styles from './Pagination.module.css';

const ITEMS_PER_PAGE = 10;
const PAGE = 1;

export default function Pagination() {
  const { page, search } = useQueryParams();
  const [currentPage, setCurrentPage] = useState(PAGE);
  const [pages, setPages] = useState<number[]>([]);
  const { data, isLoading, isFetching } = useGetCharactersQuery({
    page,
    search,
  });
  const updateSearchParams = useUpdateSearchParams();

  useEffect(() => {
    setCurrentPage(+page);
  }, [page]);

  useEffect(() => {
    if (data && data.count) {
      const pagesCount = Math.ceil(data.count / ITEMS_PER_PAGE);
      const pagesArray = Array.from(Array(pagesCount).keys());

      setPages(pagesArray);
    }
  }, [data]);

  const changePage = (newPage: number) => {
    updateSearchParams(newPage.toString(), search);
  };

  return (
    <>
      {!isLoading && !isFetching && (
        <div className={styles.pagination}>
          {pages.map((page) => (
            <button
              onClick={() => changePage(page + 1)}
              className={
                styles.page +
                (page === currentPage - 1 ? ` ${styles.active}` : '')
              }
              key={page}
              disabled={page === currentPage - 1}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
