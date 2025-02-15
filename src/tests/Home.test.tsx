import { render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Home from '../app/page';
import { store } from '../store';
import { useGetCharactersQuery } from '../store/star-wars-api';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useSearchParams: vi.fn(),
    useRouter: vi.fn(),
  };
});

vi.mock('../store/star-wars-api', async () => {
  const actual = await vi.importActual('../store/star-wars-api');

  return {
    ...actual,
    useGetCharactersQuery: vi.fn().mockReturnValue({
      data: { results: [] },
      isLoading: false,
      isFetching: false,
    }),
  };
});

describe('Home Page', () => {
  const mockRouter = {
    push: vi.fn(),
  };

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders Home Page', async () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: { count: 50, results: [] },
      isLoading: false,
      isFetching: false,
    });
    (useSearchParams as Mock).mockReturnValue({
      get: vi.fn(),
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const homeElement = screen.getByTestId('home');
    expect(homeElement).toBeInTheDocument();
  });
});
