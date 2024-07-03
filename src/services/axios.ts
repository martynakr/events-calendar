import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 3000,
    withCredentials: true,
});

instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    console.log(request.method, "REQUEST METHOD");
    // add if for post, put, patch, delete?
    request.headers["X-XSRF-TOKEN"] = document.cookie.replace(
        /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return request;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            window.location.href = "/login";
        } else {
            return Promise.reject(error);
        }
    }
);

export default instance;
