import axios from "axios";

export default axios.create({
  baseURL: process.env.API_URI,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
