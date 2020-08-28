import request from '@utils/request';

export function postRegister(payload) {
  return request({
    url: '/signup',
    method: 'post',
    data: { ...payload },
  });
}
