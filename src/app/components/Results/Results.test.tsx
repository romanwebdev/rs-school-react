import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import Results from '.';
import { store } from '../../../store';

vi.mock('../../hooks', () => ({
  useQueryParams: () => ({
    page: '1',
    search: '',
  }),
}));

vi.mock('../../store/star-wars-api', async () => {
  const actual = await vi.importActual('../../store/star-wars-api');

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
  it('renders the title', async () => {
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
