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

export function getDrafts() {
  return axios
    .get("/posts/private")
    .then((response) => response.data.posts)
    .catch((error) => error.response);
}

export function getPost(postId: string) {
  return axios
    .get(`/posts/${postId}`)
    .then((response) => response.data.post)
    .catch((error) => error.response);
}

export function getRecentPosts() {
  return axios
    .get("/posts/recent")
    .then((response) => response.data.posts)
    .catch((error) => error.response);
}

export function newPost(data: Data) {
  return axios
    .post("/posts", data)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function editPost(data: Data, postId: string) {
  return axios
    .post(`/posts/${postId}/update`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function deletePost(postId: string) {
  return axios
    .post(`/posts/${postId}/delete`)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function getByCategory(category: string) {
  return axios
    .get(`/posts/category/${category}`)
    .then((response) => response.data.posts)
    .catch((error) => error.response);
}
