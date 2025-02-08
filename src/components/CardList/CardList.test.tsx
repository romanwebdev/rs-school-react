import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import CardList from '.';
import { IPerson } from '../../types/person.type';

describe('CardList', () => {
  it('renders the specified number of cards', () => {
    const mockData = [
      {
        name: 'Luke Skywalker',
        height: '172',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'C-3PO',
        height: '167',
        hair_color: 'n/a',
        skin_color: 'gold',
        eye_color: 'yellow',
        birth_year: '112BBY',
        gender: 'n/a',
        url: 'https://swapi.dev/api/people/2/',
      },
    ];

    render(
      <BrowserRouter>
        <CardList data={mockData} />
      </BrowserRouter>
    );

    const cards = screen.getAllByText(/luke|c-3po/i);
    expect(cards).toHaveLength(mockData.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    const emptyArray: IPerson[] = [];

    render(
      <BrowserRouter>
        <CardList data={emptyArray} />
      </BrowserRouter>
    );

    const noDataMessage = screen.getByText('Nothing found');
    expect(noDataMessage).toBeInTheDocument();
  });
});
