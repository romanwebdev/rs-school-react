import { useState } from 'react';
import { ICountry } from '../types/country.type';

export const useVisitedCountries = (country: ICountry) => {
  const savedCountries = JSON.parse(localStorage.getItem('countries') ?? '[]');
  const isVisited = savedCountries.find(
    (c: string) => c === country.name.official
  );

  const [visited, setVisited] = useState(isVisited);
  const higlightClass = visited ? 'highlight' : '';

  const toggleVisitStatus = () => {
    const countries = JSON.parse(localStorage.getItem('countries') ?? '[]');

    if (visited) {
      const filteredCountries = countries.filter(
        (c: string) => c !== country.name.official
      );
      localStorage.setItem('countries', JSON.stringify(filteredCountries));
    } else {
      localStorage.setItem(
        'countries',
        JSON.stringify([...countries, country.name.official])
      );
    }

    setVisited(!visited);
  };

  return { higlightClass, toggleVisitStatus };
};
