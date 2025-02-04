import { useDispatch } from 'react-redux';
import { reactionAdded } from '../../features/posts/postsSlice.js';
import css from './ReactionButtons.module.css';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😲',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};
const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        className={css.button}
        key={name}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div className={css.buttons}>{reactionButtons}</div>;
};

export default ReactionButtons;
