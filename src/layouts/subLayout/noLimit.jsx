import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { UserOutlined } from '@ant-design/icons';
import './noLimit.scss';
import WithAuth from '../withAuth/withAuth';
import CommonHeader from './components/header.jsx';
import routerList from '@config/limit_router.json';
import { Link } from 'umi';

const { SubMenu } = Menu;
const NoLimit = function({ props }) {
  console.log('noLimit....', props);
  return (
    <>
      <div className="noLimit_container">
        <CommonHeader routers={routerList} />
        <div className="side_content">
          <Sider className="side">
            <Menu
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="users">
                <Menu.Item key="/home">
                  <Link to={'/home'}>home</Link>
                </Menu.Item>
                <Menu.Item key="/userSque">
                  <Link to={'/userSque'}>user sque</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content className="content">{props.children}</Content>
        </div>
        <Footer className="footer">wrote by xsd</Footer>
      </div>
    </>
  );
};
export default WithAuth(NoLimit);
