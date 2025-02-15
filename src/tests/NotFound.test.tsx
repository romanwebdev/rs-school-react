import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';
import NotFound from '.';

describe('NotFound', () => {
  it('renders the not found message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const message = screen.getByText(/page not found/i);
    expect(message).toBeInTheDocument();
  });

  it('renders a link to return to the home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /return to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders NotFound for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const message = screen.getByText(/page not found/i);
    expect(message).toBeInTheDocument();
  });
});
