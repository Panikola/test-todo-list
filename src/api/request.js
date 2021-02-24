import axios from "axios";
import router from "@/router";
// import NetworkError from "@/utils/NetworkError";
// import APIError from "@/utils/APIError";
const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

request.interceptors.response.use(
  response => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  response => {
    router.replace({ name: "404" });
    return Promise.reject(response);
  }
);

export default request;
