import {createSlice} from '@reduxjs/toolkit';

export const app = createSlice({
  name: 'app',
  initialState: {
    isTourCompleted: false,
    user: {
      scheme: null,
      phone: {
        formatted: null,
        original: ''
      },
      login: '',
      email: '',
      is_admin: false,
      subscription: {
        active: false,
        payment: ''
      }
    },
    content: null,
  },
  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload;
    },
    completeTour: (state) => {
      state.isTourCompleted = true;
    },
    setContent: (state, { payload }) => {
      state.content = payload;
    },
  }
});

export const {setUser, completeTour, setContent} = app.actions;

export default app.reducer;