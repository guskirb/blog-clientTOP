import moment from "moment";
import axios from "./axios";

import { ResponseTypes, DataTypes } from "../types/types";

class AuthUser {
  constructor() {}

  logIn(data: DataTypes) {
    return axios
      .post("/users/login", data)
      .then((response) => response.data)
      .catch((error) => error.response);
  }

  registerAccount(data: DataTypes) {
    return axios
      .post("/users/register", data)
      .then((response) => response.data)
      .catch((error) => error.response);
  }

  setLocalStorage(responseObj: ResponseTypes) {
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
