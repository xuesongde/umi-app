import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
const { Footer } = Layout;
import './footer.scss';
import { Link } from 'umi';
class CommonFooter extends React.Component {
  render() {
    const { routers } = this.props;
    return (
      <div className="footer">
        Your happiness is our pleasure @copyright Songde
      </div>
    );
  }
}
export default CommonFooter;
