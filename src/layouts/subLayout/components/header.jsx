import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
const { Header } = Layout;
import './header.scss';
import { Link, history } from 'umi';
import { IndexModelState, ConnectProps, Loading, connect } from 'umi';
class CommonHeader extends React.Component {
  state = {
    current: this.props.currentRouter,
  };
  handleClick = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'setSelectedRouter',
      payload: { currentRouter: e.key },
    });
  };
  componentDidMount() {
    console.log('componentDidMount... header...');
    console.log(this.props);
  }
  render() {
    const { routers, currentRouter } = this.props;
    return (
      <Header className="header">
        <Link to="/" className="navbar_logo">
          Wolf Alone
        </Link>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['Login']}
          selectedKeys={[currentRouter]}
          onClick={this.handleClick}
        >
          {routers.map((item, index) => (
            <Menu.Item key={item.path}>
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
export default connect(({ app: { currentRouter } }) => ({
  currentRouter,
}))(CommonHeader);
