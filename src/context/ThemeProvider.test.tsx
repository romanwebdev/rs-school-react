import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Themes } from '../enums';
import { store } from '../store';
import { ThemeContext } from './ThemeContext';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider', () => {
  const TestComponent = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
      <div data-testid="test">
        <div data-testid="current-theme">{theme}</div>
        <button onClick={() => setTheme && setTheme(Themes.Dark)}>
          Switch to Dark
        </button>
      </div>
    );
  };

  it('provides theme context with default light theme', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    const currentTheme = screen.getByTestId('current-theme');
    expect(currentTheme).toHaveTextContent(Themes.Light);
  });

  it('updates theme when setTheme is called', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /switch to dark/i });
    const currentTheme = screen.getByTestId('current-theme');

    expect(currentTheme).toHaveTextContent(Themes.Light);

    fireEvent.click(button);

    expect(currentTheme).toHaveTextContent(Themes.Dark);
  });
});
