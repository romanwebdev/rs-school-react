import { ICountry } from '../types/country.type';
import Card from './Card';

export default function Cards({ countries }: { countries: ICountry[] }) {
  console.log(countries);
  return (
    <div className="cards">
      {countries.map((country) => (
        <Card key={country.flag} country={country} />
      ))}
    </div>
  );
}
