import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import unescape from "validator/lib/unescape";
import { getPost } from "../../api/posts";
import parse from "html-react-parser";
import { deletePost } from "../../api/posts";
import CommentBox from "../../components/comment/comment-box";
import "./post.css";

import Spinner from "../../components/spinner/spinner";

export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", parseInt(postId!)],
    queryFn: () => getPost(postId!),
  });

  function onDelete() {
    deletePost(postId as string);
    navigate("/", { replace: true });
  }

  if (isLoading) {
    return <Spinner />;
  }

  return post.status !== 400 ? (
    <div className="post">
      {/* <Link to={`/edit-post/${postId}`} state={{ post: post }}>
        <button>Edit</button>
      </Link>
      <button onClick={onDelete}>Delete</button> */}
      <div className="title">
        <p>{post.date_formatted}</p>
        <h2>{unescape(post.title)}</h2>
        <h3>{post.author.username.toUpperCase()}</h3>
      </div>
      <div
        className="image"
        style={{
          backgroundImage: `url(${unescape(post.image_url)})`,
        }}
      ></div>
      {parse(unescape(post.post))}
      <CommentBox postId={postId} />
    </div>
  ) : (
    <Navigate to={"/"} />
  );
}
