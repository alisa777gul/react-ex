import PostAuthor from '../PostAuthor/PostAuthor.jsx';
import TimeAgo from '../TimeAgo/TimeAgo.jsx';
import css from '../PostsList/PostsList.module.css';
import ReactionButtons from '../ReactionButtons/ReactionButtons.jsx';
import { Link } from 'react-router-dom';

const PostsExcerpt = ({ post }) => {
  return (
    <article className={css.post}>
      <h2>{post.title}</h2>
      <p className={css.excerpt}>
        {' '}
        {post.body.length < 75 ? post.body : `${post.body.substring(0, 75)}...`}
      </p>
      <p className={css.postCredit}>
        <Link className={css.view} to={`/post/${post.id}`}>
          View Post
        </Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
