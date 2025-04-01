import { Region, SortType } from '../enums';

export const regions = [
  Region.All,
  Region.Antarctic,
  Region.Americas,
  Region.Europe,
  Region.Africa,
  Region.Asia,
  Region.Oceania,
];

export const sortOptions = [
  {
    label: 'Sort by population (low to high)',
    value: SortType.ASC,
  },

  {
    label: 'Sort by population (high to low)',
    value: SortType.DESC,
  },
];
