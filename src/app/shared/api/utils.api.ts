import { AxiosRequestConfig } from 'axios';
import Axios from './axios.api';

export const GET = (url: string, params?: Record<string, any>) => {
  return Axios.get(url, {
    params,
  }).then((response) => response.data);
};

export const POST = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return Axios.post(url, data, config).then((response) => response.data);
};

export const PUT = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return Axios.put(url, data, config).then((response) => response.data);
};

export const DELETE = (url: string, params?: Record<string, any>) => {
  return Axios.delete(url, {
    params,
  }).then((response) => response.data);
};

export const PATCH = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return Axios.patch(url, data, config).then((response) => response.data);
};
