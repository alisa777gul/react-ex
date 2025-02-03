import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postAdded } from '../../features/posts/postsSlice.js';
import { selectAllUsers } from '../../features/users/usersSlice.js';
import css from './AddPostForm.module.css';

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const users = useSelector(selectAllUsers);

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className={css.section}>
      <h2 className={css.title}>Add a New Post</h2>
      <form className={css.form}>
        <label htmlFor="postTitle" className={css.label}>
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

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label className={css.label} htmlFor="postContent">
          Content:
        </label>
        <textarea
          className={css.textarea}
          name="postContent"
          id="postContent"
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
      </form>
    </section>
  );
};

export default AddPostForm;
