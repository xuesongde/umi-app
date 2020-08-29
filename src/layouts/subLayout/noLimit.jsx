import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './noLimit.scss';
import WithAuth from '../withAuth/withAuth';
import CommonHeader from './components/header.jsx';
import routerList from '@config/limit_router.json';

const { SubMenu } = Menu;
const NoLimit = function({ props }) {
  console.log(props);
  return (
    <>
      <div className="noLimit_container">
        <CommonHeader routers={routerList} />
        <div className="side_content">
          <Sider className="side">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content className="content">{props.children}</Content>
        </div>
        <Footer className="footer">Footer</Footer>
      </div>
    </>
  );
};
export default WithAuth(NoLimit);
