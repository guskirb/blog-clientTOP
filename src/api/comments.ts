import axios from "./axios";

type Data = {
  comment: string;
};

export function newComment(data: Data, postId: string) {
    return axios
      .post(`/posts/${postId}/comments`, data)
      .then((response) => response.data)
      .catch((error) => error.response);
  }