import { Component } from 'react';
import { searchItems } from './api/searchItems';
import './App.css';
import ErrorAction from './components/ErrorAction/ErrorAction';
import Results from './components/Results/Results';
import Search from './components/Search/Search';
import { IPerson } from './types/person.type';

type AppState = {
  data: IPerson[];
  savedQuery: string;
  isLoading: boolean;
  hasError: boolean;
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      data: [],
      savedQuery: '',
      isLoading: true,
      hasError: false,
    };

    this.search = this.search.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount(): void {
    const savedQuery = localStorage.getItem('query') ?? '';

    this.setState({
      savedQuery,
    });
    this.search(savedQuery);
  }

  async search(query: string) {
    this.setState({ isLoading: true, hasError: false });
    localStorage.setItem('query', query);

    try {
      const response = await searchItems(query);
      if (response) {
        this.setState({ data: response.results });
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  showError() {
    this.setState({ hasError: true });
  }

  render() {
    return (
      <div className="container">
        <h1>Star Wars Charachters</h1>
        <Search search={this.search} savedQuery={this.state.savedQuery} />
        <Results
          data={this.state.data}
          isLoading={this.state.isLoading}
          hasError={this.state.hasError}
        />
        <ErrorAction showError={this.showError} />
      </div>
    );
  }
}

export default App;
