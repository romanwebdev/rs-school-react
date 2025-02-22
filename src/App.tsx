import Actions from './components/Actions';
import Cards from './components/Cards';
import Spinner from './components/Spinner';
import { useCountries } from './hooks/use-countries';

function App() {
  const { isLoading, countries } = useCountries();

  return (
    <main>
      <h1>Performance App</h1>
      <Actions />
      {isLoading ? <Spinner /> : <Cards countries={countries} />}
    </main>
  );
}

export default App;
