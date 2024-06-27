import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getByCategory } from "../../api/posts";
import { useParams } from "react-router-dom";

import ListPosts from "../../components/list-posts/list-posts";
import Spinner from "../../components/spinner/spinner";

export default function PostByCategory() {
  const { category, page } = useParams();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", category],
    queryFn: () => getByCategory(page, category),
  });

  useEffect(() => {
    document.title = category.charAt(0).toUpperCase() + category.slice(1);
  }, [category]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ListPosts posts={posts} title={category} page={page} category={category} />
  );
}
