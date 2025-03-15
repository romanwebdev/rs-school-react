import { useRef } from 'react';
import {
  setFilteredCountries,
  setSelectedCountries,
} from '../store/countriesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

type Props = {
  errors: {
    [key: string]: string;
  };
};

export default function UncontrolledAutocomplete({ errors }: Props) {
  const countries = useAppSelector((state) => state.countries.allowedCountries);
  const selectedCountries = useAppSelector(
    (state) => state.countries.selectedCountries
  );
  const filteredCountries = useAppSelector(
    (state) => state.countries.filteredCountries
  );
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    if (inputRef.current && inputRef.current.value) {
      const value = inputRef.current.value;
      const filtered = countries.filter(
        (country) =>
          country.toLowerCase().includes(value.toLowerCase()) &&
          !selectedCountries.includes(country)
      );
      dispatch(setFilteredCountries(filtered));
    } else {
      dispatch(setFilteredCountries([]));
    }
  };

  const handleSelect = (country: string) => {
    dispatch(setSelectedCountries([...selectedCountries, country]));
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    dispatch(setFilteredCountries([]));
  };

  const handleRemove = (country: string) => {
    const filtered = selectedCountries.filter((c) => c !== country);
    dispatch(setSelectedCountries(filtered));
  };

  return (
    <div className="controller">
      <label htmlFor="countries">Countries</label>
      <input
        id="countries"
        type="text"
        ref={inputRef}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {errors.countries && (
        <p className="error autocomplete-error">{errors.countries}</p>
      )}
      <div className="selected-countries">
        {selectedCountries.map((country) => (
          <span key={country} className="selected-item">
            {country} <button onClick={() => handleRemove(country)}>x</button>
          </span>
        ))}
      </div>
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
