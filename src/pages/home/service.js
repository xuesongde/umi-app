import request from '@utils/request';

export function getTableData(payload) {
  return request({
    url: '/users',
    data: { ...payload },
  });
}

export function deleteByUserName(payload) {
  return request({
    url: '/deleteByUserName/' + payload,
    data: { ...payload },
    method: 'delete',
  });
}
