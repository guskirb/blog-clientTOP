import axios from "./axios";

export function getUser() {
  return axios
    .get("/users/me")
    .then((response) => response.data)
    .catch((error) => error.response);
}