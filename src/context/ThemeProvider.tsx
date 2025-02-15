import { ReactNode, useState } from 'react';
import { Themes } from '../enums';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(Themes.Light);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme} theme-wrap`}>{children}</div>
    </ThemeContext.Provider>
  );
};
