import { Region, SortType } from '../enums';
import { ICountry } from '../types/country.type';

export const filterCountries = (
  countries: ICountry[],
  region: string,
  sortType: string,
  search: string
) => {
  let filteredCountries = countries;

  if (region !== Region.All) {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === region
    );
  }

  if (search) {
    filteredCountries = filteredCountries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
  }

  filteredCountries = filteredCountries.sort((a, b) =>
    sortType === SortType.ASC
      ? a.population - b.population
      : b.population - a.population
  );

  return filteredCountries;
};
