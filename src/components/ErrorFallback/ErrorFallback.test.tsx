import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorFallback from './ErrorFallback';

describe('ErrorFallback', () => {
  it('renders error message', () => {
    const error = new Error('Error description');
    render(<ErrorFallback error={error} />);

    const errorMessage = screen.getByText(/error description/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('renders default message without error', () => {
    render(<ErrorFallback />);

    const errorMessage = screen.getByText(/unknown error/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
