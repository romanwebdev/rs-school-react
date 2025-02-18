import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IData } from '../types/data.type';

interface CounterState {
  uncontrolledFormData: IData | null;
  reactHookFormData: IData | null;
}

const initialState: CounterState = {
  uncontrolledFormData: null,
  reactHookFormData: null,
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
  },
});

export const { setUncotrolledFormData, setReactHookFormData } =
  formSlice.actions;

export default formSlice.reducer;
