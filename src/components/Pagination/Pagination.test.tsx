import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockSetPage = vi.fn();
  const itemsCount = 50;
  const currentPage = 1;
  const isLoading = false;

  beforeEach(() => {
    mockSetPage.mockClear();
  });

  it('updates URL query parameter when page changes', () => {
    const { rerender } = render(
      <MemoryRouter>
        <Pagination
          itemsCount={itemsCount}
          setPage={mockSetPage}
          currentPage={currentPage}
          isLoading={isLoading}
        />
      </MemoryRouter>
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(5);

    fireEvent.click(pageButtons[1]);

    expect(mockSetPage).toHaveBeenCalledWith(2);

    rerender(
      <MemoryRouter>
        <Pagination
          itemsCount={itemsCount}
          setPage={mockSetPage}
          currentPage={2}
          isLoading={isLoading}
        />
      </MemoryRouter>
    );

    const activeButton = screen.getByRole('button', { name: '2' });
    expect(activeButton).toBeDisabled();
    expect(activeButton).toHaveClass(/active/i);
  });
});
