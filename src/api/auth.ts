import moment from "moment";
import axios from "./axios";

export function logIn(data) {
  return axios
    .post("/users/login", data)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function registerAccount(data) {
  console.log(data)
  return axios
    .post("/users/register", data)
    .then((response) => response.data)
    .catch((error) => error.response);
}

export function setLocalStorage(responseObj) {
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
