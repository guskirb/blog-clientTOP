import moment from "moment";
import axios from "./axios";

type Response = {
  expires: string;
  token: string;
};

type Data = {
  username: string;
  email: string;
  password: string;
  confirm?: string;
};

export function logIn(data: Data) {
  return axios
    .post("/users/login", data)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function registerAccount(data: object) {
  return axios
    .post("/users/register", data)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function setLocalStorage(responseObj: Response) {
  const expires = moment().add(responseObj.expires);

  localStorage.setItem("token", responseObj.token);
  localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expires");
}

// isLoggedIn() {
//     return
// }

export function getExpiration() {
  const expires = localStorage.getItem("expires");
  const expiresAt = JSON.parse(expires);
  return moment(expiresAt);
}
