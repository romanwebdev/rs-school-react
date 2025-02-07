import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Card from './Card';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Card', () => {
  const mockNavigate = vi.fn();
  const mockName = 'Luke';
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
        <Card name={mockName} url={mockUrl} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockName)).toBeInTheDocument();
  });

  it('opens a detailed card component', () => {
    render(
      <MemoryRouter>
        <Card name={mockName} url={mockUrl} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: mockName });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/details/1');
  });
});
