import { act, fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Main from '.';
import { store } from '../../../store';
import {
  useGetCharacterByIdQuery,
  useGetCharactersQuery,
} from '../../../store/star-wars-api';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('../../hooks', () => ({
  useQueryParams: () => ({
    page: '1',
    search: '',
  }),
  useUpdateSearchParams: vi.fn(),
}));

vi.mock('../../../store/star-wars-api', async () => {
  const actual = await vi.importActual('../../../store/star-wars-api');

  return {
    ...actual,
    useGetCharactersQuery: vi.fn().mockReturnValue({
      data: {
        results: [],
        count: 1,
      },
      error: null,
      isLoading: false,
      isSuccess: true,
    }),
    useGetCharacterByIdQuery: vi.fn(),
  };
});

describe('Main', () => {
  const mockRouter = {
    push: vi.fn(),
  };
  const mockSearchParams = new URLSearchParams({ details: '1' });

  const mockCharatersQueryResponse = {
    data: { count: 50, results: [] },
    isLoading: false,
    isFetching: false,
  };

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue(mockRouter);
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
    (useGetCharactersQuery as Mock).mockReturnValue(mockCharatersQueryResponse);
    (useGetCharacterByIdQuery as Mock).mockReturnValue({
      name: 'Luke',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Main />
        </Provider>
      );
    });

    const title = screen.getByText(/star wars/i);
    expect(title).toBeInTheDocument();
  });

  it('renders overlay when pathname includes details', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Main />
        </Provider>
      );
    });

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toHaveClass(/overlay/);
  });

  it('navigates back to the home page when overlay is clicked', () => {
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: { count: 50, results: [] },
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(mockRouter.push).toHaveBeenCalledWith('/?');
  });
});
