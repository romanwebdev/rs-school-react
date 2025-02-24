import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import Results from '.';
import { store } from '../../store';

describe('Results', () => {
  it('renders the title', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Results />
        </Provider>
      </BrowserRouter>
    );

    const title = screen.getByText(/results/i);
    expect(title).toBeInTheDocument();
  });
});
