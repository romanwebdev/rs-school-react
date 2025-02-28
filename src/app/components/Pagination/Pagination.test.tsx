import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Pagination from '.';
import * as hooks from '../../../hooks';
import { store } from '../../../store';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});

beforeEach(() => {
  (useRouter as Mock).mockReturnValue({
    events: {
      on: vi.fn(),
      off: vi.fn(),
    },
  });
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('Pagination', () => {
  const mockUpdateSearchParams = vi.fn();
  const mockUseQueryParams = vi.spyOn(hooks, 'useQueryParams');
  const mockUseUpdateSearchParams = vi.spyOn(hooks, 'useUpdateSearchParams');

  const page = '1';
  const search = '';

  beforeEach(() => {
    mockUseQueryParams.mockReturnValue({ page, search });
    mockUseUpdateSearchParams.mockReturnValue(mockUpdateSearchParams);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders pagination buttons and updates the active button when clicked', async () => {
    render(
      <Provider store={store}>
        <Pagination count={50} />
      </Provider>
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(5);

    fireEvent.click(pageButtons[1]);

    await waitFor(() => {
      expect(mockUpdateSearchParams).toHaveBeenCalledWith('2', '');
    });

    const activeButton = screen.getByRole('button', { name: '1' });
    expect(activeButton).toBeDisabled();
    expect(activeButton).toHaveClass(/active/i);
  });

  it('disables the button of the current page and marks it as active', async () => {
    render(
      <Provider store={store}>
        <Pagination count={20} />
      </Provider>
    );

    const firstPageButton = screen.getByRole('button', { name: '1' });
    expect(firstPageButton).toBeDisabled();
    expect(firstPageButton).toHaveClass(/active/i);

    const secondPageButton = screen.getByRole('button', { name: '2' });
    expect(secondPageButton).not.toBeDisabled();
    expect(secondPageButton).not.toHaveClass(/active/i);
  });

  it('does not render pagination buttons when data is loading or fetching', async () => {
    render(
      <Provider store={store}>
        <Pagination count={0} />
      </Provider>
    );

    const pageButtons = screen.queryAllByRole('button');
    expect(pageButtons).toHaveLength(0);
  });

  it('updates the page correctly when the user clicks a page button', async () => {
    render(
      <Provider store={store}>
        <Pagination count={30} />
      </Provider>
    );

    const thirdPageButton = screen.getByRole('button', { name: '3' });
    fireEvent.click(thirdPageButton);

    await waitFor(() => {
      expect(mockUpdateSearchParams).toHaveBeenCalledWith('3', '');
    });
  });
});
