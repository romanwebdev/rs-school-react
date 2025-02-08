import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import Results from './Results';

describe('Results', () => {
  it('renders the title', () => {
    render(
      <BrowserRouter>
        <Results data={[]} isLoading={false} />
      </BrowserRouter>
    );

    const title = screen.getByText(/results/i);
    expect(title).toBeInTheDocument();
  });

  it('renders spinner when isLoading is true', () => {
    render(
      <BrowserRouter>
        <Results data={[]} isLoading={true} />
      </BrowserRouter>
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
