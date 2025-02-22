import { ICountry } from '../types/country.type';

export default function Card({ country }: { country: ICountry }) {
  return (
    <div className="card">
      <h2>{country.name.official}</h2>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Flag: {country.flag}</p>
    </div>
  );
}
