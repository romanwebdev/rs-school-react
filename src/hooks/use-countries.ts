import { useContext, useEffect, useMemo, useState } from 'react';
import { ActionsContext } from '../context';
import { filterCountries } from '../utils/filter-countries';

export const useCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const { region, sortType, search } = useContext(ActionsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(import.meta.env.VITE_API_URL, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
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

  const visibleCountries = useMemo(
    () => filterCountries(countries, region, sortType, search),
    [countries, region, sortType, search]
  );

  return { isLoading, countries: visibleCountries };
};
