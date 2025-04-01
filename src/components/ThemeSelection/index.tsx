import { Themes } from '../../enums';
import { useThemeContext } from '../../hooks';

const themes = [
  {
    name: 'Light',
    value: Themes.Light,
  },
  {
    name: 'Dark',
    value: Themes.Dark,
  },
];

export default function ThemeSelection() {
  const { theme, setTheme } = useThemeContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (setTheme) {
      const newValue = event.target.value;

      setTheme(newValue);
    }
  };

  return (
    <select value={theme} onChange={handleChange}>
      {themes.map((theme) => (
        <option key={theme.value} value={theme.value}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}
