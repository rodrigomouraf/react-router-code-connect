import axios from "axios";

export const http = axios.create({
    baseURL: 'http://localhost:3000'
})

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = JSON.parse(localStorage.getItem('access_token'))
    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);