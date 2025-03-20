import { useState } from 'react';
import { ActionsContext } from '.';
import { Region, SortType } from '../enums';

export default function ActionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [region, setRegion] = useState(Region.All);
  const [sortType, setSortType] = useState(SortType.ASC);
  const [search, setSearch] = useState('');

  return (
    <ActionsContext.Provider
      value={{ region, setRegion, sortType, setSortType, search, setSearch }}
    >
      {children}
    </ActionsContext.Provider>
  );
}
