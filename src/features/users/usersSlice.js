import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './operations';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = state => state.users;

export default usersSlice.reducer;
