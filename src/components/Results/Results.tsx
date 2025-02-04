import { IPerson } from '../../types/person.type';
import CardList from '../CardList/CardList';
import { ErrorBoundary } from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback/ErrorFallback';
import Spinner from '../Spinner/Spinner';
import styles from './Results.module.css';

type ResultsProps = {
  data: IPerson[];
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
