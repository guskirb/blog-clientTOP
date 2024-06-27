import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import unescape from "validator/lib/unescape";
import { getPost } from "../../api/posts";
import { getComment } from "../../api/comments";
import parse from "html-react-parser";
import { deletePost } from "../../api/posts";
import useAuth from "../../hooks/useAuth";
import "./post.css";

import Spinner from "../../components/spinner/spinner";
import CommentBox from "../../components/comment/comment-box";
import CommentList from "../../components/comment/comment-list";
import RecentPosts from "../../components/recent-posts/recent-posts";

export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { auth }: any = useAuth();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId!],
    queryFn: () => getPost(postId!),
  });
  const {
    data: comments,
    isLoading: commentLoading,
    refetch,
  } = useQuery({
    queryKey: ["comment", postId!],
    queryFn: () => getComment(postId!),
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
      <div className="path">
        <Link to={"/"}>Home</Link>
        &gt;
        <Link to={`/${post.category}/page/1`}>{post.category}</Link>
      </div>
      <div className="title">
        <div className="title-header">
          <div className="category-date">
            <Link to={`/${post.category}/page/1`}>
              <div className="post-category">{post.category}</div>
            </Link>
            <p>{post.date_formatted}</p>
          </div>
          {(post.author._id === auth.user?._id || auth.user?.admin) && (
            <div className="title-buttons">
              <Link to={`/edit-post/${postId}`} state={{ post: post }}>
                <div className="edit-button"></div>
              </Link>
              <div onClick={onDelete} className="delete-button"></div>
            </div>
          )}
        </div>
        <h1 className="post-title">{unescape(post.title)}</h1>
        <div className="post-author">
          <p> Author:</p>
          <h3>{post.author.username.toUpperCase()}</h3>
        </div>
      </div>
      <div
        className="image"
        style={{
          backgroundImage: `url(${unescape(post.image_url)})`,
        }}
      ></div>
      {parse(unescape(post.post))}
      <div className="comment__title">
        <h2 className="comment-header">Recent Posts</h2>
        <div className="comment-line"></div>
        <Link to={"/all/page/1"}>
          <p className="recent__view-all">View All</p>
        </Link>
      </div>
      <RecentPosts postId={postId} />
      <div className="comment__title">
        <h2 className="comment-header">{comments?.comments.length} Comments</h2>
        <div className="comment-line"></div>
      </div>
      {auth.user && (
        <CommentBox
          postId={postId}
          refetch={refetch}
          isLoading={commentLoading}
        />
      )}
      <CommentList
        postId={postId}
        comments={comments?.comments}
        refetch={refetch}
      />
    </div>
  ) : (
    <Navigate to={"/"} />
  );
}
