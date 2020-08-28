import host_dev from './host_dev';
import host_test from './host_test';
import host_prod from './host_prod';

const host = {
  dev: host_dev,
  test: host_test,
  prod: host_prod,
};
console.log(process.env);
export default host[process.env];
