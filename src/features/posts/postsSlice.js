import { createSlice, nanoid } from '@reduxjs/toolkit';
import { addNewPost, deletePost, fetchPosts, updatePost } from './operations';
import { sub } from 'date-fns';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === Number(postId));
      if (existingPost) {
        existingPost.reactions = {
          ...existingPost.reactions,
          [reaction]: existingPost.reactions[reaction] + 1,
        };
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';

        let min = 1;
        const loadedPosts = action.payload.map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        (state.status = 'failed'), (state.error = action.error.message);
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      })
      .addCase(addNewPost.pending, state => {
        state.status = 'loading';
      })
      .addCase(addNewPost.rejected, (state, action) => {
        (state.status = 'failed'), (state.error = action.error.message);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter(post => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;

        const posts = state.posts.filter(post => post.id !== id);
        state.posts = posts;
      });
  },
});
export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;
export const selectPostById = (state, postId) => {
  return state.posts.posts.find(post => post.id === Number(postId));
};

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
