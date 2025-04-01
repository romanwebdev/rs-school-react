import { useCallback, useContext } from 'react';
import { ActionsContext } from '../context';
import { regions, sortOptions } from '../data';
import { Region, SortType } from '../enums';

export default function Actions() {
  const { setRegion, setSortType, setSearch, search } =
    useContext(ActionsContext);

  const filterByRegion = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      setRegion(event.target.value as Region),
    [setRegion]
  );

  const sortByPopulation = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      setSortType(event.target.value as SortType),
    [setSortType]
  );

  const searchByName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearch(event.target.value),
    [setSearch]
  );

  return (
    <div className="actions">
      <select name="regions" onChange={filterByRegion}>
        {regions.map((region) => (
          <option value={region} key={region}>
            {region}
          </option>
        ))}
      </select>
      <input
        onChange={searchByName}
        value={search}
        placeholder="Search by country name..."
      />
      <select name="sorting" onChange={sortByPopulation}>
        {sortOptions.map((sort) => (
          <option value={sort.value} key={sort.value}>
            {sort.label}
          </option>
        ))}
      </select>
    </div>
  );
}
