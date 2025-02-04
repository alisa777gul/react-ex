import { Route, Routes } from 'react-router';
import './App.css';
import AddPostForm from './components/AddPostForm/AddPostForm.jsx';
import PostsList from './components/PostsList/PostsList.jsx';
import Layout from './Layout.jsx';
import SinglePostPage from './components/SinglePostPage/SinglePostPage.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from './features/users/operations.js';
import EditPostForm from './components/EditPostForm/EditPostForm.jsx';
import { fetchPosts } from './features/posts/operations.js';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
