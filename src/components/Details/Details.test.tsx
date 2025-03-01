import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Details, { loader } from '.';
import { store } from '../../store';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

describe('Details', () => {
  const mockRouter = vi.fn();
  const mockSearchParams = new URLSearchParams({ details: '1' });
  const mockData = {
    name: 'Luke',
    birth_year: '2000',
    height: '180',
    skin_color: 'fair',
    eye_color: 'blue',
    hair_color: 'brown',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  };

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockRouter);
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders the relevant detailed card data', async () => {
    render(
      <Provider store={store}>
        <Details loaderData={mockData} />
      </Provider>
    );

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(/2000/)).toBeInTheDocument();
    expect(screen.getByText(/180/)).toBeInTheDocument();
    expect(screen.getByText(/fair/)).toBeInTheDocument();
    expect(screen.getByText(/blue/)).toBeInTheDocument();
    expect(screen.getByText(/brown/)).toBeInTheDocument();
  });

  it('navigates back to the home page that hides details component', async () => {
    render(
      <Provider store={store}>
        <Details loaderData={mockData} />
      </Provider>
    );

    const closeButton = screen.getByRole('button', { name: /✖/i });
    fireEvent.click(closeButton);

    expect(mockRouter).toHaveBeenCalledWith({
      pathname: `/`,
      search: 'details,1',
    });
  });

  it('shows Not Found Message if characters not found', () => {
    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    expect(screen.getByText('Character Not Found')).toBeInTheDocument();
  });

  it('should fetch and return data correctly', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as unknown as typeof fetch;

    const params = { params: { id: '1' } };
    const result = await loader(params);

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/1`);
    expect(result).toEqual(mockData);
  });
});
