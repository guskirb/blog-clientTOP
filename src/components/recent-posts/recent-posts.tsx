import unescape from "validator/lib/unescape";
import { Link } from "react-router-dom";
import "./recent-posts.css";

export default function RecentPosts({ posts, postId }) {
  const listPosts = posts
    ?.filter((post: object) => post._id !== postId)
    .slice(0, 3)
    .map((post) => (
      <div className="recent-post" key={post._id}>
        <Link to={`/post/${post._id}`} key={post._id} state={{ posts: posts }}>
          <div
            className="recent-post__image"
            style={{
              backgroundImage: `url(${unescape(post.image_url)})`,
            }}
          ></div>
          {post.title}
        </Link>
      </div>
    ));

  return <div className="recent-posts__container">{listPosts}</div>;
}
