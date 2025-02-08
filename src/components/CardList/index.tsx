import { IPerson } from '../../types/person.type';
import Card from '../Card';
import styles from './CardList.module.css';

type TableProps = {
  data: IPerson[];
};

export default function CardList({ data = [] }: TableProps) {
  return (
    <>
      {data.length ? (
        <div className={styles.cardList}>
          {data.map((person) => (
            <Card name={person.name} url={person.url} key={person.name} />
          ))}
        </div>
      ) : (
        <p>Nothing found</p>
      )}
    </>
  );
}
