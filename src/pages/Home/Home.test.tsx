import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';
import Home from '.';
import { store } from '../../store';

describe('Home Page', () => {
  it('renders Home Page', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );

    const homeElement = screen.getByTestId('home');
    expect(homeElement).toBeInTheDocument();
  });

  it('renders Home Page for a main route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const homeElement = screen.getByTestId('home');
    expect(homeElement).toBeInTheDocument();
  });
});
