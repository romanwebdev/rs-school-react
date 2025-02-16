import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IData } from '../types/data.type';

interface CounterState {
  data: IData | null;
}

const initialState: CounterState = {
  data: null,
};

export const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IData>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
