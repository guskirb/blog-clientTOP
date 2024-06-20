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

class Auth {
  constructor() {}

  logIn(data: Data) {
    return axios
      .post("/users/login", data)
      .then((response) => response.data)
      .catch((error) => error.response);
  }

  registerAccount(data: object) {
    return axios
      .post("/users/register", data)
      .then((response) => response.data)
      .catch((error) => error.response);
  }

  setLocalStorage(responseObj: Response) {
    const expires = moment().add(responseObj.expires);

    localStorage.setItem("token", responseObj.token);
    localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
  }

  getExpiration() {
    const expires = localStorage.getItem("expires");
    const expiresAt = JSON.parse(expires);
    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

export default new Auth();
