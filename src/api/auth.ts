import moment from "moment";

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
