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

class AuthUser {
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

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
  }
}

export default new AuthUser();
