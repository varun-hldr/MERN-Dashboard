import axios from "axios";

const publicFetch = axios.create({
  // baseURL: "http://localhost:3400/",
  baseURL: "/",
});

export { publicFetch };
