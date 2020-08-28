import ENV_HOST from '@host';
import { history } from 'umi';
import axios from 'axios';
const baseConfig = {
  baseURL: ENV_HOST.host,
  timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('token') },
};
const request = params => {
  try {
    const response = axios.request({
      ...params,
      ...baseConfig,
    });
    response.catch(err => console.error(err.toJSON()));
    // throw new Error(JSON.stringify({ msg: 'something wrong....' }));
    // console.log(Object.prototype.toString.call(response), response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default request;
