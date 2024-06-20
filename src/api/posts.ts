import axios from "./axios";

export function getPosts() {
  return axios
    .get("/posts")
    .then((response) => response.data.posts)
    .catch((error) => error.response);
}

export function getPost(postId: string) {
  return axios
    .get(`/posts/${postId}`)
    .then((response) => response.data.post)
    .catch((error) => error.response);
}
