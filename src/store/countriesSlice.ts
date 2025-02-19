import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface CountriesState {
  allowedCountries: string[];
  selectedCountries: string[];
  filteredCountries: string[];
}

const initialState: CountriesState = {
  allowedCountries: countries,
  selectedCountries: [],
  filteredCountries: [],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setSelectedCountries: (state, action: PayloadAction<string[]>) => {
      state.selectedCountries = action.payload;
    },
    setFilteredCountries: (state, action: PayloadAction<string[]>) => {
      state.filteredCountries = action.payload;
    },
  },
});

export const { setSelectedCountries, setFilteredCountries } =
  countriesSlice.actions;

export default countriesSlice.reducer;
