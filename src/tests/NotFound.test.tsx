import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFound from '../pages/404';

describe('NotFound', () => {
  it('renders the not found message', () => {
    render(<NotFound />);

    const message = screen.getByText(/page not found/i);
    expect(message).toBeInTheDocument();
  });

  it('renders a link to return to the home page', () => {
    render(<NotFound />);

    const homeLink = screen.getByRole('link', { name: /return to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
