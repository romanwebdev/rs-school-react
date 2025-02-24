import { configureStore } from '@reduxjs/toolkit/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Card from '.';
import charactersReducer, {
  toggleCharacterSelection,
} from '../../store/characters-slice';
import { ICharacter } from '../../types/character.type';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Card', () => {
  const mockNavigate = vi.fn();
  const mockCharacter: ICharacter = {
    name: 'Luke Skywalker',
    height: '172',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  };
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    store = configureStore({
      reducer: {
        characters: charactersReducer,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card character={mockCharacter} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('navigates to the character details page when clicked', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card character={mockCharacter} />
        </Provider>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: 'Luke Skywalker' });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/details/1',
      search: '',
    });
  });

  it('dispatches the toggleCharacterSelection action when checkbox is clicked', () => {
    const dispatch = vi.fn();
    store.dispatch = dispatch;

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card character={mockCharacter} />
        </Provider>
      </MemoryRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith(
      toggleCharacterSelection(mockCharacter)
    );
  });

  it('checks if the checkbox is checked when the character is selected', () => {
    store.dispatch(toggleCharacterSelection(mockCharacter));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card character={mockCharacter} />
        </Provider>
      </MemoryRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('does not check the checkbox if the character is not selected', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card character={mockCharacter} />
        </Provider>
      </MemoryRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });
});
