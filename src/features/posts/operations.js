import { createAsyncThunk } from '@reduxjs/toolkit';

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (post, thunkAPI) => {
    try {
      return new Promise(resolve => setTimeout(() => resolve(post), 500));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
