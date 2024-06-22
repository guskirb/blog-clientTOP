import { useParams, Navigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import unescape from "validator/lib/unescape";
import { getPost } from "../../api/posts";
import parse from "html-react-parser";
import "./post.css";

import Spinner from "../../components/spinner/spinner";

export default function Post() {
  const { postId } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", parseInt(postId!)],
    queryFn: () => getPost(postId!),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return post.status !== 400 ? (
    <div className="post">
      <Link to={`/edit-post/${postId}`} state={{ post: post }}>
        <button>Edit</button>
      </Link>
      <div
        className="image"
        style={{
          backgroundImage: `url(${unescape(post.image_url)})`,
        }}
      ></div>
      <div className="title">
        <h2>{unescape(post.title)}</h2>
        <div className="sub_header">
          <h3>{post.date_formatted}</h3>
          <h3>BY {post.author.username.toUpperCase()}</h3>
        </div>
      </div>
      <p>{parse(unescape(post.post))}</p>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
}
