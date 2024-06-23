import useAuth from "../../hooks/useAuth";
import { DateTime } from "luxon";
import { deleteComment } from "../../api/comments";

export default function CommentList({ postId, comments, refetch }) {
  const { auth }: any = useAuth();

  async function onDelete(postId, commentId) {
    await deleteComment(postId, commentId);
    refetch();
  }

  const listComments = comments?.map((comment: object) => (
    <div className="comment__container" key={comment._id}>
      <h3>{comment.author.username}</h3>
      <p style={{ whiteSpace: "pre-wrap" }}>{comment.comment}</p>
      <p>{DateTime.fromISO(comment.date).toRelative()}</p>
      {(comment.author._id === auth.user._id || auth.user.admin) && (
        <button onClick={() => onDelete(postId, comment._id)}>Delete</button>
      )}
    </div>
  ));

  return <>{listComments}</>;
}
