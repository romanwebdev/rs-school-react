import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CardList from '.';
import * as hooks from '../../hooks';
import { store } from '../../store';

vi.mock('../Card', () => ({
  default: ({ character }: { character: { name: string } }) => (
    <div data-testid="card">{character.name}</div>
  ),
}));

describe('CardList component', () => {
  const page = '1';
  const search = '';
  const mockData = [
    {
      name: 'Luke Skywalker',
      birth_year: '2000',
      height: '180',
      skin_color: 'fair',
      eye_color: 'blue',
      hair_color: 'brown',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      name: 'Darth Vader',
      birth_year: '41.9BBY',
      height: '202',
      skin_color: 'pale',
      eye_color: 'yellow',
      hair_color: 'none',
      gender: 'male',
      url: 'https://swapi.dev/api/people/4/',
    },
  ];

  const mockUseQueryParams = vi.spyOn(hooks, 'useQueryParams');

  beforeEach(() => {
    mockUseQueryParams.mockReturnValue({ page, search });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows "Nothing found" when there are no results', () => {
    render(
      <Provider store={store}>
        <CardList characters={[]} />
      </Provider>
    );

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders a list of characters when data is available', () => {
    render(
      <Provider store={store}>
        <CardList characters={mockData} />
      </Provider>
    );

    expect(screen.getAllByTestId('card')).toHaveLength(2);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });
});
