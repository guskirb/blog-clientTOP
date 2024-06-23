export default function RecentPosts({posts, postId}) {
   
    const listPosts = posts?.filter((post:object) => post._id !== postId)
    .slice(0, 3).map((post) => (
        <div key={post._id}>
            {post.title}
        </div>
    ))

  return (
    <div className="recent-posts__container">
        {listPosts}
    </div>
  )
}
