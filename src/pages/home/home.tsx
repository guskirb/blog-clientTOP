import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import unescape from "validator/lib/unescape";
import "./home.css";
import Spinner from "../../components/spinner/spinner";
import { getHomePosts } from "../../api/posts";

export default function Home() {
  const navigate = useNavigate();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getHomePosts,
  });
  console.log(posts);
  const listPosts = posts?.posts.slice(3).map((post) => (
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

  useEffect(() => {
    document.title = "Blog";
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (posts?.posts.length === 0) {
    return <div>Theres nothing here.</div>;
  }

  return (
    <div className="home">
      {posts?.posts.length >= 3 ? (
        <div className="grid">
          <Link
            to={`/post/${posts?.posts[0]._id}`}
            key={posts?.posts[0]._id}
            className="grid__item1 grid__item"
          >
            <div
              className="post__wrapper"
              style={{
                backgroundImage: `url(${unescape(posts?.posts[0].image_url)})`,
              }}
            >
              <div className="post__title">
                <div
                  className="post-category grid-category"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(`/${posts?.posts[0].category}/page/1`);
                  }}
                >
                  {posts?.posts[0].category}
                </div>
                <h2>{unescape(posts?.posts[0].title)}</h2>
              </div>
            </div>
          </Link>
          <Link
            to={`/post/${posts?.posts[1]._id}`}
            key={posts?.posts[1]._id}
            className="grid__item2 grid__item"
          >
            <div
              className="post__wrapper"
              style={{
                backgroundImage: `url(${unescape(posts?.posts[1].image_url)})`,
              }}
            >
              <div className="post__title">
                <div
                  className="post-category grid-category"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(`/${posts?.posts[1].category}/page/1`);
                  }}
                >
                  {posts?.posts[1].category}
                </div>
                <h2>{unescape(posts?.posts[1].title)}</h2>
              </div>
            </div>
          </Link>
          <div></div>
          <Link
            to={`/post/${posts?.posts[2]._id}`}
            key={posts?.posts[2]._id}
            className="grid__item3 grid__item"
          >
            <div
              className="post__wrapper"
              style={{
                backgroundImage: `url(${unescape(posts?.posts[2].image_url)})`,
              }}
            >
              <div className="post__title">
                <div
                  className="post-category grid-category"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(`/${posts?.posts[2].category}/page/1`);
                  }}
                >
                  {posts?.posts[2].category}
                </div>
                <h2>{unescape(posts?.posts[2].title)}</h2>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="main__post">
          <Link
            to={`/post/${posts?.posts[0]._id}`}
            key={posts?.posts[0]._id}
            className="main-post1"
            style={{
              backgroundImage: `url(${unescape(posts?.posts[0].image_url)})`,
            }}
          >
            <div className="post__title">
              <div
                className="post-category grid-category"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigate(`/${posts?.posts[0].category}/page/1`);
                }}
              >
                {posts?.posts[0].category}
              </div>
              <h2>{unescape(posts?.posts[0].title)}</h2>
            </div>
          </Link>
        </div>
      )}
      <div className="recent__title">
        <h2 className="recent-header">Recent Posts</h2>
        <div className="recent-line"></div>
        <Link to={"/all/page/1"}>
          <p className="recent__view-all">View All</p>
        </Link>
      </div>
      <div className="posts_grid_container">{listPosts}</div>
    </div>
  );
}
