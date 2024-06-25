import { Link } from "react-router-dom";
import { unescape } from "validator";
import "./list-post.css";

export default function ListPosts({ posts, title }) {
  const listPosts = posts?.map((post) => (
    <Link to={`/post/${post._id}`} key={post._id}>
      <div className="post_container">
        <div
          className="post_image"
          style={{
            backgroundImage: `url(${unescape(post.image_url)})`,
          }}
        ></div>
        <div className="post_header">
          <h4>{unescape(post.title)}</h4>
          <div className="post_lower">
            <Link to={`/category/${post.category}`}>
              <div className="post-category">{post.category}</div>
            </Link>
            <p>{post.date_formatted}</p>
          </div>
        </div>
      </div>
    </Link>
  ));

  if (posts?.length === 0) {
    return <div>Theres nothing here.</div>;
  }

  return (
    <div className="all-posts__container">
      <h2 className="posts__header">{title}</h2>
      <div className="all-posts_grid_container">{listPosts}</div>
    </div>
  );
}
