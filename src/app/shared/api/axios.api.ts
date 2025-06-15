import { HTTP_ERRORS } from '@shared/constants/http-errors';
import axios from 'axios';
import { environment } from 'environments/environment.development';
import { GET } from './utils.api';

const backendUrl = environment.backendUrl || 'http://localhost:8080';
console.log('Backend URL:', backendUrl);

const Axios = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // This is required to send cookies (access & refresh tokens)
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

function onRefreshed() {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: () => void) {
  refreshSubscribers.push(callback);
}

// No request interceptor needed — cookies are sent automatically

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // If token is expired and not retrying the refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh') &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/signup')
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // This call should refresh tokens and set new cookies
          await GET(`${backendUrl}/auth/refresh`);

          isRefreshing = false;
          onRefreshed();
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject({
            status: 401,
            message: HTTP_ERRORS[401] || 'Unauthorized',
          });
        }
      }

      // Queue other requests while refreshing
      return new Promise((resolve) => {
        addRefreshSubscriber(() => {
          resolve(Axios(originalRequest));
        });
      });
    }

    const errorMessage =
      error.response?.data?.message ||
      HTTP_ERRORS[error.response?.status] ||
      'Something went wrong. Please try again later';

    return Promise.reject({
      status: error.response?.status || 500,
      message: errorMessage,
    });
  }
);

export default Axios;
