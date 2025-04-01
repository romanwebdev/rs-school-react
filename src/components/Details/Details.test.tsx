import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate, useParams } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Details from '.';
import { store } from '../../store';
import { useGetCharacterByIdQuery } from '../../store/star-wars-api';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock('../../store/star-wars-api', async () => {
  const actual = await vi.importActual('../../store/star-wars-api');
  return {
    ...actual,
    useGetCharacterByIdQuery: vi.fn(),
  };
});

describe('Details', () => {
  const mockNavigate = vi.fn();
  const mockUseGetCharacterByIdQuery = useGetCharacterByIdQuery as Mock;
  const mockData = {
    name: 'Luke',
    birth_year: '2000',
    height: '180',
    skin_color: 'fair',
    eye_color: 'blue',
    hair_color: 'brown',
  };

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useParams as Mock).mockReturnValue({ id: '1' });
    mockUseGetCharacterByIdQuery.mockReset();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('displays a loading indicator while fetching data', async () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Details />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders the relevant detailed card data', async () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Details />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(/2000/)).toBeInTheDocument();
    expect(screen.getByText(/180/)).toBeInTheDocument();
    expect(screen.getByText(/fair/)).toBeInTheDocument();
    expect(screen.getByText(/blue/)).toBeInTheDocument();
    expect(screen.getByText(/brown/)).toBeInTheDocument();
  });

  it('navigates back to the home page that hides details component', async () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Details />
        </Provider>
      </MemoryRouter>
    );

    const closeButton = screen.getByRole('button', { name: /✖/i });
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith({ pathname: '/', search: '' });
  });
});
