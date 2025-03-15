import { useRef } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import {
  setFilteredCountries,
  setSelectedCountries,
} from '../store/countriesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { formSchema } from '../utils/zod';

type FormData = z.infer<typeof formSchema>;

type Props = {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
};

export default function ReactHookAutocomplete({ control, errors }: Props) {
  const countries = useAppSelector((state) => state.countries.allowedCountries);
  const filteredCountries = useAppSelector(
    (state) => state.countries.filteredCountries
  );
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name="countries"
      control={control}
      render={({ field }) => {
        const { value: selectedCountries, onChange } = field;

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
          onChange([...selectedCountries, country]);
          dispatch(setSelectedCountries([...selectedCountries, country]));
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          dispatch(setFilteredCountries([]));
        };

        const handleRemove = (country: string) => {
          const filtered = selectedCountries.filter(
            (c: string) => c !== country
          );
          onChange(filtered);
          dispatch(setSelectedCountries(filtered));
        };

        return (
          <div className="controller">
            <label htmlFor="country">Countries</label>
            <input
              id="country"
              type="text"
              ref={inputRef}
              onChange={handleInputChange}
              autoComplete="off"
            />

            <div className="selected-countries">
              <p className="error autocomplete-error">
                {errors.countries?.message}
              </p>
              {selectedCountries.map((country: string) => (
                <span key={country} className="selected-item">
                  {country}
                  <button onClick={() => handleRemove(country)}>x</button>
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
      }}
    />
  );
}
