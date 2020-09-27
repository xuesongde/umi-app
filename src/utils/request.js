import ENV_HOST from '@host';
import { history } from 'umi';
import axios from 'axios';
import { message } from 'antd';
import _ from 'lodash';
const baseConfig = {
  baseURL: ENV_HOST.host,
  timeout: 10000,
  headers: { 'x-access-token': localStorage.getItem('accessToken') },
};

const formatParams = data => {
  let paramArr = [];
  for (let [key, value] of Object.entries(data)) {
    paramArr.push(`${key}=${value}`);
  }
  return '?' + paramArr.join('&');
};
const request = params => {
  try {
    let url = params.url;
    if (!('method' in params) && !_.isEmpty(params.data)) {
      url = params.url + formatParams(JSON.parse(params.data));
    }
    const response = axios.request({
      ...params,
      ...baseConfig,
      url,
    });
    response.catch(err => console.error(err.toJSON()));
    // throw new Error(JSON.stringify({ msg: 'something wrong....' }));
    // console.log(Object.prototype.toString.call(response), response);
    return response.then(callBackData => {
      console.log(callBackData);
      const { status, data } = callBackData;
      if (status === 200) {
        if (data.code == 200000 || data.code == 300000) {
          return new Promise((resolve, reject) => {
            resolve(data);
          });
        }
        if (data.code == 400000) {
          history.push('/login');
          return new Promise((resolve, reject) => {
            reject(data);
          });
        }
      } else {
        message.error(data.message);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export default request;
