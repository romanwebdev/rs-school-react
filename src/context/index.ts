import { createContext } from 'react';
import { Region, SortType } from '../enums';

interface ActionsContextType {
  region: Region;
  setRegion: React.Dispatch<React.SetStateAction<Region>>;
  sortType: SortType;
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const ActionsContext = createContext<ActionsContextType>({
  region: Region.All,
  setRegion: () => {},
  sortType: SortType.ASC,
  setSortType: () => {},
  search: '',
  setSearch: () => {},
});
