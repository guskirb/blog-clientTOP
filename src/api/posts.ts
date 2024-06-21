import axios from "./axios";

type Data = {
  title: string;
  post: string;
};

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

export function newPost(data: Data) {
  return axios
  .post("/posts", data)
  .then((response) => response.data)
  .catch((error) => error.response);
}