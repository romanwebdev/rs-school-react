import { memo } from 'react';
import { ICountry } from '../types/country.type';

function Card({ country }: { country: ICountry }) {
  return (
    <div className="card">
      <h2>{country.name.common}</h2>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Flag: {country.flag}</p>
    </div>
  );
}

export default memo(Card);
