import { memo } from 'react';
import { useVisitedCountries } from '../hooks/use-visited-countries';
import { ICountry } from '../types/country.type';

function Card({ country }: { country: ICountry }) {
  const { higlightClass, toggleVisitStatus } = useVisitedCountries(country);

  const handleClick = () => {
    toggleVisitStatus();
  };

  return (
    <div className={'card ' + higlightClass} onClick={handleClick}>
      <h2>{country.name.common}</h2>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Flag: {country.flag}</p>
    </div>
  );
}

export default memo(Card);
