import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IData } from '../types/data.type';

interface CounterState {
  uncontrolledFormData: IData | null;
  reactHookFormData: IData | null;
  isHookFormUpdated: boolean;
  isUncontrolledFormUpdated: boolean;
}

const initialState: CounterState = {
  uncontrolledFormData: null,
  reactHookFormData: null,
  isHookFormUpdated: false,
  isUncontrolledFormUpdated: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncotrolledFormData: (state, action: PayloadAction<IData>) => {
      state.uncontrolledFormData = action.payload;
    },
    setReactHookFormData: (state, action: PayloadAction<IData>) => {
      state.reactHookFormData = action.payload;
    },
    setHookFormUpdated: (state) => {
      state.isHookFormUpdated = true;
    },
    setUncontrolledFormUpdated: (state) => {
      state.isUncontrolledFormUpdated = true;
    },
    resetUpdateStatusese: (state) => {
      state.isHookFormUpdated = false;
      state.isUncontrolledFormUpdated = false;
    },
  },
});

export const {
  setUncotrolledFormData,
  setReactHookFormData,
  setHookFormUpdated,
  setUncontrolledFormUpdated,
  resetUpdateStatusese,
} = formSlice.actions;

export default formSlice.reducer;
