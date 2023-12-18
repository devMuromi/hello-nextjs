import classes from "./posts-grid.module.css";

import Postitem from "./post-item";

function PostsGrid(props) {
  const { posts } = props;
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <Postitem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
