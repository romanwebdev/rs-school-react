import { ICharacter } from '../../types/character.type';
import Card from '../Card';
import styles from './CardList.module.css';

export default function CardList({ characters }: { characters: ICharacter[] }) {
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
