import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Search from '.';
import * as hooks from '../../../hooks';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});

describe('Search', () => {
  const mockUpdateSearchParams = vi.fn();
  const mockUseQueryParams = vi.spyOn(hooks, 'useQueryParams');
  const mockUseUpdateSearchParams = vi.spyOn(hooks, 'useUpdateSearchParams');

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with the initial query value', () => {
    mockUseQueryParams.mockReturnValue({ search: 'Luke', page: '1' });

    render(<Search />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Luke');
  });

  it('updates the query state when typing in the input', () => {
    render(<Search />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'C-3PO' } });
    expect(input).toHaveValue('C-3PO');
  });

  it('calls setSavedQuery and setPage when the search button is clicked', async () => {
    mockUseUpdateSearchParams.mockReturnValue(mockUpdateSearchParams);

    render(<Search />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'C-3PO' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockUpdateSearchParams).toHaveBeenCalledWith('1', 'C-3PO');
    });
  });
});
