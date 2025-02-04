import PostAuthor from '../PostAuthor/PostAuthor.jsx';
import TimeAgo from '../TimeAgo/TimeAgo.jsx';
import css from '../PostsList/PostsList.module.css';
import ReactionButtons from '../ReactionButtons/ReactionButtons.jsx';
import { useSelector } from 'react-redux';
import { selectPostById } from '../../features/posts/postsSlice.js';
import { Link, useParams } from 'react-router-dom';

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector(state => selectPostById(state, Number(postId)));

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
        <Link className={css.edit} to={`/post/edit/${post.id}`}>
          Edit Post
        </Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
