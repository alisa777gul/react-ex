import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './operations';

const initialState = [
  { id: '0', name: 'John Dell' },
  { id: '1', name: 'Jane Delete' },
  { id: '2', name: 'Johny Doll' },
];

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
