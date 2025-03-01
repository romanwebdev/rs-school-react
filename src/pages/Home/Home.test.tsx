import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import Home, { loader } from '.';
import { store } from '../../store';

describe('Home Page', () => {
  const mockData = {
    results: [],
    count: 0,
  };
  it('renders Home Page', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Home loaderData={mockData} />
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
            <Route path="/" element={<Home loaderData={mockData} />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const homeElement = screen.getByTestId('home');
    expect(homeElement).toBeInTheDocument();
  });

  it('should fetch and return data correctly', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as unknown as typeof fetch;

    const request = new Request('https://example.com/?page=1&search=test');
    const result = await loader({ request });

    expect(fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/?page=1&search=test`
    );
    expect(result).toEqual(mockData);
  });

  it('should use default values when search params are missing', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as unknown as typeof fetch;

    const request = new Request('https://example.com/');

    const result = await loader({ request });

    expect(fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/?page=1&search=`
    );
    expect(result).toEqual(mockData);
  });
});
