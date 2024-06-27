import unescape from "validator/lib/unescape";
import { Link, useNavigate } from "react-router-dom";
import { getRecentPosts } from "../../api/posts";
import { useQuery } from "@tanstack/react-query";
import "./recent-posts.css";

import Spinner from "../spinner/spinner";

export default function RecentPosts({ postId }) {
  const navigate = useNavigate();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["recent"],
    queryFn: getRecentPosts,
  });

  if (isLoading) {
    return (
      <div className="comment-form__container">
        <Spinner />
      </div>
    );
  }

  const listPosts = posts?.posts
    .filter((post: object) => post._id !== postId)
    .slice(0, 3)
    .map((post) => (
      <Link to={`/post/${post._id}`} key={post._id}>
        <div className="recent-post">
          <div
            className="recent-post__image"
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
                  navigate(`/${post.category}/page/1`);
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

  return <div className="recent-posts__container">{listPosts}</div>;
}
