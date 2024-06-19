import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import unescape from "validator/lib/unescape";
import "./post.css";

import Spinner from "../../components/spinner/spinner";

export default function Post() {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(true as boolean);
  let { postId } = useParams();

  useEffect(() => {
    axios
      .get(`https://blog-api-guskirb.adaptable.app/posts/${postId}`)
      .then((data) => {
        setPost(data.data.post);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="post">
      <div
        className="image"
        style={{
          backgroundImage: `url(${unescape(post.image_url)})`,
        }}
      ></div>
      <div className="title">
        <h2>{post.title}</h2>
        <div className="sub_header">
          <h3>{post.date_formatted}</h3>
          <h3>BY {post.author.username.toUpperCase()}</h3>
        </div>
        <p>{unescape(post.post)}</p>
      </div>
    </div>
  );
}
