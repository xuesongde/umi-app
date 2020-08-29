import request from '@utils/request';

export function postLogin(payload) {
  return request({
    url: '/signin',
    data: { ...payload },
    method: 'post',
  });
}
