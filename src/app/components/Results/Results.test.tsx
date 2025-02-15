import { act, render, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Results from '.';
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

describe('Results', () => {
  const mockSearchParams = new URLSearchParams({ details: '1' });

  beforeEach(() => {
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  it('renders the title', async () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: { count: 50, results: [] },
      isLoading: false,
      isFetching: false,
    });
    (useSearchParams as Mock).mockReturnValue({
      get: vi.fn(),
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <Results />
        </Provider>
      );
    });

    const title = screen.getByText(/results/i);
    expect(title).toBeInTheDocument();
  });
});
