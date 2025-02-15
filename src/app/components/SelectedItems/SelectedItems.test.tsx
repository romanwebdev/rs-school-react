import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SelectedItems from '.';
import charactersReducer, {
  CharactersState,
  unselectAll,
} from '../../../store/characters-slice';
import { ICharacter } from '../../../types/character.type';

type IState = { characters: CharactersState };

vi.mock('../../utils', () => ({
  downloadCSV: vi.fn(),
}));
vi.mock('../../../store/characters-slice', async (importOriginal) => {
  const actual = await importOriginal<{ unselectAll: () => void }>();

  return {
    ...actual,
    unselectAll: vi.fn(),
  };
});

describe('SelectedItems', () => {
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

  const createTestStore = (initialState: IState) =>
    configureStore({
      reducer: { characters: charactersReducer },
      preloadedState: initialState,
    });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing if no characters are selected', () => {
    const store = createTestStore({
      characters: { selectedCharacters: [] },
    } as IState);

    render(
      <Provider store={store}>
        <SelectedItems />
      </Provider>
    );
    expect(screen.queryByText(/Selected items:/)).not.toBeInTheDocument();
  });

  it('renders selected characters count', () => {
    const store = createTestStore({
      characters: { selectedCharacters: [mockCharacter] },
    });

    render(
      <Provider store={store}>
        <SelectedItems />
      </Provider>
    );
    expect(screen.getByText(/Selected items: 1/)).toBeInTheDocument();
  });

  it('dispatches unselectAll when Unselect all button is clicked', () => {
    const store = createTestStore({
      characters: { selectedCharacters: [mockCharacter] },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <SelectedItems />
      </Provider>
    );

    const button = screen.getByText(/Unselect all/);
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(unselectAll());
  });
});
