import { createContext } from 'react';

interface ActionsContextType {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  sortType: string;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const ActionsContext = createContext<ActionsContextType>({
  region: '',
  setRegion: () => {},
  sortType: '',
  setSortType: () => {},
  search: '',
  setSearch: () => {},
});
