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
          <h4>{unescape(post.title)}</h4>
          <div className="post_lower">
            <div className="post-category">{post.category}</div>
            <p>{post.date_formatted}</p>
          </div>
        </div>
      </div>
    </Link>
  ));

  if (isLoading) {
    return <Spinner />;
  }

  if (posts.length === 0) {
    return <div>Theres nothing here.</div>;
  }

  return (
    <div className="home">
      {posts.length >= 3 ? (
        <div className="grid">
          <Link
            to={`/post/${posts[0]._id}`}
            key={posts[0]._id}
            className="grid__item1"
            style={{
              backgroundImage: `url(${unescape(posts[0].image_url)})`,
            }}
          >
            <div className="post__title">
              <div className="post-category grid-category">
                {posts[0].category}
              </div>
              <h2>{unescape(posts[0].title)}</h2>
            </div>
          </Link>
          <Link
            to={`/post/${posts[1]._id}`}
            key={posts[1]._id}
            className="grid__item2"
            style={{
              backgroundImage: `url(${unescape(posts[1].image_url)})`,
            }}
          >
            <div className="post__title">
              <div className="post-category grid-category">
                {posts[1].category}
              </div>
              <h2>{unescape(posts[1].title)}</h2>
            </div>
          </Link>
          <Link
            to={`/post/${posts[2]._id}`}
            key={posts[2]._id}
            className="grid__item3"
            style={{
              backgroundImage: `url(${unescape(posts[2].image_url)})`,
            }}
          >
            <div className="post__title">
              <div className="post-category grid-category">
                {posts[2].category}
              </div>
              <h2>{unescape(posts[2].title)}</h2>
            </div>
          </Link>
        </div>
      ) : (
        <div className="main__post">
          <Link
            to={`/post/${posts[0]._id}`}
            key={posts[0]._id}
            className="main-post1"
            style={{
              backgroundImage: `url(${unescape(posts[0].image_url)})`,
            }}
          >
            <div className="post__title">
              <div>{posts[0].category}</div>
              <h2>{unescape(posts[0].title)}</h2>
            </div>
          </Link>
        </div>
      )}
      <div className="recent__title">
        <h2 className="recent-header">Recent Posts</h2>
        <div className="recent-line"></div>
        <Link to={"/all"}>
          <p className="recent__view-all">View All</p>
        </Link>
      </div>
      <div className="posts_grid_container">{listPosts}</div>
    </div>
  );
}
