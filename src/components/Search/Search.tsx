import { Component } from 'react';
import styles from './Search.module.css';

type SearchState = {
  query: string;
};

type SearchProps = {
  search: (data: string) => void;
  savedQuery: string;
};

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      query: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidUpdate(prevProps: SearchProps) {
    if (prevProps.savedQuery !== this.props.savedQuery) {
      this.setState({ query: this.props.savedQuery });
    }
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      query: e.target.value,
    });
  }

  handleSearch() {
    this.props.search(this.state.query);
  }

  render() {
    return (
      <div className={styles.searchWrap}>
        <input
          onChange={this.handleChange}
          value={this.state.query}
          className={styles.input}
        />
        <button onClick={this.handleSearch} className={styles.btn}>
          Search
        </button>
      </div>
    );
  }
}
