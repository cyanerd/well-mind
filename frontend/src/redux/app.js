import {createSlice} from '@reduxjs/toolkit';

export const app = createSlice({
  name: 'app',
  initialState: {
    isTourCompleted: false,
    user: null
  },
  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload;
    },
    completeTour: (state) => {
      state.isTourCompleted = true;
    }
  }
});

export const {setUser, completeTour} = app.actions;

export default app.reducer;