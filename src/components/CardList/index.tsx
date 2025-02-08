import { useQueryParams } from '../../hooks';
import { useGetCharactersQuery } from '../../store/star-wars-api';
import Card from '../Card';
import Spinner from '../Spinner';
import styles from './CardList.module.css';

export default function CardList() {
  const { page, search } = useQueryParams();
  const { data, isLoading, isFetching } = useGetCharactersQuery({
    page,
    search,
  });

  if (isLoading || isFetching) return <Spinner />;

  return (
    <>
      {data && (data.results ?? []).length ? (
        <div className={styles.cardList}>
          {data.results.map((character) => (
            <Card character={character} key={character.name} />
          ))}
        </div>
      ) : (
        <p>Nothing found</p>
      )}
    </>
  );
}
