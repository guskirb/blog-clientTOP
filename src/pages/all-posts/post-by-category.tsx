import { useQuery } from "@tanstack/react-query";
import { getByCategory } from "../../api/posts";
import { useParams } from "react-router-dom";

import ListPosts from "../../components/list-posts/list-posts";
import Spinner from "../../components/spinner/spinner";

export default function PostByCategory() {
  const { category } = useParams();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", category],
    queryFn: () => getByCategory(category),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return <ListPosts posts={posts} />;
}
