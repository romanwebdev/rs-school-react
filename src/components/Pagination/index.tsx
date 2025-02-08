import styles from './Pagination.module.css';

const ITEMS_PER_PAGE = 10;

type PaginationProps = {
  itemsCount: number;
  setPage: (page: number) => void;
  currentPage: number;
  isLoading: boolean;
};

export default function Pagination({
  itemsCount,
  setPage,
  currentPage,
  isLoading,
}: PaginationProps) {
  const pagesCount = Math.ceil(itemsCount / ITEMS_PER_PAGE);
  const pages = Array.from(Array(pagesCount).keys());

  return (
    <div className={styles.pagination}>
      {!isLoading &&
        pages.map((page) => (
          <button
            onClick={() => setPage(page + 1)}
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
  );
}
