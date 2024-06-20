import axios from "axios";

export function getPosts() {
  return axios
    .get("https://blog-api-guskirb.adaptable.app/posts")
    .then((data) => data.data.posts);
}

export function getPost(postId) {
  return axios
    .get(`https://blog-api-guskirb.adaptable.app/posts/${postId}`)
    .then((data) => data.data.post);
}
