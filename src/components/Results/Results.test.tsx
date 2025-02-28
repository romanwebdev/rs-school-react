import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import Results from '.';
import { store } from '../../store';

vi.mock('../../hooks', () => ({
  useQueryParams: () => ({
    page: '1',
    search: '',
  }),
  useLoader: () => ({
    loading: false,
    isDetailsOpen: false,
  }),
}));

describe('Results', () => {
  it('renders the title', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Results characters={[]} />
        </Provider>
      );
    });

    const title = screen.getByText(/results/i);
    expect(title).toBeInTheDocument();
  });
});
