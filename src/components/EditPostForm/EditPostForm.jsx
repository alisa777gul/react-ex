import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById } from '../../features/posts/postsSlice.js';
import { useParams, useNavigate } from 'react-router-dom';
import css from './EditPostForm.module.css';
import { selectAllUsers } from '../../features/users/usersSlice.js';
import { updatePost, deletePost } from '../../features/posts/operations.js';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector(state => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState('idle');

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(Number(e.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus('pending');
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error('Failed to save the post', err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus('pending');
        dispatch(
          deletePost({
            id: post.id,
          })
        ).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/`);
      } catch (err) {
        console.error('Failed to delete the post', err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form className={css.form}>
        <label className={css.label} htmlFor="postTitle">
          Post Title:
        </label>
        <input
          className={css.input}
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label className={css.label} htmlFor="postAuthor">
          Author:
        </label>
        <select
          className={css.input}
          id="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label className={css.label} htmlFor="postContent">
          Content:
        </label>
        <textarea
          className={css.textarea}
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button
          className={css.button}
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>

        <button
          className={css.deleteButton}
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
