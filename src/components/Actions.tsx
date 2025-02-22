import { useContext } from 'react';
import { ActionsContext } from '../context';

const regions = [
  'All',
  'Antarctic',
  'Americas',
  'Europe',
  'Africa',
  'Asia',
  'Oceania',
];
const sortOptions = ['asc', 'desc'];

export default function Actions() {
  const { setRegion, setSortType, setSearch, search } =
    useContext(ActionsContext);

  const filterByRegion = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setRegion(event.target.value);
  const sortByPopulation = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSortType(event.target.value);
  const searchByName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  return (
    <div className="actions">
      <select name="regions" onChange={filterByRegion}>
        {regions.map((region) => (
          <option value={region} key={region}>
            {region}
          </option>
        ))}
      </select>
      <input onChange={searchByName} value={search} placeholder="Search..." />
      <select name="sorting" onChange={sortByPopulation}>
        {sortOptions.map((sort) => (
          <option value={sort} key={sort}>
            {sort}
          </option>
        ))}
      </select>
    </div>
  );
}
