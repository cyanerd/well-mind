import {createSlice} from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    isTourCompleted: false
  },
  reducers: {
    setUser: (state, payload) => {
      state = payload;
    },
    completeTour: (state) => {
      state.isTourCompleted = true;
    }
  }
});

export const {setUser, completeTour} = user.actions;

export default user.reducer;