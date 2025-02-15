import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, Mock, vi } from 'vitest';
import ThemeSelection from '.';
import { Themes } from '../../../enums';
import { useThemeContext } from '../../../hooks';
import { store } from '../../../store';

vi.mock('../../hooks', () => ({
  useThemeContext: vi.fn(),
}));

describe('ThemeSelection', () => {
  it('renders all theme options', () => {
    (useThemeContext as Mock).mockReturnValue({
      theme: Themes.Light,
      setTheme: vi.fn(),
    });

    render(
      <Provider store={store}>
        <ThemeSelection />
      </Provider>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('displays the selected theme', () => {
    (useThemeContext as Mock).mockReturnValue({
      theme: Themes.Dark,
      setTheme: vi.fn(),
    });

    render(
      <Provider store={store}>
        <ThemeSelection />
      </Provider>
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe(Themes.Dark);
  });

  it('calls setTheme when a different option is selected', () => {
    const setThemeMock = vi.fn();
    (useThemeContext as Mock).mockReturnValue({
      theme: Themes.Light,
      setTheme: setThemeMock,
    });

    render(
      <Provider store={store}>
        <ThemeSelection />
      </Provider>
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: Themes.Dark } });

    expect(setThemeMock).toHaveBeenCalledWith(Themes.Dark);
  });
});
