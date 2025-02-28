import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Main from '.';
import { useLoader } from '../../hooks';
import { store } from '../../store';

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
  useLoader: vi.fn(),
}));

describe('Main', () => {
  const mockRouter = {
    push: vi.fn(),
  };
  const mockSearchParams = new URLSearchParams({ details: '1' });
  const mockLoader = { loading: false, isDetailsOpen: false };

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue(mockRouter);
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
    (useLoader as Mock).mockReturnValue(mockLoader);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders the title', async () => {
    render(
      <Provider store={store}>
        <Main data={{ results: [], count: 0 }} />
      </Provider>
    );

    const title = screen.getByText(/star wars/i);
    expect(title).toBeInTheDocument();
  });

  it('renders overlay when pathname includes details', () => {
    render(
      <Provider store={store}>
        <Main data={{ results: [], count: 0 }} />
      </Provider>
    );

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toHaveClass(/overlay/);
  });

  it('navigates back to the home page when overlay is clicked', () => {
    render(
      <Provider store={store}>
        <Main data={{ results: [], count: 0 }} />
      </Provider>
    );

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(mockRouter.push).toHaveBeenCalledWith('/?');
  });
});
