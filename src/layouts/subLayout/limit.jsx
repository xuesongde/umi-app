import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;
import './limit.scss';
import CommonHeader from './components/header.jsx';
import CommonFooter from './components/footer.jsx';
import routerList from '@config/unlimit_router.json';

const Limit = function({ props }) {
  return (
    <>
      <CommonHeader routers={routerList} />
      <Content className="content">{props.children}</Content>
      <CommonFooter />
    </>
  );
};

export default Limit;
