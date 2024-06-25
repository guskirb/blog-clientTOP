import unescape from "validator/lib/unescape";
import { Link } from "react-router-dom";
import { getRecentPosts } from "../../api/posts";
import { useQuery } from "@tanstack/react-query";
import "./recent-posts.css";

import Spinner from "../spinner/spinner";

export default function RecentPosts({ postId }) {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["recent"],
    queryFn: () => getRecentPosts(),
  });

  if (isLoading) {
    return (
      <div className="comment-form__container">
        <Spinner />
      </div>
    );
  }

  const listPosts = posts
    ?.filter((post: object) => post._id !== postId)
    .slice(0, 3)
    .map((post) => (
      <div className="recent-post" key={post._id}>
        <Link to={`/post/${post._id}`} reloadDocument>
          <div
            className="recent-post__image"
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
        </Link>
      </div>
    ));

  return <div className="recent-posts__container">{listPosts}</div>;
}
