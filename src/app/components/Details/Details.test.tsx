import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Details from '.';
import { store } from '../../../store';
import { useGetCharacterByIdQuery } from '../../../store/star-wars-api';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
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
  const mockRouter = {
    push: vi.fn(),
  };
  const mockSearchParams = new URLSearchParams({ details: '1' });
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
    (useRouter as Mock).mockReturnValue(mockRouter);
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
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
      <Provider store={store}>
        <Details />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders the relevant detailed card data', async () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <Details />
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
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    const closeButton = screen.getByRole('button', { name: /✖/i });
    fireEvent.click(closeButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/?');
  });
});
