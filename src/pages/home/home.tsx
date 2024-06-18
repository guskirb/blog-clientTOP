import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
      <p>{post.post}</p>
    </Link>
  ));

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="home">
      <div className="grid">
        <div className="grid__item1"></div>
        <div className="grid__item2"></div>
        <div className="grid__item3"></div>
      </div>
      {listPosts}
    </div>
  );
}
