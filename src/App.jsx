import './App.css';
import AddPostForm from './components/AddPostForm/AddPostForm.jsx';
import PostsList from './components/PostsList/PostsList.jsx';

export default function App() {
  return (
    <main className="App">
      <AddPostForm />
      <PostsList />
    </main>
  );
}
