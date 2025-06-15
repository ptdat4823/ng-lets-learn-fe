import Axios from './axios.api';

export const GET = async (url: string, params?: Record<string, any>) => {
  return await Axios.get(url, {
    params,
  }).then((response) => response.data);
};

export const POST = async (url: string, data?: any) => {
  return await Axios.post(url, data).then((response) => response.data);
};

export const PUT = async (url: string, data?: any) => {
  return await Axios.put(url, data).then((response) => response.data);
};

export const DELETE = async (url: string, params?: Record<string, any>) => {
  return await Axios.delete(url, {
    params,
  }).then((response) => response.data);
};

export const PATCH = async (url: string, data?: any) => {
  return await Axios.patch(url, data).then((response) => response.data);
};
