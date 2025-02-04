import PostAuthor from '../PostAuthor/PostAuthor.jsx';
import TimeAgo from '../TimeAgo/TimeAgo.jsx';
import css from '../PostsList/PostsList.module.css';
import ReactionButtons from '../ReactionButtons/ReactionButtons.jsx';
import { useSelector } from 'react-redux';
import { selectPostById } from '../../features/posts/postsSlice.js';
import { useParams } from 'react-router';

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector(state => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article className={css.post}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className={css.postCredit}>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
