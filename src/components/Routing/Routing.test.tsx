import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import Routing from '.';
import { store } from '../../store';

describe('Routing Component', () => {
  it('renders Home page for the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <Routing />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  it('renders Details page for the details path', () => {
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Provider store={store}>
          <Routing />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/details/i)).toBeInTheDocument();
  });

  it('renders NotFound page for an unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Provider store={store}>
          <Routing />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
