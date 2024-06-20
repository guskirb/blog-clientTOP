import axios from "./axios";

export function getPosts() {
  return axios
    .get("/posts")
    .then((data) => data.data.posts);
}

export function getPost(postId) {
  return axios
    .get(`/posts/${postId}`)
    .then((data) => data.data.post);
}
