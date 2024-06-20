import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import unescape from "validator/lib/unescape";
import { getPost } from "../../api/posts";
import "./post.css";

import Spinner from "../../components/spinner/spinner";

export default function Post() {
  let { postId } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", parseInt(postId!)],
    queryFn: () => getPost(postId!),
  });

  if (isLoading) {
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
      </div>
      <p>{unescape(post.post)}</p>
    </div>
  );
}
