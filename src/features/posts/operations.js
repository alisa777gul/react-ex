import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async thunkAPI => {
    try {
      const response = await axios.get(POSTS_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async initialPost => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
