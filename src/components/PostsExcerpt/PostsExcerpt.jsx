import PostAuthor from '../PostAuthor/PostAuthor.jsx';
import TimeAgo from '../TimeAgo/TimeAgo.jsx';
import css from '../PostsList/PostsList.module.css';
import ReactionButtons from '../ReactionButtons/ReactionButtons.jsx';

const PostsExcerpt = ({ post }) => {
  return (
    <article className={css.post}>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className={css.postCredit}>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
