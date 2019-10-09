import axios from "axios";
import Config from "../config/api.config";
import { store } from "../App";
import { SHOW_LOADING, HIDE_LOADING } from "../actions";

const authInfo = JSON.parse(sessionStorage.getItem("auth"));
const claims = JSON.parse(sessionStorage.getItem("claims"));

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authInfo ? authInfo.token : ""}`
};

function getHeader() {
    return headers;
}

const axiosInstance = axios.create({
    baseURL: Config.baseUrl,
    headers: headers
});

let isRefreshing = false;
let refreshSubscribers = [];

axiosInstance.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        const {
            config,
            response: { status }
        } = error;
        const originalRequest = config;

        if (status === 401 || status === 403) {
            if (!isRefreshing) {
                isRefreshing = true;
                refreshAccessToken()
                    .then(res => {
                        if (res.data && res.data) {
                            sessionStorage.setItem(
                                "auth",
                                JSON.stringify(res.data)
                            );
                        }
                        isRefreshing = false;
                        onRefreshed(res.data.token);
                    })
                    .catch(err => {});
            }

            const retryOrigReq = new Promise((resolve, reject) => {
                subscribeTokenRefresh(token => {
                    // replace the expired token and retry
                    originalRequest.headers["Authorization"] =
                        "Bearer " + token;
                    resolve(axios(originalRequest));
                });
            });
            return retryOrigReq;
        } else {
            return Promise.reject(error);
        }
    }
);

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token) {
    refreshSubscribers.map(cb => cb(token));
}

function refreshAccessToken() {
    const req = {
        refreshToken: authInfo.refreshToken,
        email: claims.email
    };

    return axios
        .post(`${Config.baseUrl}/user/refreshToken`, req)
        .then(res => res);
}

const apiGet = (url, isAuth) => {
    store.dispatch({ type: SHOW_LOADING });
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, isAuth ? getHeader() : null).then(
            data => {
                store.dispatch({ type: HIDE_LOADING });
                resolve(data);
            },
            err => {
                store.dispatch({ type: HIDE_LOADING });
                reject(err);
            }
        );
    });
};

const apiPost = (
    url,
    headers = {
        headers: headers
    },
    urlAuth = Config.baseUrl
) => {
    store.dispatch({ type: SHOW_LOADING });
    return new Promise((resolve, reject) => {
        axiosInstance
            .post(
                url,
                Object.assign({}, headers, {
                    baseURL: urlAuth
                })
            )
            .then(
                data => {
                    store.dispatch({ type: HIDE_LOADING });
                    resolve(data);
                },
                err => {
                    store.dispatch({ type: HIDE_LOADING });
                    reject(err);
                }
            );
    });
};

const apiPut = (
    url,
    headers = {
        headers: headers
    },
    urlAuth = Config.baseUrl
) => {
    store.dispatch({ type: SHOW_LOADING });
    return new Promise((resolve, reject) => {
        axiosInstance
            .put(
                url,
                Object.assign({}, headers)
            )
            .then(
                data => {
                    store.dispatch({ type: HIDE_LOADING });
                    resolve(data);
                },
                err => {
                    store.dispatch({ type: HIDE_LOADING });
                    reject(err);
                }
            );
    });
};

const apiDelete = (
    url,
    headers = {
        headers: headers
    },
    urlAuth = Config.baseUrl
) => {
    store.dispatch({ type: SHOW_LOADING });
    return new Promise((resolve, reject) => {
        axiosInstance
            .delete(
                url,
                Object.assign({}, headers, {
                    baseURL: urlAuth
                })
            )
            .then(
                data => {
                    store.dispatch({ type: HIDE_LOADING });
                    resolve(data);
                },
                err => {
                    store.dispatch({ type: HIDE_LOADING });
                    reject(err);
                }
            );
    });
};

const http = {
    get: apiGet,
    post: apiPost,
    put: apiPut,
    delete: apiDelete
};

export default http;
