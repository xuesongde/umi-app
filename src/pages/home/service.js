import request from '@utils/request';

export function postLogin(payload) {
  return request({
    url: '/user/login',
    data: { ...payload },
  });
}
