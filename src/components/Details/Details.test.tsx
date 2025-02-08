import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter, useNavigate, useParams } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Details from '.';
import { fetchItem } from '../../api';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock('../../api', () => ({
  fetchItem: vi.fn(),
}));

describe('Details', () => {
  const mockNavigate = vi.fn();
  const mockFetchItem = fetchItem as Mock;
  const mockData = {
    name: 'Luke',
    birth_year: '2000',
    height: '180',
    skin_color: 'fair',
    eye_color: 'blue',
    hair_color: 'brown',
  };

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useParams as Mock).mockReturnValue({ id: '1' });
    mockFetchItem.mockReset();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('displays a loading indicator while fetching data', async () => {
    mockFetchItem.mockResolvedValueOnce(mockData);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await act(async () => {
      const spinner = await screen.findByTestId('spinner');
      expect(spinner).toBeInTheDocument();
    });
  });

  it('renders the relevant detailed card data', async () => {
    mockFetchItem.mockResolvedValueOnce(mockData);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => expect(mockFetchItem).toHaveBeenCalledWith('1'));

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.birth_year)).toHaveTextContent('2000');
    expect(screen.getByText(mockData.height)).toHaveTextContent('180');
    expect(screen.getByText(mockData.skin_color)).toHaveTextContent('fair');
    expect(screen.getByText(mockData.eye_color)).toHaveTextContent('blue');
    expect(screen.getByText(mockData.hair_color)).toHaveTextContent('brown');
  });

  it('navigates back to the home page that hides details component', async () => {
    mockFetchItem.mockResolvedValueOnce(mockData);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await act(async () => {
      const closeButton = screen.getByRole('button', { name: /✖/i });
      fireEvent.click(closeButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('handles API errors and logs them', async () => {
    const mockError = new Error('API error');
    mockFetchItem.mockRejectedValueOnce(mockError);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockFetchItem).toHaveBeenCalledWith('1');
    });

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    consoleSpy.mockRestore();
  });
});
