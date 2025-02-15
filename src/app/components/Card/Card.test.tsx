import { configureStore } from '@reduxjs/toolkit/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Card from '.';
import charactersReducer, {
  toggleCharacterSelection,
} from '../../../store/characters-slice';
import { ICharacter } from '../../../types/character.type';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

describe('Card', () => {
  const mockRouter = {
    replace: vi.fn(),
  };
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
    (useRouter as Mock).mockReturnValue(mockRouter);

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
      <Provider store={store}>
        <Card character={mockCharacter} />
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('navigates to the character details page when clicked', () => {
    render(
      <Provider store={store}>
        <Card character={mockCharacter} />
      </Provider>
    );

    const button = screen.getByRole('button', { name: 'Luke Skywalker' });
    fireEvent.click(button);

    expect(mockRouter.replace).toHaveBeenCalledWith(`/?details=1`);
  });

  it('dispatches the toggleCharacterSelection action when checkbox is clicked', () => {
    const dispatch = vi.fn();
    store.dispatch = dispatch;

    render(
      <Provider store={store}>
        <Card character={mockCharacter} />
      </Provider>
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
      <Provider store={store}>
        <Card character={mockCharacter} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('does not check the checkbox if the character is not selected', () => {
    render(
      <Provider store={store}>
        <Card character={mockCharacter} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });
});
