import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Main from '.';
import { store } from '../../store';

describe('Main', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );

    const title = screen.getByText(/star wars/i);
    expect(title).toBeInTheDocument();
  });
});
