import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
const { Header } = Layout;
import './header.scss';
import { Link } from 'umi';
class CommonHeader extends React.Component {
  state = {
    current: 'Login',
  };
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  render() {
    const { routers } = this.props;
    return (
      <Header className="header">
        <Link to="/" className="navbar_logo">
          Wolf Alone
        </Link>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['Login']}
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
        >
          {routers.map((item, index) => (
            <Menu.Item key={item.name}>
              <Link to={item.path} className="link_item">
                {item.name}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
    );
  }
}
export default CommonHeader;
