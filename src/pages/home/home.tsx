import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import unescape from "validator/lib/unescape";
import "./home.css";
import Spinner from "../../components/spinner/spinner";
import { getPosts } from "../../api/posts";

export default function Home() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

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
          <h2>{unescape(post.title)}</h2>
          <p>{post.date_formatted}</p>
        </div>
      </div>
    </Link>
  ));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="home">
      <div className="grid">
        <Link
          to={`/post/${posts[0]._id}`}
          key={posts[0]._id}
          className="grid__item1"
          style={{
            backgroundImage: `url(${unescape(posts[0].image_url)})`,
          }}
        >
          <h2 className="post__title">{unescape(posts[0].title)}</h2>
        </Link>
        <Link
          to={`/post/${posts[1]._id}`}
          key={posts[1]._id}
          className="grid__item2"
          style={{
            backgroundImage: `url(${unescape(posts[1].image_url)})`,
          }}
        >
          <h3 className="post__title">{unescape(posts[1].title)}</h3>
        </Link>
        <Link
          to={`/post/${posts[2]._id}`}
          key={posts[2]._id}
          className="grid__item3"
          style={{
            backgroundImage: `url(${unescape(posts[2].image_url)})`,
          }}
        >
          <h3 className="post__title">{unescape(posts[2].title)}</h3>
        </Link>
      </div>
      <div className="recent__title">
        <h2 className="recent-header">Recent Posts</h2>
        <div className="recent-line"></div>
      </div>
      <div className="posts_grid_container">{listPosts}</div>
    </div>
  );
}
