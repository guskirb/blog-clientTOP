import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/posts";
import { useParams } from "react-router-dom";

import ListPosts from "../../components/list-posts/list-posts";
import Spinner from "../../components/spinner/spinner";

export default function AllPosts() {
  const { page } = useParams();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ListPosts posts={posts} title={"All Posts"} page={page} category={"all"} />
  );
}
