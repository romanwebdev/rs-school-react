import { ICharacter } from '../../types/character.type';
import Card from '../Card';
import styles from './CardList.module.css';

type TableProps = {
  data: ICharacter[];
};

export default function CardList({ data = [] }: TableProps) {
  return (
    <>
      {data.length ? (
        <div className={styles.cardList}>
          {data.map((character) => (
            <Card
              character={character}
              url={character.url}
              key={character.name}
            />
          ))}
        </div>
      ) : (
        <p>Nothing found</p>
      )}
    </>
  );
}
