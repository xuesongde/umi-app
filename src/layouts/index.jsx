import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './index.scss';
import NoLimit from './subLayout/noLimit';
import Limit from './subLayout/limit';
import { history } from 'umi';

export default function(props) {
  const { pathname } = props.location;
  let isLimit = false;
  if (pathname === '/login' || pathname === '/register') {
    isLimit = true;
  }
  history.listen((location, action) => {
    console.log(location.pathname, action);
  });
  console.log('layout...');
  return (
    <Layout className="layout">
      {isLimit ? <Limit props={props} /> : <NoLimit props={props} />}
    </Layout>
  );
}
