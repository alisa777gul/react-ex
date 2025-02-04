import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
} from '../../features/posts/postsSlice.js';
import { fetchPosts } from '../../features/posts/operations.js';

import PostsExcerpt from '../PostsExcerpt/PostsExcerpt.jsx';

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;
  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map(post => (
      <PostsExcerpt post={post} key={post.id} />
    ));
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
