import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import unescape from "validator/lib/unescape";
import "./home.css";
import Spinner from "../../components/spinner/spinner";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true as boolean);

  useEffect(() => {
    axios.get("https://blog-api-guskirb.adaptable.app/posts").then((data) => {
      setPosts(data.data.posts);
      setLoading(false);
    });
  }, []);

  const listPosts = posts.map((post) => (
    <Link to={`/post/${post._id}`} key={post._id}>
      <h1>{post.title}</h1>
      <p>{unescape(post.post)}</p>
    </Link>
  ));

  if (loading) {
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
          <h2 className="post__title">{posts[0].title}</h2>
        </Link>
        <Link
          to={`/post/${posts[1]._id}`}
          key={posts[1]._id}
          className="grid__item2"
          style={{
            backgroundImage: `url(${unescape(posts[1].image_url)})`,
          }}
        >
          <h3 className="post__title">{posts[1].title}</h3>
        </Link>
        <Link
          to={`/post/${posts[2]._id}`}
          key={posts[2]._id}
          className="grid__item3"
          style={{
            backgroundImage: `url(${unescape(posts[2].image_url)})`,
          }}
        >
          <h3 className="post__title">{posts[2].title}</h3>
        </Link>
      </div>
    </div>
  );
}
