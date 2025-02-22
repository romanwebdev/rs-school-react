import { useState } from 'react';
import { ActionsContext } from '.';

const DEFAULT_REGION = 'All';
const DEFAULT_SORT_TYPE = 'asc';

export default function ActionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [sortType, setSortType] = useState(DEFAULT_SORT_TYPE);
  const [search, setSearch] = useState('');

  return (
    <ActionsContext.Provider
      value={{ region, setRegion, sortType, setSortType, search, setSearch }}
    >
      {children}
    </ActionsContext.Provider>
  );
}
