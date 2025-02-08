import { createContext } from 'react';
import { Themes } from '../enums';

interface ThemeContextType {
  theme: string;
  setTheme?: (newValue: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: Themes.Light,
});
