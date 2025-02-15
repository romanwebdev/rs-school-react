import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, useNavigate } from 'react-router';
import { afterEach, describe, expect, it, Mock, vi } from 'vitest';
import Main from '.';
import { store } from '../../store';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Main', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );

    const title = screen.getByText(/star wars/i);
    expect(title).toBeInTheDocument();
  });

  it('renders overlay when pathname includes details', () => {
    render(
      <MemoryRouter initialEntries={['/details']}>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toHaveClass(/overlay/);
  });

  it('navigates back to the home page when overlay is clicked', () => {
    const mockNavigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(mockNavigate).toHaveBeenCalledWith({ pathname: '/', search: '' });
  });
});
