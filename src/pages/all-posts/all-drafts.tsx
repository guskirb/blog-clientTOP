import { useQuery } from "@tanstack/react-query";
import { getDrafts } from "../../api/posts";
import { useEffect } from "react";

import ListPosts from "../../components/list-posts/list-posts";
import Spinner from "../../components/spinner/spinner";

export default function AllDrafts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getDrafts,
  });

  useEffect(() => {
    document.title = "Drafts";
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ListPosts posts={posts} title={"Drafts"} category={null} page={null} />
  );
}
