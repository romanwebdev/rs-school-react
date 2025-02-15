import { render, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { describe, expect, it, Mock, vi } from 'vitest';
import CardList from '.';
import { store } from '../../../store';
import { useGetCharactersQuery } from '../../../store/star-wars-api';

vi.mock('../../hooks', () => ({
  useQueryParams: () => ({
    page: '1',
    search: '',
  }),
}));

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('../../../store/star-wars-api', async () => {
  const actual = await vi.importActual('../../../store/star-wars-api');

  return {
    ...actual,
    useGetCharactersQuery: vi.fn().mockReturnValue({
      data: {
        results: [],
      },
      error: null,
      isLoading: false,
      isSuccess: true,
    }),
  };
});

vi.mock('../Card', () => ({
  default: ({ character }: { character: { name: string } }) => (
    <div data-testid="card">{character.name}</div>
  ),
}));

vi.mock('../Spinner', () => ({
  default: () => <div data-testid="spinner" />,
}));

describe('CardList component', () => {
  it('shows a loading spinner when data is loading', () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      isLoading: true,
      isFetching: false,
    });
    (useSearchParams as Mock).mockReturnValue({ get: vi.fn() });

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows "Nothing found" when there are no results', () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: { results: [] },
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders a list of characters when data is available', () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: {
        results: [{ name: 'Luke Skywalker' }, { name: 'Darth Vader' }],
      },
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.getAllByTestId('card')).toHaveLength(2);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });
});
