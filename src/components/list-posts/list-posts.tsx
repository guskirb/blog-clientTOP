import { useNavigate, Link } from "react-router-dom";
import { unescape } from "validator";
import "./list-post.css";

export default function ListPosts({ posts, title }) {
  const navigate = useNavigate();
  const listPosts = posts?.map((post) => (
    <Link
      to={`/post/${post._id}`}
      key={post._id}
      className="animation__container"
    >
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
            <div
              className="post-category"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(`/category/${post.category}`);
              }}
            >
              {post.category}
            </div>
            <p>{post.date_formatted}</p>
          </div>
        </div>
      </div>
    </Link>
  ));

  if (posts?.length === 0) {
    return (
      <div className="all-posts__container">
        <h2 className="posts__header">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h2>
        <div>Theres nothing here.</div>
      </div>
    );
  }

  return (
    <div className="all-posts__container">
      <h2 className="posts__header">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h2>
      <div className="all-posts_grid_container">{listPosts}</div>
    </div>
  );
}
