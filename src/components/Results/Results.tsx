import { Component } from 'react';
import { IPerson } from '../../types/person.type';
import { ErrorBoundary } from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback';
import Spinner from '../Spinner/Spinner';
import Table from '../Table/Table';
import styles from './Results.module.css';

type ResultsProps = {
  data: IPerson[];
  isLoading: boolean;
  hasError: boolean;
};

type ResultsState = {
  data: IPerson[];
  isLoading: boolean;
  hasError: boolean;
};

export default class Results extends Component<ResultsState, ResultsProps> {
  constructor(props: ResultsProps) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      hasError: false,
    };
  }

  componentDidUpdate(prevProps: ResultsProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }

    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({ isLoading: this.props.isLoading });
    }

    if (prevProps.hasError !== this.props.hasError) {
      this.setState({ hasError: this.props.hasError });
    }
  }

  render() {
    return (
      <main className={styles.resultsWrap}>
        <h2 className={styles.title}>Results</h2>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Table data={this.state.data} hasError={this.state.hasError} />
          </ErrorBoundary>
        )}
      </main>
    );
  }
}
