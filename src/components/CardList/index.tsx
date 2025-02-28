import { useLoader } from '../../hooks';
import { ICharacter } from '../../types/character.type';
import Card from '../Card';
import Spinner from '../UI/Spinner';
import styles from './CardList.module.css';

export default function CardList({ characters }: { characters: ICharacter[] }) {
  const { loading, isDetailsOpen } = useLoader();

  if (loading && !isDetailsOpen) return <Spinner />;

  return (
    <>
      {characters && characters.length ? (
        <div className={styles.cardList}>
          {characters.map((character) => (
            <Card character={character} key={character.name} />
          ))}
        </div>
      ) : (
        <p>Nothing found</p>
      )}
    </>
  );
}
