import { ICharacter } from '../../types/character.type';
import CardList from '../CardList';
import { ErrorBoundary } from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback';
import Spinner from '../Spinner';
import styles from './Results.module.css';

type ResultsProps = {
  data: ICharacter[];
  isLoading: boolean;
};

export default function Results({ data, isLoading }: ResultsProps) {
  return (
    <div className={styles.resultsWrap}>
      <h2 className={styles.title}>Results</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <CardList data={data} />
        </ErrorBoundary>
      )}
    </div>
  );
}
