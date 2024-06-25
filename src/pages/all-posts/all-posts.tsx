import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/posts";

import ListPosts from "../../components/list-posts/list-posts";
import Spinner from "../../components/spinner/spinner";

export default function AllPosts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return <ListPosts posts={posts} title={'All Posts'}/>;
}
