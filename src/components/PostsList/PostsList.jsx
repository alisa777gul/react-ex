import { useSelector } from 'react-redux';

import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
} from '../../features/posts/postsSlice.js';

import PostsExcerpt from '../PostsExcerpt/PostsExcerpt.jsx';

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

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

  return <section>{content}</section>;
};

export default PostsList;
