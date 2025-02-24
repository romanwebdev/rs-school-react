import CardList from '../CardList';
import { ErrorBoundary } from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback';
import styles from './Results.module.css';

export default function Results() {
  return (
    <div className={styles.resultsWrap}>
      <h2 className={styles.title}>Results</h2>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <CardList />
      </ErrorBoundary>
    </div>
  );
}
