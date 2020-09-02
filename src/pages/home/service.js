import request from '@utils/request';

export function getTableData(payload) {
  return request({
    url: '/users',
    data: { ...payload },
  });
}

export function deleteByUserName(payload) {
  return request({
    url: '/users?userId=' + payload,
    data: { ...payload },
    method: 'delete',
  });
}
