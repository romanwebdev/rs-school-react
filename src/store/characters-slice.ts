import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from '../types/character.type';

export interface CharactersState {
  selectedCharacters: ICharacter[];
}

const initialState: CharactersState = {
  selectedCharacters: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    toggleCharacterSelection: (state, action: PayloadAction<ICharacter>) => {
      const index = state.selectedCharacters.findIndex(
        (character) => character.name === action.payload.name
      );

      if (index >= 0) {
        state.selectedCharacters.splice(index, 1);
      } else {
        state.selectedCharacters.push(action.payload);
      }
    },
    unselectAll: (state) => {
      state.selectedCharacters = [];
    },
  },
});

export const { toggleCharacterSelection, unselectAll } =
  charactersSlice.actions;

export default charactersSlice.reducer;
