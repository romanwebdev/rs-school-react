import { useEffect, useState } from 'react';
import Cards from './components/Cards';
import Spinner from './components/Spinner';
import { ICountry } from './types/country.type';

function App() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: put it in custom hook
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(import.meta.env.VITE_API_URL);
        const json = await response.json();

        if (json) {
          setCountries(json);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Performance App</h1>
      {isLoading ? <Spinner /> : <Cards countries={countries} />}
    </main>
  );
}

export default App;
