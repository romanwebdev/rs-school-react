import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Details from '.';
import { store } from '../../store';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

describe('Details', () => {
  const mockRouter = {
    push: vi.fn(),
  };
  const mockSearchParams = new URLSearchParams({ details: '1' });
  const mockData = [
    {
      name: 'Luke',
      birth_year: '2000',
      height: '180',
      skin_color: 'fair',
      eye_color: 'blue',
      hair_color: 'brown',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
    },
  ];

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue(mockRouter);
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders the relevant detailed card data', async () => {
    render(
      <Provider store={store}>
        <Details characters={mockData} />
      </Provider>
    );

    expect(screen.getByText(mockData[0].name)).toBeInTheDocument();
    expect(screen.getByText(/2000/)).toBeInTheDocument();
    expect(screen.getByText(/180/)).toBeInTheDocument();
    expect(screen.getByText(/fair/)).toBeInTheDocument();
    expect(screen.getByText(/blue/)).toBeInTheDocument();
    expect(screen.getByText(/brown/)).toBeInTheDocument();
  });

  it('navigates back to the home page that hides details component', async () => {
    render(
      <Provider store={store}>
        <Details characters={mockData} />
      </Provider>
    );

    const closeButton = screen.getByRole('button', { name: /✖/i });
    fireEvent.click(closeButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/?');
  });

  it('shows Not Found Message if characters not found', () => {
    render(
      <Provider store={store}>
        <Details
          characters={[
            { ...mockData[0], url: 'https://swapi.dev/api/people/2/' },
          ]}
        />
      </Provider>
    );

    expect(screen.getByText('Character Not Found')).toBeInTheDocument();
  });
});
