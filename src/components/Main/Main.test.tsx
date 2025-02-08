import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Main from '.';
import { fetchItems } from '../../api';
import { store } from '../../store';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../../api', () => ({
  fetchItems: vi.fn(),
}));

describe('Main', () => {
  const mockSetData = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (fetchItems as Mock).mockResolvedValue({
      results: [{ name: 'Luke Skywalker' }],
      count: 1,
    });

    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Main data={[]} setData={mockSetData} />
          </Provider>
        </MemoryRouter>
      );
    });

    const title = screen.getByText(/star wars/i);
    expect(title).toBeInTheDocument();
  });

  it('navigates to home on main click', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Main data={[]} setData={mockSetData} />
          </Provider>
        </MemoryRouter>
      );
    });

    const mainBlock = screen.getByText(/star wars/i).parentElement;
    if (mainBlock) {
      fireEvent.click(mainBlock);
    }

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('receives data and adds it to the local state', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main data={[]} setData={mockSetData} />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => expect(fetchItems).toHaveBeenCalledWith('', 1));

    expect(mockSetData).toHaveBeenCalledWith([{ name: 'Luke Skywalker' }]);
  });

  it('saves the query to localStorage and fetches data when searching', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main data={[]} setData={mockSetData} />
        </Provider>
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Darth Vader' } });
      fireEvent.click(button);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('query', 'Darth Vader');
  });

  it('retrieves query from localStorage on mount', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === 'query') return 'Luke Skywalker';
      return null;
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Main data={[]} setData={mockSetData} />
          </Provider>
        </MemoryRouter>
      );
    });

    expect(localStorage.getItem).toHaveBeenCalledWith('query');

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Luke Skywalker');
  });

  it('logs an error to the console if fetchItems throws', async () => {
    const mockError = new Error('API Error');
    (fetchItems as Mock).mockRejectedValue(mockError);

    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main data={[]} setData={mockSetData} />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => expect(fetchItems).toHaveBeenCalled());

    expect(consoleLogSpy).toHaveBeenCalledWith(mockError);

    consoleLogSpy.mockRestore();
  });

  it('shows overlay when details is opened', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/details/some-item']}>
          <Provider store={store}>
            <Main data={[]} setData={mockSetData} />
          </Provider>
        </MemoryRouter>
      );
    });

    const divElement = screen.getByTestId('overlay');
    expect(divElement).toBeInTheDocument();
  });
});
