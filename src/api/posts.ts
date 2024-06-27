import axios from "./axios";

import { DataTypes } from "../types/types";

export function getHomePosts() {
  return axios
    .get("/posts?page=1&limit=9")
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function getPosts(page: string) {
  return axios
    .get(`/posts?page=${page}&limit=12`)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function getDrafts() {
  return axios
    .get("/posts/private")
    .then((response) => response.data)
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
    .get("/posts?page=1&limit=4")
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function newPost(data: DataTypes) {
  return axios
    .post("/posts", data)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function editPost(data: DataTypes, postId: string) {
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

export function getByCategory(page: string, category: string) {
  return axios
    .get(`/posts?page=${page}&limit=12&category=${category}`)
    .then((response) => response.data)
    .catch((error) => error.response);
}
