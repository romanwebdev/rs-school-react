import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Card from '.';
import { store } from '../../store';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Card', () => {
  const mockNavigate = vi.fn();
  const mockCharacter = {
    name: 'Luke Skywalker',
    height: '172',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  };
  const mockUrl = 'https://swapi.dev/api/people/1';

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card character={mockCharacter} url={mockUrl} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('opens a detailed card component', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card character={mockCharacter} url={mockUrl} />
        </Provider>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: 'Luke Skywalker' });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/details/1');
  });
});
