import request from '@utils/request';

export function getTableData(payload) {
  return request({
    url: '/usersSque/allUsers',
    data: JSON.stringify(payload),
  });
}
