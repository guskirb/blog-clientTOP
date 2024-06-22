export default function CommentList({ comments }) {
  const listComments = comments?.map((comment: object) => (
    <div className="comment__container">
      <p style={{ whiteSpace: "pre-wrap" }}>{comment.comment}</p>
    </div>
  ));
  console.log(comments);

  return <>{listComments}</>;
}
