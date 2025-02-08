import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Search from './Search';

describe('Search', () => {
  const mockSetPage = vi.fn();
  const mockSetSavedQuery = vi.fn();
  const mockSavedQuery = 'Luke';

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with the initial query value', () => {
    render(
      <BrowserRouter>
        <Search
          savedQuery={mockSavedQuery}
          setSavedQuery={mockSetSavedQuery}
          setPage={mockSetPage}
        />
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Luke');
  });

  it('updates the query state when typing in the input', () => {
    render(
      <BrowserRouter>
        <Search
          savedQuery={mockSavedQuery}
          setSavedQuery={mockSetSavedQuery}
          setPage={mockSetPage}
        />
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'C-3PO' } });
    expect(input).toHaveValue('C-3PO');
  });

  it('calls setSavedQuery and setPage when the search button is clicked', () => {
    render(
      <BrowserRouter>
        <Search
          savedQuery={mockSavedQuery}
          setSavedQuery={mockSetSavedQuery}
          setPage={mockSetPage}
        />
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'C-3PO' } });
    fireEvent.click(button);

    expect(mockSetSavedQuery).toHaveBeenCalledWith('C-3PO');
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });
});
