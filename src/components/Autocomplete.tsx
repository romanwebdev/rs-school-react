import { useRef, useState } from 'react';

const countries = [
  'United States',
  'Canada',
  'Mexico',
  'Brazil',
  'Argentina',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'United Kingdom',
  'China',
  'Japan',
  'South Korea',
  'India',
  'Australia',
];

export default function Autocomplete() {
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    if (inputRef.current && inputRef.current.value) {
      const value = inputRef.current.value;
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  const handleSelect = (country: string) => {
    if (inputRef.current) {
      inputRef.current.value = country;
    }
    setFilteredCountries([]);
  };

  return (
    <div className="controller">
      <label htmlFor="country">Country</label>
      <input
        id="country"
        type="text"
        ref={inputRef}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {filteredCountries.length > 0 && (
        <ul className="autocomplete-list">
          {filteredCountries.map((country) => (
            <li
              key={country}
              className="autocomplete-item"
              onClick={() => handleSelect(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
