import { useSelector } from 'react-redux';
import { selectAllPosts } from '../../features/posts/postsSlice.js';
import css from './PostsList.module.css';
import PostAuthor from '../PostAuthor/PostAuthor.jsx';

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const renderPosts = posts.map(post => (
    <article className={css.post} key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className={css.postCredit}>
        <PostAuthor userId={post.userId} />
      </p>
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  );
};

export default PostsList;
