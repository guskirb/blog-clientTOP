import axios from "./axios";

import { DataTypes } from "../types/types";

export function newComment(data: DataTypes, postId: any) {
  return axios
    .post(`/posts/${postId}/comments`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function getComment(postId: any) {
  return axios
    .get(`/posts/${postId}/comments`)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function deleteComment(postId: any, commentId: string) {
  return axios
    .post(`/posts/${postId}/comments/${commentId}/delete`)
    .then((response) => response.data)
    .catch((error) => error.response);
}
