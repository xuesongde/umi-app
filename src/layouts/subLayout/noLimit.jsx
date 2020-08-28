import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './noLimit.scss';
import WithAuth from '../withAuth/withAuth';
import CommonHeader from './components/header.jsx';
import routerList from '@config/limit_router.json';

const NoLimit = function({ props }) {
  console.log(props);
  return (
    <>
      <Sider>Sider</Sider>
      <CommonHeader routers={routerList} />
      <Content className="content">{props.children}</Content>
      <Footer className="footer">Footer</Footer>
    </>
  );
};
export default WithAuth(NoLimit);
