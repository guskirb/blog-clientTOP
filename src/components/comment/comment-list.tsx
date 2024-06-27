import useAuth from "../../hooks/useAuth";
import { DateTime } from "luxon";
import { deleteComment } from "../../api/comments";

import { PropTypes } from "../../types/types";
import { CommentTypes } from "../../types/types";

export default function CommentList({ postId, comments, refetch }: PropTypes) {
  const { auth }: any = useAuth();

  async function onDelete(postId: any, commentId: string) {
    await deleteComment(postId, commentId);
    refetch();
  }

  const listComments = comments?.map((comment: CommentTypes) => (
    <div className="comment__container" key={comment._id}>
      <div className="comment-text">
        <div>
          <h3>{comment.author.username.toUpperCase()}</h3>
          <p className="comment-date">
            {DateTime.fromISO(comment.date).toRelative()}
          </p>
        </div>
        <p style={{ whiteSpace: "pre-wrap" }}>{comment.comment}</p>
      </div>
      {(comment.author._id === auth.user?._id || auth.user?.admin) && (
        <div
          className="delete-button"
          onClick={() => onDelete(postId, comment._id)}
        ></div>
      )}
    </div>
  ));

  return <div className="comment__wrapper">{listComments}</div>;
}
